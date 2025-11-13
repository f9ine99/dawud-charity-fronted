import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, Heart, Droplets, BookOpen, Home, DollarSign, CheckCircle, AlertCircle, Upload, MessageSquare, User, CreditCard, FileText, Sparkles, Shield, Clock, Star, X, Image, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSecurity } from '@/hooks/useSecurity';

// Import bank logos
import commercialBankLogo from '@/assets/banks/CBE_bank.png';
import oromiaBankLogo from '@/assets/banks/Oromia_bank.png';
import hijraBankLogo from '@/assets/banks/hijra-bank-logo.png';
import zamzamBankLogo from '@/assets/banks/zamzam-bank.png';
import awashBankLogo from '@/assets/banks/Awash-Bank.png';
import oromiaCooperativeLogo from '@/assets/banks/Cooperative_Bank_of_Oromia.png';
import abyssiniaBankLogo from '@/assets/banks/abyssinia-bank.jpg';

const DonatePage = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [hoveredBank, setHoveredBank] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    transactionReference: '',
    name: '',
    contact: '',
    bank: '',
    amount: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [uploadState, setUploadState] = useState<{
    file: File | null;
    isUploading: boolean;
    progress: number;
    error: string | null;
    preview: string | null;
  }>({
    file: null,
    isUploading: false,
    progress: 0,
    error: null,
    preview: null
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { secureSubmit, sanitizeInput, validateInput, validateFile, logSecurityEvent } = useSecurity();

  // Animation hook for fade-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-fill amount when tier is selected
  useEffect(() => {
    if (selectedTier !== null && donationTiers[selectedTier]) {
      setFormData(prev => ({
        ...prev,
        amount: donationTiers[selectedTier].amount.replace(' ETB', '')
      }));
    }
  }, [selectedTier]);

  const bankAccounts = [
    { bank: 'Commercial Bank', account: '1000388115444', logo: commercialBankLogo },
    { bank: 'Oromia Bank', account: '1493281700001', logo: oromiaBankLogo },
    { bank: 'Hijra Bank', account: '1001097420001', logo: hijraBankLogo },
    { bank: 'Zamzam Bank', account: '0019001920101', logo: zamzamBankLogo },
    { bank: 'Awash Bank', account: '01425412116600', logo: awashBankLogo },
    { bank: 'Oromia Cooperative Bank', account: '1000085221616', logo: oromiaCooperativeLogo },
    { bank: 'Abyssinia Bank', account: '227989898', logo: abyssiniaBankLogo },
  ];

  const donationTiers = [
    {
      amount: '500 ETB',
      title: 'Clean Water',
      description: 'Provides clean drinking water for a family for one week',
      icon: Droplets,
      color: 'bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300',
      impact: '1 Family',
      duration: '1 Week'
    },
    {
      amount: '1,100 ETB',
      title: 'School Supplies',
      description: 'Complete educational materials for one student',
      icon: BookOpen,
      color: 'bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300',
      impact: '1 Student',
      duration: '1 Month'
    },
    {
      amount: '2,750 ETB',
      title: 'Medical Support',
      description: 'Healthcare coverage for one person for a month',
      icon: Heart,
      color: 'bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300',
      impact: '1 Person',
      duration: '1 Month'
    },
    {
      amount: '5,500 ETB',
      title: 'Orphan Care',
      description: 'Monthly support for one orphaned child including food and shelter',
      icon: Home,
      color: 'bg-orange-100 dark:bg-orange-800/50 text-orange-700 dark:text-orange-300',
      impact: '1 Child',
      duration: '1 Month'
    },
    {
      amount: '27,500 ETB',
      title: 'Water Well',
      description: 'Contribute to building a community water well project',
      icon: Droplets,
      color: 'bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300',
      impact: '1 Community',
      duration: 'Permanent'
    },
  ];

  // File upload handlers

  const createFilePreview = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    // Enhanced file validation with security checks
    const fileValidation = validateFile(file);
    if (!fileValidation.isValid) {
      setUploadState(prev => ({ ...prev, error: fileValidation.error || 'Invalid file', file: null, preview: null }));
      logSecurityEvent('injection_attempt', `File validation failed: ${fileValidation.error}`, 'medium');
      toast({
        title: "Invalid File",
        description: fileValidation.error || 'Invalid file detected',
        variant: "destructive",
      });
      return;
    }

    setUploadState(prev => ({ ...prev, error: null, isUploading: true, progress: 0 }));

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 30, 90)
      }));
    }, 200);

    try {
      // Create preview
      const preview = await createFilePreview(file);

      // Set the file in the input element for form submission
      if (fileInputRef.current) {
        // Create a new FileList-like object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }

        // Also store the file in uploadState for form submission
      setUploadState(prev => ({ ...prev, file }));
      console.log('File stored in uploadState:', file.name, file.size, file.type);

      // Simulate upload completion
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadState(prev => ({
          ...prev,
          file,
          preview,
          isUploading: false,
          progress: 100
        }));

        toast({
          title: "File Selected",
          description: `${file.name} (${(file.size / 1024).toFixed(0)}KB) ready for upload`,
        });
      }, 1500 + Math.random() * 1000); // Random upload time between 1.5-2.5 seconds

    } catch (error) {
      clearInterval(progressInterval);
      setUploadState(prev => ({
        ...prev,
        error: 'Failed to process file',
        isUploading: false,
        progress: 0
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Don't reset input value here - we need to keep the file for form submission
    // The input will be cleared after successful form submission
  };

  const clearFile = () => {
    setUploadState({
      file: null,
      isUploading: false,
      progress: 0,
      error: null,
      preview: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = async (account: string, bank: string) => {
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(account);
      setCopiedAccount(account);
      toast({
        title: "Account Number Copied!",
        description: `${bank} account number copied to clipboard`,
      });
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API or when it fails
      try {
        // Fallback method using document.execCommand (deprecated but widely supported)
        const textArea = document.createElement('textarea');
        textArea.value = account;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopiedAccount(account);
          toast({
            title: "Account Number Copied!",
            description: `${bank} account number copied to clipboard`,
          });
          setTimeout(() => setCopiedAccount(null), 2000);
          return;
        }
      } catch (fallbackErr) {
        // If both methods fail, show a more helpful error with the account number
        console.error('Copy failed:', fallbackErr);
      }

      // Final fallback: show toast with account number for manual copying
      toast({
        title: "Copy Failed - Manual Copy Required",
        description: `Please manually copy this ${bank} account number: ${account}`,
        variant: "destructive",
        duration: 5000, // Show longer so users can copy
      });
    }
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    // Sanitize inputs first
    const sanitizedName = await sanitizeInput(formData.name, 100);
    const sanitizedContact = await sanitizeInput(formData.contact, 100);
    const sanitizedAmount = await sanitizeInput(formData.amount, 50);
    const sanitizedMessage = await sanitizeInput(formData.message, 500);
    const sanitizedTransactionRef = await sanitizeInput(formData.transactionReference, 100);

    // Validate required fields
    if (!sanitizedName.trim()) {
      newErrors.name = 'Full name is required';
    } else {
      const nameValidation = await validateInput(sanitizedName, 'name');
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.error || 'Invalid name format';
      }
    }

    if (!sanitizedContact.trim()) {
      newErrors.contact = 'Email or phone number is required';
    } else {
      // Determine if it's email or phone and validate accordingly
      if (sanitizedContact.includes('@')) {
        const emailValidation = await validateInput(sanitizedContact, 'email');
        if (!emailValidation.isValid) {
          newErrors.contact = emailValidation.error || 'Invalid email format';
        }
      } else {
        const phoneValidation = await validateInput(sanitizedContact, 'phone');
        if (!phoneValidation.isValid) {
          newErrors.contact = phoneValidation.error || 'Invalid phone format';
        }
      }
    }

    if (!formData.bank) {
      newErrors.bank = 'Please select the bank you used';
    }

    if (!sanitizedAmount.trim()) {
      newErrors.amount = 'Donation amount is required';
    } else {
      const amountValidation = await validateInput(sanitizedAmount, 'amount');
      if (!amountValidation.isValid) {
        newErrors.amount = amountValidation.error || 'Invalid amount format';
      }
    }

    // Validate transaction reference if provided
    if (sanitizedTransactionRef && sanitizedTransactionRef.trim()) {
      const refValidation = await validateInput(sanitizedTransactionRef, 'transactionRef');
      if (!refValidation.isValid) {
        newErrors.transactionReference = refValidation.error || 'Invalid transaction reference format';
      }
    }

    // Validate message if provided
    if (sanitizedMessage && sanitizedMessage.trim()) {
      const messageValidation = await validateInput(sanitizedMessage, 'message');
      if (!messageValidation.isValid) {
        newErrors.message = messageValidation.error || 'Message contains invalid characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = async (field: string, value: string) => {
    // Sanitize input as user types (except for amount and contact fields which need special handling)
    let sanitizedValue = value;
    if (field !== 'amount' && field !== 'contact') {
      sanitizedValue = await sanitizeInput(value, field === 'message' ? 500 : 100);
    }

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));

    // Clear errors for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      logSecurityEvent('validation_error', 'Form validation failed on client side', 'medium');
      toast({
        title: "Validation Error",
        description: "Please check the form and correct any errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize form data before submission
      const sanitizedData = {
        transaction_reference: (await sanitizeInput(formData.transactionReference, 100)).trim() || undefined,
        donor_name: await sanitizeInput(formData.name, 100),
        donor_contact: await sanitizeInput(formData.contact, 100),
        bank_used: formData.bank,
        amount_donated: await sanitizeInput(formData.amount, 50),
        message: (await sanitizeInput(formData.message, 500)) || undefined
      };

      // Prepare form data for multipart submission
      const formDataToSend = new FormData();

      // Add sanitized text fields
      Object.entries(sanitizedData).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formDataToSend.append(key, value);
        }
      });

      // Add proof image if uploaded and validated
      if (uploadState.file) {
        const fileValidation = validateFile(uploadState.file);
        if (!fileValidation.isValid) {
          toast({
            title: "File Validation Error",
            description: fileValidation.error || "Invalid file",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        formDataToSend.append('proof_image', uploadState.file);
      }

      // Make API request - use backend URL directly for development, environment variables for production
      const apiUrl = import.meta.env.MODE === 'production'
        ? `${import.meta.env.VITE_API_PROTOCOL || 'https'}://${import.meta.env.VITE_API_DOMAIN || 'localhost'}${import.meta.env.VITE_API_PORT && import.meta.env.VITE_API_PORT !== '443' ? `:${import.meta.env.VITE_API_PORT}` : ''}/api/submit-donation`
        : 'http://localhost:8000/api/submit-donation';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        toast({
          title: "Donation Confirmed!",
          description: `Thank you for your generous donation. Your transaction reference is: ${result.transaction_reference}`,
        });

        // Reset form after successful submission
        setFormData({
          transactionReference: '',
          name: '',
          contact: '',
          bank: '',
          amount: '',
          message: ''
        });

        // Clear file input and upload state
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setUploadState({
          file: null,
          isUploading: false,
          progress: 0,
          error: null,
          preview: null
        });

        // Log successful submission
        logSecurityEvent('validation_error', 'Donation form submitted successfully', 'low');
      } else {
        // Handle backend validation errors with security logging
        const errorMessage = result.detail || result.message || 'Submission failed';
        logSecurityEvent('validation_error', `Backend validation error: ${errorMessage}`, 'medium');

        toast({
          title: "Submission Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Submission error:', error);

      // Enhanced error handling with security logging
      if (error instanceof Error) {
        if (error.message.includes('Rate limit')) {
          logSecurityEvent('rate_limit', 'Frontend rate limit triggered', 'high');
        } else if (error.message.includes('Invalid input')) {
          logSecurityEvent('injection_attempt', `Client-side validation bypassed: ${error.message}`, 'critical');
        } else {
          logSecurityEvent('validation_error', `Form submission error: ${error.message}`, 'medium');
        }
      }

      toast({
        title: "Submission Failed",
        description: "There was an error submitting your donation confirmation. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Your generosity helps us continue our vital work in the community. 
            Every donation, no matter the size, creates meaningful change.
          </p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 bg-background dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Impact
            </h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground/80">
              See how your donation creates lasting change in Ethiopian communities
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {donationTiers.map((tier, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden ${
                  selectedTier === index
                    ? 'ring-2 ring-primary shadow-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 scale-105'
                    : 'hover:shadow-card bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700/50 border-2 hover:border-primary/30 dark:hover:border-primary/40'
                }`}
                onClick={() => setSelectedTier(selectedTier === index ? null : index)}
              >
                <CardContent className="p-6 text-center relative">
                  {/* Selection indicator */}
                  {selectedTier === index && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary dark:bg-primary/90 rounded-full flex items-center justify-center animate-scale-in">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Background decoration with animation */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 dark:from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10 transition-all duration-500 group-hover:scale-150"></div>

                  {/* Icon with enhanced styling and animation */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-500 ${
                    selectedTier === index
                      ? 'bg-gradient-to-br from-primary to-primary/90 shadow-primary/30 scale-110'
                      : 'bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 group-hover:shadow-primary/25 dark:group-hover:shadow-primary/35 group-hover:scale-110'
                  }`}>
                    <tier.icon className={`w-8 h-8 text-white transition-all duration-300 ${selectedTier === index ? 'animate-bounce' : ''}`} />
                    {selectedTier === index && (
                      <Sparkles className="w-3 h-3 text-yellow-300 dark:text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    )}
                  </div>

                  {/* Amount badge with enhanced styling */}
                  <div className="relative z-10 mb-4">
                    <Badge className={`${tier.color} text-xl font-bold px-4 py-2 shadow-md border-2 border-white/20 transition-all duration-300 ${
                      selectedTier === index ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                    }`}>
                      {tier.amount}
                    </Badge>
                  </div>

                  {/* Title with selection state */}
                  <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
                    selectedTier === index
                      ? 'text-primary'
                      : 'text-foreground group-hover:text-primary'
                  }`}>
                    {tier.title}
                    {selectedTier === index && (
                      <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 inline ml-1 animate-spin" />
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground dark:text-muted-foreground/90 text-sm mb-4 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Impact and duration info with enhanced styling */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className={`rounded-lg p-2 transition-all duration-300 ${
                      selectedTier === index
                        ? 'bg-primary/15 dark:bg-primary/20 border border-primary/20 dark:border-primary/30'
                        : 'bg-primary/10 dark:bg-primary/15 group-hover:bg-primary/15 dark:group-hover:bg-primary/20'
                    }`}>
                      <div className={`font-semibold transition-colors duration-300 ${
                        selectedTier === index ? 'text-primary' : 'text-primary'
                      }`}>
                        {tier.impact}
                      </div>
                      <div className="text-muted-foreground dark:text-muted-foreground/80">Beneficiary</div>
                    </div>
                    <div className={`rounded-lg p-2 transition-all duration-300 ${
                      selectedTier === index
                        ? 'bg-secondary/15 dark:bg-secondary/20 border border-secondary/20 dark:border-secondary/30'
                        : 'bg-secondary/10 dark:bg-secondary/15 group-hover:bg-secondary/15 dark:group-hover:bg-secondary/20'
                    }`}>
                      <div className={`font-semibold transition-colors duration-300 ${
                        selectedTier === index ? 'text-secondary' : 'text-secondary'
                      }`}>
                        {tier.duration}
                      </div>
                      <div className="text-muted-foreground dark:text-muted-foreground/80">Duration</div>
                    </div>
                  </div>

                  {/* Selection feedback */}
                  {selectedTier === index && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
                  )}

                  {/* Hover effect decoration */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 dark:from-primary/30 via-secondary/20 dark:via-secondary/30 to-primary/20 dark:to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected tier info */}
          {selectedTier !== null && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 dark:from-primary/15 to-secondary/10 dark:to-secondary/15 rounded-xl border-2 border-primary/20 dark:border-primary/30 animate-scale-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 rounded-lg flex items-center justify-center">
                    {(() => {
                      const IconComponent = donationTiers[selectedTier].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{donationTiers[selectedTier].title}</h3>
                    <p className="text-muted-foreground dark:text-muted-foreground/90">{donationTiers[selectedTier].description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{donationTiers[selectedTier].amount}</div>
                  <div className="text-sm text-muted-foreground dark:text-muted-foreground/80">Amount auto-filled</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Bank Accounts */}
      <section id="bank-accounts" className="py-16 bg-gradient-subtle dark:bg-slate-900/80 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-primary/20 dark:border-primary/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-secondary/20 dark:border-secondary/30 rounded-lg rotate-45 animate-wave"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Bank Account Information
            </h2>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6 border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-2">
                MUFTI DAWUD KEMISSIE YOUTH CHARITY
              </h3>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground/80">
                Account Holder Name
              </p>
            </div>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground/80">
              Choose any of our trusted banking partners to make your secure donation
            </p>

            {/* Security badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant Processing</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Verified Accounts</span>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {bankAccounts.map((bank, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  hoveredBank === index ? 'ring-2 ring-primary shadow-primary/20' : ''
                }`}
                onMouseEnter={() => setHoveredBank(index)}
                onMouseLeave={() => setHoveredBank(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {/* Enhanced bank logo */}
                      <div className={`w-16 h-12 flex items-center justify-center bg-white rounded-lg border-2 transition-all duration-300 ${
                        hoveredBank === index ? 'border-primary shadow-lg scale-110' : 'border-gray-200'
                      }`}>
                        <img
                          src={bank.logo}
                          alt={`${bank.bank} logo`}
                          className="w-14 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          hoveredBank === index ? 'text-primary' : 'text-foreground'
                        }`}>
                          {bank.bank}
                        </h3>
                        <div className="relative pointer-events-auto">
                          <p
                            className="text-muted-foreground dark:text-muted-foreground/80 font-mono text-sm bg-gray-50 px-2 py-1 rounded mt-1 cursor-pointer hover:bg-gray-100 transition-colors select-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const range = document.createRange();
                              range.selectNodeContents(e.currentTarget);
                              const selection = window.getSelection();
                              if (selection) {
                                selection.removeAllRanges();
                                selection.addRange(range);
                              }
                            }}
                            title="Click to select account number"
                          >
                            {bank.account}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced copy button */}
                    <div className="relative z-20 pointer-events-auto">
                      <Button
                        variant={copiedAccount === bank.account ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          copyToClipboard(bank.account, bank.bank);
                        }}
                        className={`transition-all duration-300 pointer-events-auto ${
                          copiedAccount === bank.account
                            ? 'bg-green-600 dark:bg-green-50 dark:bg-green-900/200 dark:bg-green-50 dark:bg-green-900/200 dark:bg-green-400 hover:bg-green-700 dark:hover:bg-green-600 dark:hover:bg-green-600 dark:bg-green-50 dark:bg-green-900/200 text-white shadow-lg scale-105'
                            : hoveredBank === index
                              ? 'border-primary text-primary hover:bg-primary hover:text-white'
                              : ''
                        }`}
                      >
                      {copiedAccount === bank.account ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          <span>Copy</span>
                        </>
                      )}
                      </Button>
                    </div>
                  </div>

                  {/* Bank features */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-muted-foreground dark:text-muted-foreground/80">
                      <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span>Secure Transfer</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground dark:text-muted-foreground/80">
                      <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>24/7 Available</span>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 ${
                    hoveredBank === index ? 'opacity-100' : ''
                  }`}></div>

                  {/* Selection indicator */}
                  {hoveredBank === index && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-8 p-6 bg-blue-50/50 border border-blue-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Important Banking Information</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• All accounts are verified and regularly monitored for security</li>
                  <li>• Copy account numbers directly from this page to avoid errors</li>
                  <li>• Contact us if you need assistance with your transfer</li>
                  <li>• Your donation will be acknowledged within 24 hours</li>
                  <li>• After making your payment, return to this website and use the donation confirmation form above to verify your contribution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Donation Confirmation Form */}
      <section className="py-16 bg-gradient-subtle dark:bg-slate-900/80 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-primary/20 dark:border-primary/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-secondary/20 dark:border-secondary/30 rounded-lg rotate-45 animate-wave"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-6 shadow-lg animate-scale-in">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Donation Confirmation
            </h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
              After making your payment using any of the bank accounts above, please use this form to confirm your donation details
            </p>

            {/* Progress indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                <div className="w-3 h-3 bg-green-50 dark:bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure Form</span>
                <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Process</span>
              </div>
            </div>

            {/* Step-by-step workflow */}
            <div className="mt-8 p-6 bg-blue-50/50 border border-blue-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Make Your Payment</h4>
                  <p className="text-blue-800 text-sm">Transfer money to any of our verified bank accounts listed above</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 mt-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Confirm Your Donation</h4>
                  <p className="text-blue-800 text-sm">Return here and fill out this form with your payment details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 mt-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Get Acknowledgment</h4>
                  <p className="text-blue-800 text-sm">We'll verify your donation and add you to our donor wall within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <Card className="shadow-card border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-800/50 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">Thank You!</h3>
                <p className="text-green-700 dark:text-green-200 mb-6">
                  Your donation confirmation has been submitted successfully. We'll review your details and add you to our donor wall.
                </p>
                <Button
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline"
                  className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/30"
                >
                  Submit Another Confirmation
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto">

              {/* Enhanced Main Form */}
              <div className="w-full">
                <Card className="shadow-xl bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-slate-800 dark:via-slate-700/30 dark:to-slate-800 border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <CardHeader className="bg-gradient-to-br from-primary via-primary-glow to-secondary text-white rounded-t-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full translate-y-12 -translate-x-12"></div>
                    <CardTitle className="text-center text-2xl relative z-10 flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span>Confirm Your Donation</span>
                    </CardTitle>
                    <p className="text-center text-white/90 mt-2 relative z-10">
                      Help us verify your generous contribution
                    </p>
                  </CardHeader>
                  <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">
                      {/* Enhanced Personal Information */}
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="flex items-center space-x-4 mb-6 p-6 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent rounded-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground mb-1">Personal Information</h3>
                              <p className="text-muted-foreground text-sm">Tell us about yourself</p>
                            </div>
                            {formData.name && formData.contact && (
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center animate-pulse">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-semibold text-foreground">
                              <User className="w-4 h-4 text-primary" />
                              <span>Full Name</span>
                              <span className="text-red-600 dark:text-red-400">*</span>
                            </Label>
                            <div className="relative group">
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter your full name"
                                className={`h-12 px-4 bg-white dark:bg-slate-800 border-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                                  errors.name
                                    ? 'border-red-300 dark:border-red-500 focus:border-red-500'
                                    : formData.name
                                      ? 'border-green-300 dark:border-green-500 bg-green-50/50 dark:bg-green-900/20'
                                      : 'border-gray-200 dark:border-gray-600 hover:border-primary/50 focus:border-primary'
                                } rounded-lg`}
                              />
                              {formData.name && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 animate-scale-in" />
                                </div>
                              )}
                            </div>
                            {errors.name && (
                              <p className="text-red-600 dark:text-red-400 text-xs flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.name}</span>
                              </p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="contact" className="flex items-center space-x-2 text-sm font-semibold text-foreground">
                              <MessageSquare className="w-4 h-4 text-secondary" />
                              <span>Email or Phone</span>
                              <span className="text-red-600 dark:text-red-400">*</span>
                            </Label>
                            <div className="relative group">
                              <Input
                                id="contact"
                                value={formData.contact}
                                onChange={(e) => handleInputChange('contact', e.target.value)}
                                placeholder="email@example.com or +251 911 123 456"
                                className={`h-12 px-4 bg-white dark:bg-slate-800 border-2 transition-all duration-300 focus:ring-2 focus:ring-secondary/20 ${
                                  errors.contact
                                    ? 'border-red-300 dark:border-red-500 focus:border-red-500'
                                    : formData.contact
                                      ? 'border-green-300 dark:border-green-500 bg-green-50/50 dark:bg-green-900/20'
                                      : 'border-gray-200 dark:border-gray-600 hover:border-secondary/50 focus:border-secondary'
                                } rounded-lg`}
                              />
                              {formData.contact && !errors.contact && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 animate-scale-in" />
                                </div>
                              )}
                            </div>
                            {errors.contact && (
                              <p className="text-red-600 dark:text-red-400 text-xs flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.contact}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Payment Information */}
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="flex items-center space-x-4 mb-6 p-6 bg-gradient-to-r from-secondary/5 via-secondary/3 to-primary/5 rounded-2xl border-2 border-secondary/10 hover:border-secondary/20 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-xl flex items-center justify-center shadow-lg">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground mb-1">Payment Information</h3>
                              <p className="text-muted-foreground text-sm">Enter your payment and transaction details</p>
                            </div>
                            {(formData.transactionReference && formData.bank && formData.amount) && (
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center animate-pulse">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                            )}
                          </div>

                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tl from-secondary/5 dark:from-secondary/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Transaction Reference Field */}
                          <div className="group">
                            <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                              formData.transactionReference
                                ? 'border-green-300 dark:border-green-600 bg-green-50/30 dark:bg-green-900/20 shadow-green-100/50 dark:shadow-green-800/30'
                                : errors.transactionReference
                                  ? 'border-red-300 dark:border-red-600 bg-red-50/30 dark:bg-red-900/20 shadow-red-100/50 dark:shadow-red-800/30'
                                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 hover:border-primary/50 dark:hover:border-primary/60 hover:bg-primary/5 dark:hover:bg-primary/10'
                            }`}>
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  formData.transactionReference
                                    ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400'
                                    : 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary/90 group-hover:bg-primary dark:group-hover:bg-primary/90 group-hover:text-white'
                                }`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="transactionReference" className="text-sm font-semibold text-foreground cursor-pointer">
                                    Transaction Reference
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Required</span>
                                    <span className="text-red-600 dark:text-red-400 text-xs">*</span>
                                  </div>
                                </div>
                                {formData.transactionReference && (
                                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center animate-scale-in">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  </div>
                                )}
                              </div>

                              <div className="relative">
                                <Input
                                  id="transactionReference"
                                  value={formData.transactionReference}
                                  onChange={(e) => handleInputChange('transactionReference', e.target.value)}
                                  placeholder="e.g., TXN-2025-001"
                                  className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 ${
                                    errors.transactionReference
                                      ? 'border-red- dark:border-red-500 focus:border-red- dark:border-red-500'
                                      : formData.transactionReference
                                        ? 'border-green- dark:border-green-500 dark:border-green- dark:border-green-400 focus:border-green- dark:border-green-500 dark:focus:border-green- dark:border-green-400'
                                        : 'focus:border-primary'
                                  }`}
                                />
                              </div>

                              {errors.transactionReference && (
                                <div className="mt-2 p-2 bg-red-50 border border-red- dark:border-red-200 rounded-lg animate-scale-in">
                                  <p className="text-red- dark:text-red-600 text-xs flex items-center space-x-2">
                                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                    <span>{errors.transactionReference}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bank Selection Field */}
                          <div className="group">
                            <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                              formData.bank
                                ? 'border-green-300 dark:border-green-600 bg-green-50/30 dark:bg-green-900/20 shadow-green-100/50 dark:shadow-green-800/30'
                                : errors.bank
                                  ? 'border-red-300 dark:border-red-600 bg-red-50/30 dark:bg-red-900/20 shadow-red-100/50 dark:shadow-red-800/30'
                                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 hover:border-primary/50 dark:hover:border-primary/60 hover:bg-primary/5 dark:hover:bg-primary/10'
                            }`}>
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  formData.bank
                                    ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400'
                                    : 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary/90 group-hover:bg-primary dark:group-hover:bg-primary/90 group-hover:text-white'
                                }`}>
                                  <Shield className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="bank" className="text-sm font-semibold text-foreground cursor-pointer">
                                    Bank Used
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Required</span>
                                    <span className="text-red-600 dark:text-red-400 text-xs">*</span>
                                  </div>
                                </div>
                                {formData.bank && (
                                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center animate-scale-in">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  </div>
                                )}
                              </div>

                              <Select value={formData.bank} onValueChange={(value) => handleInputChange('bank', value)}>
                                <SelectTrigger className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 ${
                                  errors.bank ? 'border-red- dark:border-red-500 focus:border-red- dark:border-red-500' : ''
                                }`}>
                                  <SelectValue placeholder="Select the bank you used for transfer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {bankAccounts.map((bank, index) => (
                                    <SelectItem key={index} value={bank.bank.toLowerCase().replace(' ', '-')}>
                                      <div className="flex items-center space-x-2">
                                        <img src={bank.logo} alt={bank.bank} className="w-4 h-4" />
                                        <span>{bank.bank}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {errors.bank && (
                                <div className="mt-2 p-2 bg-red-50 border border-red- dark:border-red-200 rounded-lg animate-scale-in">
                                  <p className="text-red- dark:text-red-600 text-xs flex items-center space-x-2">
                                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                    <span>{errors.bank}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Amount Field */}
                          <div className="group">
                            <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                              formData.amount
                                ? 'border-green-300 dark:border-green-600 bg-green-50/30 dark:bg-green-900/20 shadow-green-100/50 dark:shadow-green-800/30'
                                : errors.amount
                                  ? 'border-red-300 dark:border-red-600 bg-red-50/30 dark:bg-red-900/20 shadow-red-100/50 dark:shadow-red-800/30'
                                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 hover:border-primary/50 dark:hover:border-primary/60 hover:bg-primary/5 dark:hover:bg-primary/10'
                            }`}>
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  formData.amount
                                    ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400'
                                    : 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary/90 group-hover:bg-primary dark:group-hover:bg-primary/90 group-hover:text-white'
                                }`}>
                                  <DollarSign className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="amount" className="text-sm font-semibold text-foreground cursor-pointer">
                                    Amount Donated
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Required</span>
                                    <span className="text-red-600 dark:text-red-400 text-xs">*</span>
                                  </div>
                                </div>
                                {formData.amount && (
                                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center animate-scale-in">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  </div>
                                )}
                              </div>

                              <div className="relative">
                                <Input
                                  id="amount"
                                  value={formData.amount}
                                  onChange={(e) => handleInputChange('amount', e.target.value)}
                                  placeholder="275, 1,000, or 275.00 ETB"
                                  className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 ${
                                    errors.amount ? 'border-red- dark:border-red-500 focus:border-red- dark:border-red-500' : ''
                                  }`}
                                />
                              </div>

                              {errors.amount && (
                                <div className="mt-2 p-2 bg-red-50 border border-red- dark:border-red-200 rounded-lg animate-scale-in">
                                  <p className="text-red- dark:text-red-600 text-xs flex items-center space-x-2">
                                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                    <span>{errors.amount}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Progress indicator for payment section */}
                        <div className="flex items-center justify-center space-x-4 p-3 bg-gray-50/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              formData.transactionReference ? 'bg-green-50 dark:bg-green-900/200 dark:bg-green-400 scale-110' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Transaction</span>
                          </div>
                          <div className="w-8 h-0.5 bg-gray-200"></div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              formData.bank ? 'bg-green-50 dark:bg-green-900/200 dark:bg-green-400 scale-110' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Bank</span>
                          </div>
                          <div className="w-8 h-0.5 bg-gray-200"></div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              formData.amount ? 'bg-green-50 dark:bg-green-900/200 dark:bg-green-400 scale-110' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-xs text-muted-foreground dark:text-muted-foreground/80">Amount</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced File Upload */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Proof of Payment</h3>
                          </div>
                          {uploadState.file && !uploadState.isUploading && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={clearFile}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>

                        {/* Upload Area */}
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                            isDragOver
                              ? 'border-primary dark:border-primary/80 bg-primary/5 dark:bg-primary/10 scale-105'
                              :                             uploadState.file
                                ? uploadState.error
                                  ? 'border-red-300 dark:border-red-600 bg-red-50/30 dark:bg-red-900/20'
                                  : 'border-green-300 dark:border-green-600 bg-green-50/30 dark:bg-green-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 dark:hover:border-primary/60 hover:bg-primary/5 dark:hover:bg-primary/10'
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {/* Background decoration */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent rounded-xl opacity-0 dark:opacity-50 transition-opacity duration-300"></div>

                          {uploadState.isUploading ? (
                            /* Uploading State */
                            <div className="relative z-10">
                              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/15 rounded-full flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                              </div>
                              <h4 className="text-lg font-semibold text-foreground mb-2">Uploading File...</h4>
                              <p className="text-muted-foreground dark:text-muted-foreground/80 mb-4">
                                {uploadState.file?.name} ({(uploadState.file?.size ? uploadState.file.size / 1024 : 0).toFixed(0)}KB)
                              </p>
                              <div className="w-full max-w-xs mx-auto">
                                <Progress value={uploadState.progress} className="h-2 mb-2" />
                                <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">{Math.round(uploadState.progress)}% complete</p>
                              </div>
                            </div>
                          ) : uploadState.file && uploadState.preview ? (
                            /* File Selected State */
                            <div className="relative z-10">
                              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="relative inline-block mb-4">
                                <img
                                  src={uploadState.preview}
                                  alt="Preview"
                                  className="w-20 h-20 object-cover rounded-lg border-2 border-green-200 dark:border-green-700 shadow-lg"
                                />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-50 dark:bg-green-400 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              </div>
                              <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">File Ready</h4>
                              <p className="text-green-700 dark:text-green-300 text-sm mb-1">
                                {uploadState.file.name}
                              </p>
                              <p className="text-green-600 dark:text-green-400 text-xs">
                                {(uploadState.file.size / 1024).toFixed(0)}KB • {uploadState.file.type}
                              </p>
                            </div>
                          ) : uploadState.error ? (
                            /* Error State */
                            <div className="relative z-10">
                              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                              </div>
                              <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Upload Failed</h4>
                              <p className="text-red-600 dark:text-red-300 text-sm mb-4">{uploadState.error}</p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                Try Again
                              </Button>
                            </div>
                          ) : (
                            /* Default State */
                            <div className="relative z-10">
                              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isDragOver ? 'bg-primary dark:bg-primary/90 text-white scale-110' : 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary/90'
                              }`}>
                                <Image className="w-8 h-8" />
                              </div>
                              <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                                isDragOver ? 'text-primary' : 'text-foreground'
                              }`}>
                                {isDragOver ? 'Drop your file here' : 'Upload Receipt Image'}
                              </h4>
                              <p className="text-muted-foreground dark:text-muted-foreground/80 mb-4">
                                Drag and drop your bank transfer receipt, or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 mb-4">
                                JPG, PNG • Maximum 5MB
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className={`transition-all duration-300 ${
                                  isDragOver
                                    ? 'bg-primary dark:bg-primary/90 text-white hover:bg-primary/90 dark:hover:bg-primary/80'
                                    : 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15 border-primary/20 dark:border-primary/30'
                                }`}
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Choose File
                              </Button>
                            </div>
                          )}

                          {/* Pulse effect for drag over */}
                          {isDragOver && (
                            <div className="absolute inset-0 rounded-xl border-2 border-primary dark:border-primary/70 animate-ping opacity-20 dark:opacity-30"></div>
                          )}
                        </div>

                        {/* Hidden File Input */}
                        <Input
                          ref={fileInputRef}
                          id="proof"
                          type="file"
                          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                          className="hidden"
                          onChange={handleFileInputChange}
                        />

                        {/* Upload Instructions */}
                        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <AlertCircle className="w-3 h-3 text-blue-600" />
                            </div>
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Upload Tips:</p>
                              <ul className="space-y-1 text-xs">
                                <li>• Make sure the receipt clearly shows the transaction reference</li>
                                <li>• Ensure all details are readable and not blurry</li>
                                <li>• Multiple receipts can be combined into one image</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <MessageSquare className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold text-foreground">Additional Message</h3>
                          <span className="text-sm text-muted-foreground dark:text-muted-foreground/80">(Optional)</span>
                        </div>

                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Share any special message or let us know which program you'd like to support..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      {/* Enhanced Submit Button */}
                      <div className="pt-8">
                        <Button
                          type="submit"
                          variant="donate"
                          size="xl"
                          disabled={isSubmitting}
                          className={`w-full h-14 group relative overflow-hidden transition-all duration-500 font-bold text-lg ${
                            isSubmitting
                              ? 'opacity-75 cursor-not-allowed'
                              : 'hover:scale-105 hover:shadow-2xl hover:shadow-primary/25'
                          }`}
                        >
                          <div className="relative z-10 flex items-center justify-center space-x-3">
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <span>Submit</span>
                              </>
                            )}
                          </div>

                          {/* Enhanced shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                          {/* Pulse effect for active state */}
                          {!isSubmitting && (
                            <div className="absolute inset-0 rounded-lg border-2 border-emerald-400/40 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          )}
                        </Button>

                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-2 border-blue-200/50 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Shield className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-blue-800 text-sm font-medium mb-1">Privacy & Security</p>
                              <p className="text-blue-700 text-xs">
                                By submitting this form, you consent to being added to our donor wall and receiving occasional updates about our programs. Your information is secure and will never be shared.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Donor Wall Teaser */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Donor Wall
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Confirmed donors are acknowledged on our Donor Wall as a thank you for their generosity. 
            Your contribution helps us build a stronger, more compassionate community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">100%</div>
              <div className="text-sm">Transparent Operations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">12+</div>
              <div className="text-sm">Years of Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">10,000+</div>
              <div className="text-sm">Lives Touched</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;