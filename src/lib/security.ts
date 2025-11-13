// Frontend Security Utilities
// Provides client-side security measures and input validation

// DOMPurify for HTML sanitization
import DOMPurify from 'dompurify';

// Rate limiting for client-side requests
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 10; // Max requests per window

// CSRF token management
let csrfToken: string | null = null;

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[0-9\s\-()]{10,15}$/,
  amount: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$|^\d+(\.\d{1,2})?$/,
  transactionRef: /^[A-Z0-9\-_]+$/,
  name: /^[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/,
  message: /^[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF.,!?\-_@#$%^&*()]+$/
};

// Dangerous patterns to detect
export const DANGEROUS_PATTERNS = [
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<object[^>]*>/gi,
  /<embed[^>]*>/gi,
  /<svg[^>]*>.*?<\/svg>/gi,
  /<img[^>]*src.*onerror/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
  /\{\{.*\}\}/g, // Template injection
  /\$\{.*\}/g,   // String interpolation
  /<%.*%>/g,     // ASP/JSP templates
  /<\?php.*\?>/g, // PHP code
  /eval\(/gi,
  /exec\(/gi,
  /system\(/gi,
  /os\./gi,
  /subprocess\./gi,
  /import\s+/gi,
  /__import__/gi,
  // Only block iframes with suspicious content or from untrusted sources
  /<iframe[^>]*src=["'][^"']*(javascript|data|vbscript):/gi,
  /<iframe[^>]*onload=/gi,
  /<iframe[^>]*onerror=/gi
];

// Security logger
let securityEvents: SecurityEvent[] = [];
const MAX_EVENTS = 1000;

export interface SecurityEvent {
  timestamp: number;
  type: 'xss_attempt' | 'injection_attempt' | 'rate_limit' | 'validation_error' | 'csrf_error';
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip?: string;
}

/**
 * Sanitize text input to prevent XSS attacks
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters except newlines and tabs
  let sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // HTML escape using DOMPurify
  sanitized = DOMPurify.sanitize(sanitized, { ALLOWED_TAGS: [] });

  // Remove dangerous patterns
  DANGEROUS_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate input against patterns and dangerous content
 */
export function validateInput(input: string, type: keyof typeof VALIDATION_PATTERNS): { isValid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Input is required' };
  }

  // First check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      logSecurityEvent('injection_attempt', `Dangerous pattern detected: ${pattern.source}`, 'high');
      return { isValid: false, error: 'Invalid input detected' };
    }
  }

  // Then validate against expected pattern
  const pattern = VALIDATION_PATTERNS[type];
  if (!pattern) {
    return { isValid: false, error: 'Unknown validation type' };
  }

  if (!pattern.test(input)) {
    const errorMessages = {
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      amount: 'Please enter a valid amount (e.g., 100, 1,000, 100.50, or 100 ETB)',
      transactionRef: 'Please enter a valid transaction reference',
      name: 'Please enter a valid name',
      message: 'Message contains invalid characters'
    };
    return { isValid: false, error: errorMessages[type] || 'Invalid input format' };
  }

  return { isValid: true };
}

/**
 * Rate limiting for API requests
 */
export function checkRateLimit(endpoint: string): boolean {
  const key = `${endpoint}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    logSecurityEvent('rate_limit', `Rate limit exceeded for ${endpoint}`, 'medium');
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Generate and manage CSRF tokens
 */
export function generateCSRFToken(): string {
  if (csrfToken && isValidCSRFToken(csrfToken)) {
    return csrfToken;
  }

  // Generate a cryptographically secure token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  csrfToken = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

  // Store in sessionStorage with expiration
  const expiration = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  sessionStorage.setItem('csrf_token', csrfToken);
  sessionStorage.setItem('csrf_expiration', expiration.toString());

  return csrfToken;
}

export function getCSRFToken(): string | null {
  if (!csrfToken) {
    const stored = sessionStorage.getItem('csrf_token');
    const expiration = sessionStorage.getItem('csrf_expiration');

    if (stored && expiration && parseInt(expiration) > Date.now()) {
      csrfToken = stored;
    }
  }

  return csrfToken;
}

function isValidCSRFToken(token: string): boolean {
  const expiration = sessionStorage.getItem('csrf_expiration');
  return token && expiration && parseInt(expiration) > Date.now();
}

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(type: SecurityEvent['type'], details: string, severity: SecurityEvent['severity'] = 'medium'): void {
  const event: SecurityEvent = {
    timestamp: Date.now(),
    type,
    details,
    severity
  };

  securityEvents.unshift(event);

  // Keep only recent events
  if (securityEvents.length > MAX_EVENTS) {
    securityEvents = securityEvents.slice(0, MAX_EVENTS);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(`🔒 Security Event [${severity.toUpperCase()}]: ${type} - ${details}`);
  }

  // In production, you might want to send to a logging service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to monitoring service
    // await fetch('/api/security/log', { method: 'POST', body: JSON.stringify(event) });
  }
}

/**
 * Get security events for monitoring
 */
export function getSecurityEvents(): SecurityEvent[] {
  return [...securityEvents];
}

/**
 * Clear old security events
 */
export function clearSecurityEvents(): void {
  securityEvents = [];
}

/**
 * Enhanced form submission with security checks
 */
export async function secureSubmit(
  url: string,
  data: Record<string, string | number | boolean | null | undefined>,
  options: RequestInit = {}
): Promise<Response> {
  // Check rate limiting
  if (!checkRateLimit(url)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  // Add CSRF token
  const csrf = getCSRFToken();
  if (csrf) {
    (options.headers as Record<string, string>) = {
      ...(options.headers as Record<string, string>),
      'X-CSRF-Token': csrf
    };
  }

  // Sanitize all string data
  const sanitizedData: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitizedData[key] = sanitizeInput(value);
    } else {
      sanitizedData[key] = value;
    }
  }

  // Make the request
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: JSON.stringify(sanitizedData),
    ...options
  });

  // Log security events based on response
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    logSecurityEvent('validation_error', `API request failed: ${response.status} - ${errorText}`, 'medium');
  }

  return response;
}

/**
 * Initialize security features
 */
export function initializeSecurity(): void {
  // Generate CSRF token on app start
  generateCSRFToken();

  // Set up periodic cleanup of security events
  setInterval(() => {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    securityEvents = securityEvents.filter(event => event.timestamp > cutoff);
  }, 60 * 60 * 1000); // Every hour

  // Log initialization
  logSecurityEvent('csrf_error', 'Security features initialized', 'low');
}

// Export security event types for use in components
export type { SecurityEvent };
