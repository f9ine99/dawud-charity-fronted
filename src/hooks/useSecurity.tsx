import { useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { initializeSecurity, logSecurityEvent, SecurityEvent, VALIDATION_PATTERNS } from '@/lib/security';

interface UseSecurityOptions {
  enableRateLimit?: boolean;
  enableCSRF?: boolean;
  enableMonitoring?: boolean;
  maxFormSubmissions?: number;
  monitoringEndpoint?: string;
}

export function useSecurity(options: UseSecurityOptions = {}) {
  const {
    enableRateLimit = true,
    enableCSRF = true,
    enableMonitoring = true,
    maxFormSubmissions = 5,
    monitoringEndpoint = '/api/security/events'
  } = options;

  const { toast } = useToast();
  const submissionCount = useRef(0);
  const lastSubmissionTime = useRef<number>(0);

  // Initialize security on mount
  useEffect(() => {
    initializeSecurity();

    // Set up periodic monitoring report
    if (enableMonitoring) {
      const interval = setInterval(() => {
        reportSecurityEvents();
      }, 300000); // Every 5 minutes

      return () => clearInterval(interval);
    }
  }, [enableMonitoring]);

  // Report security events to server (if enabled)
  const reportSecurityEvents = useCallback(async () => {
    if (!enableMonitoring) return;

    try {
      const events = JSON.parse(localStorage.getItem('security_events') || '[]');
      if (events.length === 0) return;

      // Send to monitoring endpoint (if available)
      await fetch(monitoringEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events, timestamp: Date.now() })
      });

      // Clear reported events
      localStorage.setItem('security_events', '[]');
    } catch (error) {
      console.error('Failed to report security events:', error);
    }
  }, [enableMonitoring, monitoringEndpoint]);

  // Enhanced form submission with security checks
  const secureSubmit = useCallback(async (
    url: string,
    data: Record<string, any>,
    formId?: string
  ): Promise<Response> => {
    // Check submission rate limiting
    if (enableRateLimit) {
      const now = Date.now();
      const timeSinceLastSubmission = now - lastSubmissionTime.current;

      // Reset counter if it's been more than 1 minute
      if (timeSinceLastSubmission > 60000) {
        submissionCount.current = 0;
      }

      if (submissionCount.current >= maxFormSubmissions) {
        logSecurityEvent('rate_limit', `Form submission rate limit exceeded for ${formId || 'unknown form'}`, 'high');
        toast({
          title: "Rate Limit Exceeded",
          description: "Too many form submissions. Please wait a moment and try again.",
          variant: "destructive",
        });
        throw new Error('Rate limit exceeded');
      }

      submissionCount.current++;
      lastSubmissionTime.current = now;
    }

    // Import security utilities dynamically to avoid bundle bloat
    const securityModule = await import('@/lib/security');
    const submitSecurely = securityModule.secureSubmit;

    try {
      return await submitSecurely(url, data as Record<string, string | number | boolean | null | undefined>);
    } catch (error) {
      // Log security-related errors
      if (error instanceof Error) {
        if (error.message.includes('Rate limit') || error.message.includes('Invalid input')) {
          logSecurityEvent('validation_error', error.message, 'medium');
        }
      }
      throw error;
    }
  }, [enableRateLimit, maxFormSubmissions, toast]);

  // Input sanitization hook
  const sanitizeInput = useCallback(async (input: string, maxLength?: number): Promise<string> => {
    const { sanitizeInput: sanitize } = await import('@/lib/security');
    return sanitize(input, maxLength);
  }, []);

  // Input validation hook
  const validateInput = useCallback(async (input: string, type: keyof typeof VALIDATION_PATTERNS): Promise<{ isValid: boolean; error?: string }> => {
    const { validateInput: validate } = await import('@/lib/security');
    return validate(input, type);
  }, []);

  // File validation with security checks
  const validateFile = useCallback((file: File): { isValid: boolean; error?: string } => {
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { isValid: false, error: `File size must be less than 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB` };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Please upload a JPG or PNG image file' };
    }

    // Check for suspicious file names
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /\.\./, // Path traversal
      /[<>:"|?*]/ // Invalid filename characters
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(file.name)) {
        logSecurityEvent('injection_attempt', `Suspicious filename: ${file.name}`, 'high');
        return { isValid: false, error: 'Invalid filename detected' };
      }
    }

    return { isValid: true };
  }, []);

  // Get security statistics
  const getSecurityStats = useCallback((): {
    events: SecurityEvent[];
    submissionCount: number;
    lastSubmissionTime: number;
  } => {
    const events = JSON.parse(localStorage.getItem('security_events') || '[]');
    return {
      events,
      submissionCount: submissionCount.current,
      lastSubmissionTime: lastSubmissionTime.current
    };
  }, []);

  // Clear security data (for testing/debugging)
  const clearSecurityData = useCallback(() => {
    submissionCount.current = 0;
    lastSubmissionTime.current = 0;
    localStorage.removeItem('security_events');
    localStorage.removeItem('csrf_token');
    localStorage.removeItem('csrf_expiration');
  }, []);

  return {
    secureSubmit,
    sanitizeInput,
    validateInput,
    validateFile,
    getSecurityStats,
    clearSecurityData,
    reportSecurityEvents,
    logSecurityEvent
  };
}
