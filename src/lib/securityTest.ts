// Security Testing Utilities
// Provides functions to test frontend security features

import { sanitizeInput, validateInput, checkRateLimit, generateCSRFToken } from './security';

export interface SecurityTestResult {
  testName: string;
  passed: boolean;
  details?: string;
  error?: string;
}

/**
 * Run comprehensive security tests
 */
export async function runSecurityTests(): Promise<SecurityTestResult[]> {
  const results: SecurityTestResult[] = [];

  // Test input sanitization
  results.push(testInputSanitization());

  // Test input validation
  results.push(...testInputValidation());

  // Test rate limiting
  results.push(await testRateLimiting());

  // Test CSRF protection
  results.push(testCSRFProtection());

  // Test dangerous pattern detection
  results.push(testDangerousPatternDetection());

  return results;
}

/**
 * Test input sanitization
 */
function testInputSanitization(): SecurityTestResult {
  try {
    const maliciousInput = '<script>alert("xss")</script>{{7*7}}test';
    const sanitized = sanitizeInput(maliciousInput, 100);

    // Check that dangerous content is removed/sanitized
    const hasScript = sanitized.includes('<script>');
    const hasTemplate = sanitized.includes('{{7*7}}');

    if (hasScript || hasTemplate) {
      return {
        testName: 'Input Sanitization',
        passed: false,
        error: 'Dangerous content not properly sanitized',
        details: `Original: ${maliciousInput}, Sanitized: ${sanitized}`
      };
    }

    return {
      testName: 'Input Sanitization',
      passed: true,
      details: 'Successfully sanitized malicious input'
    };
  } catch (error) {
    return {
      testName: 'Input Sanitization',
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test input validation patterns
 */
function testInputValidation(): SecurityTestResult[] {
  const results: SecurityTestResult[] = [];

  // Test email validation
  const emailTests = [
    { input: 'test@example.com', expected: true },
    { input: 'invalid-email', expected: false },
    { input: 'test@', expected: false },
    { input: '{{7*7}}@test.com', expected: false } // Should detect template injection
  ];

  emailTests.forEach(({ input, expected }) => {
    try {
      const result = validateInput(input, 'email');
      const passed = result.isValid === expected;

      results.push({
        testName: `Email Validation: ${input}`,
        passed,
        details: passed ? 'Email validation working correctly' : `Expected ${expected}, got ${result.isValid}`,
        error: passed ? undefined : result.error
      });
    } catch (error) {
      results.push({
        testName: `Email Validation: ${input}`,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Test phone validation
  const phoneTests = [
    { input: '+251911123456', expected: true },
    { input: '0911123456', expected: true },
    { input: '123', expected: false },
    { input: 'javascript:alert(1)', expected: false }
  ];

  phoneTests.forEach(({ input, expected }) => {
    try {
      const result = validateInput(input, 'phone');
      const passed = result.isValid === expected;

      results.push({
        testName: `Phone Validation: ${input}`,
        passed,
        details: passed ? 'Phone validation working correctly' : `Expected ${expected}, got ${result.isValid}`,
        error: passed ? undefined : result.error
      });
    } catch (error) {
      results.push({
        testName: `Phone Validation: ${input}`,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return results;
}

/**
 * Test rate limiting
 */
async function testRateLimiting(): Promise<SecurityTestResult> {
  try {
    const endpoint = '/api/test';
    let allowedCount = 0;
    let blockedCount = 0;

    // Test multiple rapid requests
    for (let i = 0; i < 15; i++) {
      const allowed = checkRateLimit(endpoint);
      if (allowed) {
        allowedCount++;
      } else {
        blockedCount++;
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Should allow some requests but block excessive ones
    if (allowedCount > 0 && blockedCount > 0) {
      return {
        testName: 'Rate Limiting',
        passed: true,
        details: `Allowed ${allowedCount} requests, blocked ${blockedCount} requests`
      };
    } else {
      return {
        testName: 'Rate Limiting',
        passed: false,
        error: `Unexpected rate limiting behavior: ${allowedCount} allowed, ${blockedCount} blocked`
      };
    }
  } catch (error) {
    return {
      testName: 'Rate Limiting',
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test CSRF protection
 */
function testCSRFProtection(): SecurityTestResult {
  try {
    const token1 = generateCSRFToken();
    const token2 = generateCSRFToken();

    // Should generate different tokens
    if (token1 !== token2 && token1.length > 0 && token2.length > 0) {
      return {
        testName: 'CSRF Protection',
        passed: true,
        details: 'CSRF tokens generated successfully'
      };
    } else {
      return {
        testName: 'CSRF Protection',
        passed: false,
        error: 'CSRF token generation failed or tokens are identical'
      };
    }
  } catch (error) {
    return {
      testName: 'CSRF Protection',
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test dangerous pattern detection
 */
function testDangerousPatternDetection(): SecurityTestResult {
  try {
    const dangerousInputs = [
      '{{7*7}}',
      '${user.name}',
      '<script>alert(1)</script>',
      'eval("malicious")',
      'os.system("rm -rf /")',
      'import subprocess'
    ];

    let detectedCount = 0;
    for (const input of dangerousInputs) {
      const validation = validateInput(input, 'name');
      if (!validation.isValid) {
        detectedCount++;
      }
    }

    // Should detect most dangerous patterns
    if (detectedCount >= dangerousInputs.length * 0.8) { // 80% detection rate
      return {
        testName: 'Dangerous Pattern Detection',
        passed: true,
        details: `Detected ${detectedCount}/${dangerousInputs.length} dangerous patterns`
      };
    } else {
      return {
        testName: 'Dangerous Pattern Detection',
        passed: false,
        error: `Only detected ${detectedCount}/${dangerousInputs.length} dangerous patterns`
      };
    }
  } catch (error) {
    return {
      testName: 'Dangerous Pattern Detection',
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test file validation security
 */
export async function testFileValidation(file: File): Promise<SecurityTestResult> {
  try {
    // Import validateFile from useSecurity hook
    const { validateFile } = await import('../hooks/useSecurity');

    const result = validateFile(file);

    return {
      testName: `File Validation: ${file.name}`,
      passed: result.isValid,
      details: result.isValid ? 'File validation passed' : 'File validation failed',
      error: result.error
    };
  } catch (error) {
    return {
      testName: `File Validation: ${file.name}`,
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
