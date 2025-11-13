import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Eye, Award, Heart, HandHeart, Scale, Star, Calendar, Sparkles, ZoomIn } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import logoImage from '@/assets/images/logo.jpg';
import charityRegCert from '@/assets/certificates/cert1.jpg';
import taxExemptionCert from '@/assets/certificates/cert2.jpg';
import communityServiceCert from '@/assets/certificates/cert3.jpg';
import educationExcellenceCert from '@/assets/certificates/cert4.jpg';
import cert5 from '@/assets/certificates/cert5.jpg';
import cert6 from '@/assets/certificates/cert6.jpg';
import cert7 from '@/assets/certificates/cert7.jpg';
import cert8 from '@/assets/certificates/cert8.jpg';
import cert9 from '@/assets/certificates/cert9.jpg';
import cert10 from '@/assets/certificates/cert10.jpg';
import cert11 from '@/assets/certificates/cert11.jpg';
import cert12 from '@/assets/certificates/cert12.jpg';
import nuruAliAde from '@/assets/images/teams/Nuru-Ali-Ade.jpg';
import faisalAhmedYamam from '@/assets/images/teams/Faisal-Ahmed-Yamam.jpg';
import juharAhmedHussein from '@/assets/images/teams/Juhar-Ahmed-Hussein.jpg';
import husseinAbdouIbrahim from '@/assets/images/teams/Hussein-Abdou-Ibrahim.jpg';
import nejibAbdurhaman from '@/assets/images/teams/Nejib-Abdurhaman.jpg';
import muhammadjudSheikhSaeed from '@/assets/images/teams/Muhammadjud-Sheikh-Saeed.jpg';

/*
 * IMAGE OPTIMIZATION STRATEGY IMPLEMENTED:
 *
 * 1. LAZY LOADING: Images only load when they come into viewport (50px margin)
 * 2. PROGRESSIVE LOADING: Low-quality placeholder → High-quality image
 * 3. INTERSECTION OBSERVER: Efficient viewport detection
 * 4. LOADING SKELETONS: Visual feedback during loading
 * 5. MEMORY OPTIMIZATION: Proper cleanup and state management
 * 6. PERFORMANCE CSS: Hardware acceleration and optimized rendering
 *
 * RECOMMENDED IMAGE OPTIMIZATIONS:
 * - Compress images to <100KB each (aim for 50-80KB)
 * - Use WebP format for better compression
 * - Consider different sizes for mobile/desktop
 * - Implement image CDN for faster global delivery
 * - Use responsive images with srcset attributes
 * - Consider image preloading for above-the-fold content
 */

// Lazy Loading Image Component
const LazyImage = ({ src, alt, className, onClick, placeholder = "blur" }: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  placeholder?: "blur" | "empty";
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src]);

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 dark:border-gray-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Blur placeholder for better UX */}
      {placeholder === "blur" && !isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg blur-sm"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcgSW1hZ2UuLi48L3RleHQ+PC9zdmc+')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`image-optimized w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

const AboutPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const certificates = [
    {
      title: 'Recognition from Kemise City Administration Women and Social Affairs Office',
      issuer: 'Kemise City Administration Women and Social Affairs Office',
      type: 'Government Recognition',
      image: charityRegCert,
      description: 'Official recognition for outstanding social services and support to women and vulnerable communities'
    },
    {
      title: 'Certificate from Kemise City Women and Social Affairs Workers\' Community Affairs Office',
      issuer: 'Kemise City Women and Social Affairs Workers\' Community Affairs Office',
      type: 'Community Recognition',
      image: taxExemptionCert,
      description: 'Acknowledgment for dedicated community affairs work and social development initiatives'
    },
    {
      title: 'Recognition from Kemise City Administration Women and Social Affairs Office',
      issuer: 'Kemise City Administration Women and Social Affairs Office',
      type: 'Government Recognition',
      image: communityServiceCert,
      description: 'Recognition for exceptional service to women and social affairs in Kemise City'
    },
    {
      title: 'Certificate from Kemise Secondary School Muslim Students Association',
      issuer: 'Kemise Secondary School Muslim Students Association',
      type: 'Educational Recognition',
      image: educationExcellenceCert,
      description: 'Acknowledgment for supporting Muslim students and educational development programs'
    },
    {
      title: 'Recognition from Kemise City Administration in Abkeme Oromo Nationality Zone',
      issuer: 'Kemise City Administration in Abkeme Oromo Nationality Zone',
      type: 'Government Recognition',
      image: cert6,
      description: 'Official recognition for services provided in the Oromo Nationality administrative zone'
    },
    {
      title: 'Certificate from Kemise Blood Bank',
      issuer: 'Kemise Blood Bank',
      type: 'Healthcare Recognition',
      image: cert7,
      description: 'Recognition for supporting blood donation drives and healthcare initiatives in Kemise'
    },
    {
      title: 'Recognition from Kemise City Youth and Sport Office',
      issuer: 'Kemise City Youth and Sport Office',
      type: 'Youth Development',
      image: cert8,
      description: 'Certificate for outstanding youth development programs and sports activities support'
    },
    {
      title: 'Recognition from Argoba Special Woreda Education Office',
      issuer: 'Argoba Special Woreda Education Office',
      type: 'Educational Excellence',
      image: cert9,
      description: 'Acknowledgment for educational support and development in Argoba Special Woreda'
    },
    {
      title: 'Certificate from Kemise City Administration Education Office',
      issuer: 'Kemise City Administration Education Office',
      type: 'Educational Recognition',
      image: cert10,
      description: 'Recognition for educational initiatives and school support programs in Kemise City'
    },
    {
      title: 'Recognition from Abi-zeer Community Development Organization',
      issuer: 'Abi-zeer community development organization',
      type: 'Community Development',
      image: cert11,
      description: 'Certificate for community development work and partnership with Abi-zeer organization'
    },
    {
      title: 'Recognition from Jele Xumuga Woreda Women and Social Affairs Office',
      issuer: 'Jele xumuga Woreda Women and Social Affairs Office',
      type: 'Government Recognition',
      image: cert12,
      description: 'Official recognition from Jele Xumuga Woreda for women and social affairs services'
    },
  ];

  const openCertificateModal = (index: number) => {
    setSelectedCertificate(index);
    setShowCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
  };

  const values = [
    { icon: Heart, title: 'Sincerity', description: 'Pure intentions and genuine commitment in all our actions and decisions.' },
    { icon: HandHeart, title: 'Service', description: 'Dedicated to serving humanity with compassion and unwavering commitment.' },
    { icon: Scale, title: 'Equality', description: 'Treating all people with dignity regardless of background or circumstances.' },
    { icon: Star, title: 'Excellence', description: 'Striving for the highest standards in all our programs and initiatives.' },
    { icon: Users, title: 'Cooperation', description: 'Working together to achieve greater impact for our community.' },
    { icon: Award, title: 'Loyalty', description: 'Faithful commitment to our mission and the people we serve.' },
    { icon: Target, title: 'Inclusiveness', description: 'Embracing diversity and ensuring everyone feels welcome and valued.' },
    { icon: Eye, title: 'Transparency', description: 'Open, honest, and accountable in all our operations and communications.' },
  ];

  const teamMembers = [
    {
      name: 'Nuru Ali Ade',
      role: 'President',
      image: nuruAliAde,
      description: 'Providing visionary leadership and ensuring alignment with our mission and Islamic values.'
    },
    {
      name: 'Sualih Ahmed Umar',
      role: 'Vice President',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iNzUiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNzUiIGN5PSI0NSIgcj0iMjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTMwIDExNUMzMCA5NSA3MCA5NSA3MCA4MEM3MCA2MCA5MCA2MCA5MCA0NUM5MCAzMCA3NSA0MCA3NSAxNUM3NSAxNSA3NSAwIDUwIDAgNTAgMTUgNzUgMTUgNzUgNDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=',
      description: 'Providing strategic leadership and supporting organizational growth initiatives.'
    },
    {
      name: 'Juhar Ahmed Hussein',
      role: 'Chief Executive Officer',
      image: juharAhmedHussein,
      description: 'Leading strategic direction and overall organizational management with extensive experience in community development.'
    },
    {
      name: 'Faysal Ahmed Imam',
      role: 'Head of Development Sector',
      image: faisalAhmedYamam,
      description: 'Overseeing sustainable development initiatives and community empowerment programs.'
    },
    {
      name: 'Hussein Abdu Ibrahim',
      role: 'Finance',
      image: husseinAbdouIbrahim,
      description: 'Ensuring financial transparency and responsible stewardship of donor contributions.'
    },
    {
      name: 'Nejib Abdurehman',
      role: 'Education and Training',
      image: nejibAbdurhaman,
      description: 'Developing and implementing educational programs that empower youth and adults through knowledge and skills.'
    },
    {
      name: 'Mohammedjued Sheikh Seid',
      role: 'Public Relations',
      image: muhammadjudSheikhSaeed,
      description: 'Managing communications, partnerships, and building strong relationships with stakeholders.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-hero py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Mufti Dawud Charity Organization
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn about our journey, values, and the dedicated team working to create positive change in our community.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="py-16 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Main logo container with enhanced styling */}
                <motion.div
                  className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 relative bg-gradient-to-br from-white to-gray-50"
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                    boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.3)"
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.img
                    src={logoImage}
                    alt="Mufti Dawud Charity Logo"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                  />

                  {/* Animated overlay gradient for depth */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-teal-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />

                  {/* Enhanced glow effect with animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/20"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(16, 185, 129, 0.2)",
                        "0 0 0 8px rgba(16, 185, 129, 0)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl ring-1 ring-teal-400/30"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(20, 158, 138, 0.3)",
                        "0 0 0 12px rgba(20, 158, 138, 0)",
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                  />
                </motion.div>

                {/* Enhanced decorative elements with advanced animations */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-full opacity-90 shadow-xl"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut" as const
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-7 h-7 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full opacity-85 shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.85, 1, 0.85]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 0.7
                  }}
                />

                {/* Orbital floating elements */}
                <motion.div
                  className="absolute top-2 -left-6 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-70 shadow-md"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" as const }}
                />
                <motion.div
                  className="absolute bottom-2 -right-6 w-3 h-3 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full opacity-65 shadow-sm"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" as const }}
                />

                {/* Floating particles */}
                <motion.div
                  className="absolute top-6 left-6 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-50"
                  animate={{
                    y: [0, -8, 0],
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const
                  }}
                />
                <motion.div
                  className="absolute bottom-6 right-6 w-2 h-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-45"
                  animate={{
                    y: [0, 8, 0],
                    x: [0, -4, 0]
                  }}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: 0.5
                  }}
                />

                {/* Enhanced sparkle effects with staggered timing */}
                <motion.div
                  className="absolute -top-2 -left-2 w-1.5 h-1.5 bg-white rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  animate={{ scale: [0, 1.2, 0] }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-white rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  animate={{ scale: [0, 1.2, 0] }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
                <motion.div
                  className="absolute top-4 right-4 w-1 h-1 bg-yellow-200 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.8 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.8
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-200 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.8 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1.2
                  }}
                />

                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-emerald-400/10 via-transparent to-transparent rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6"
            variants={staggerContainerVariants}
          >
            <motion.p variants={itemVariants}>
              Mufti Dawud Charity Organization was established in 2012 by a group of passionate young people
              in Kemise City, Oromo Nationality Special Zone, Amhara Region, Ethiopia. Our organization is
              named after the respected Sheikh Mufti Dawud, a beloved religious leader who made significant
              contributions to our community and served as an inspiration for our mission.
            </motion.p>

            <motion.p variants={itemVariants}>
              Sheikh Mufti Dawud was known throughout the region for his wisdom, compassion, and unwavering
              dedication to helping those in need. His legacy of service to orphans, the poor, and the
              marginalized continues to guide our work today. By carrying his name, we honor his memory
              and commitment to making a positive difference in people's lives.
            </motion.p>

            <motion.p variants={itemVariants}>
              Over the past 12 years, our organization has grown from a small group of dedicated youth
              to a structured charity with 7 executive board members and 30 active members. We have
              touched thousands of lives through our various programs and continue to expand our reach
              to serve more communities across the region.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section
        className="py-16 bg-gradient-subtle"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={cardVariants}>
              <Card className="p-8 shadow-card hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Eye className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    To be a leading charitable organization that creates sustainable positive change
                    in communities across Ethiopia, ensuring that every orphan, poor person, and
                    vulnerable individual has access to the support, opportunities, and dignity they deserve.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardVariants}
              style={{ transitionDelay: '0.2s' }}
            >
              <Card className="p-8 shadow-card hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Target className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    To provide comprehensive support to orphans, assist the poor and marginalized,
                    and build stronger communities through education, healthcare, spiritual guidance,
                    and sustainable development programs rooted in Islamic values of compassion and service.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className="py-16 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Our Values
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              The core principles that guide every aspect of our work
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainerVariants}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-6 hover:shadow-card transition-smooth group">
                  <CardContent className="p-0 text-center">
                    <motion.div
                      className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.h3
                      className="text-lg font-semibold text-foreground mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {value.title}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {value.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        className="py-16 bg-gradient-subtle"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Our Team
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Meet the dedicated individuals leading our mission to serve the community
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="relative mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                        whileHover={{
                          borderColor: "rgba(16, 185, 129, 0.4)",
                          boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
                        }}
                      >
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>

                    <motion.h3
                      className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {member.name}
                    </motion.h3>

                    <motion.p
                      className="text-primary font-medium text-sm mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    >
                      {member.role}
                    </motion.p>

                    <motion.p
                      className="text-muted-foreground text-xs leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {member.description}
                    </motion.p>

                    {/* Decorative element */}
                    <motion.div
                      className="mt-4 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional team info */}
          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-hero text-white shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-3">Together We Serve</h3>
                <p className="text-white/90 mb-4">
                  Our diverse team brings together expertise in community development, education, finance, and public relations
                  to create meaningful impact in the lives of those we serve.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">7</div>
                    <p className="text-white/80 text-sm">Executive Leaders</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">30+</div>
                    <p className="text-white/80 text-sm">Active Members</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">100+</div>
                    <p className="text-white/80 text-sm">Community Volunteers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Achievements & Recognition */}
      <motion.section
        id="achievements"
        className="py-16 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Achievements & Recognition
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Our accomplishments and official recognition from government, organizations, and community leaders
            </motion.p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            variants={staggerContainerVariants}
          >
            {[
              { number: '12+', label: 'Years of Service', icon: Calendar },
              { number: '10,000+', label: 'Lives Impacted', icon: Users },
              { number: '8', label: 'Core Programs', icon: Target },
              { number: '10+', label: 'Official Certificates', icon: Award },
            ].map((stat, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-6 text-center shadow-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0">
                    <motion.div
                      className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      className="text-3xl font-bold text-primary mb-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.1
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <motion.p
                      className="text-muted-foreground text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {stat.label}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            className="certificate-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainerVariants}
          >
            {certificates.map((cert, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="certificate-card group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-600 overflow-hidden">
                  <CardContent className="p-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Certificate Image */}
                      <motion.div
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => openCertificateModal(index)}
                        whileHover={{
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                      >
                        <div className="aspect-[4/3] relative">
                          <LazyImage
                            src={cert.image}
                            alt={`${cert.title} certificate`}
                            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                            placeholder="blur"
                          />

                          {/* Click to View Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.div
                              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <ZoomIn className="w-6 h-6 text-gray-800" />
                            </motion.div>
                          </motion.div>

                          {/* Certificate Type Badge */}
                          <motion.div
                            className="absolute top-3 left-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${
                              cert.type.includes('Government') ? 'bg-blue-600 text-white' :
                              cert.type.includes('International') ? 'bg-green-600 text-white' :
                              cert.type.includes('Community') ? 'bg-purple-600 text-white' :
                              'bg-emerald-600 text-white'
                            }`}>
                              {cert.type}
                            </span>
                          </motion.div>

                          {/* Click indicator */}
                          <motion.div
                            className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            Click to view clearly
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Certificate Details */}
                      <motion.div
                        className="p-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <motion.h3
                          className="text-sm font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300 leading-tight line-clamp-2"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {cert.title}
                        </motion.h3>
                        <motion.p
                          className="text-xs text-gray-600 mb-2 line-clamp-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        >
                          {cert.description}
                        </motion.p>
                        <motion.div
                          className="flex items-center justify-between text-xs text-gray-500"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        >
                          <span className="font-medium">{cert.issuer}</span>
                          <Award className="w-4 h-4 text-emerald-600" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-hero text-white">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Verified & Trusted</h3>
                <p className="text-white/90">
                  Our organization maintains full compliance with Ethiopian charity regulations and 
                  operates with complete transparency. All certifications are regularly renewed and audited.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Objectives */}
      <motion.section
        className="py-16 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Our Objectives
            </motion.h2>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="p-8 shadow-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <motion.div
                  className="space-y-6"
                  variants={staggerContainerVariants}
                >
                  {[
                    'Provide comprehensive support and care for orphans in our community',
                    'Assist poor and marginalized families with essential needs and opportunities',
                    'Promote education and skill development for sustainable empowerment',
                    'Improve access to clean water and basic healthcare services',
                    'Strengthen Islamic values and spiritual guidance in the community',
                    'Build partnerships with local and international organizations for greater impact',
                    'Develop sustainable programs that create long-term positive change',
                    'Foster unity, cooperation, and mutual support within communities',
                  ].map((objective, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      variants={itemVariants}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        whileHover={{
                          scale: 1.2,
                          boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                      <motion.p
                        className="text-muted-foreground leading-relaxed"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {objective}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <Dialog open={showCertificateModal} onOpenChange={setShowCertificateModal}>
            <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black/95 border-0">
              {selectedCertificate !== null && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <DialogHeader className="p-6 pb-2">
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div>
                        <DialogTitle className="text-white text-xl font-bold">
                          {certificates[selectedCertificate].title}
                        </DialogTitle>
                        <p className="text-gray-300 mt-1 text-sm">
                          {certificates[selectedCertificate].issuer}
                        </p>
                      </div>
                    </motion.div>
                  </DialogHeader>

                  <div className="flex-1 relative overflow-hidden">
                    {/* Certificate Image */}
                    <motion.div
                      className="w-full h-full flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        className="relative max-w-full max-h-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      >
                        <motion.img
                          src={certificates[selectedCertificate].image}
                          alt={`${certificates[selectedCertificate].title} certificate`}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                          style={{ minHeight: '60vh' }}
                          initial={{ filter: "blur(4px)" }}
                          animate={{ filter: "blur(0px)" }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        />

                        {/* Certificate Info Overlay */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <motion.p
                            className="text-white text-sm leading-relaxed mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          >
                            {certificates[selectedCertificate].description}
                          </motion.p>
                          <motion.div
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                          >
                            <span className="text-gray-300 text-xs">
                              Certificate {selectedCertificate + 1} of {certificates.length}
                            </span>
                            <motion.span
                              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                certificates[selectedCertificate].type.includes('Government') ? 'bg-blue-600 text-white' :
                                certificates[selectedCertificate].type.includes('International') ? 'bg-green-600 text-white' :
                                certificates[selectedCertificate].type.includes('Community') ? 'bg-purple-600 text-white' :
                                'bg-emerald-600 text-white'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {certificates[selectedCertificate].type}
                            </motion.span>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Progress Indicators */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    {certificates.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          i === selectedCertificate ? 'bg-emerald-400' : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;

/*
 * ADDITIONAL IMAGE OPTIMIZATION RECOMMENDATIONS:
 *
 * 1. IMAGE COMPRESSION SCRIPT:
 *    npm install sharp imagemin imagemin-mozjpeg imagemin-pngquant
 *
 *    const sharp = require('sharp');
 *    const fs = require('fs');
 *    const path = require('path');
 *
 *    // Compress all certificate images
 *    const certificatesDir = './src/assets/certificates/';
 *    fs.readdirSync(certificatesDir).forEach(file => {
 *      if (file.endsWith('.jpg') || file.endsWith('.png')) {
 *        sharp(`${certificatesDir}${file}`)
 *          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
 *          .jpeg({ quality: 80, progressive: true })
 *          .toFile(`${certificatesDir}optimized/${file}`)
 *          .then(() => console.log(`Optimized: ${file}`));
 *      }
 *    });
 *
 * 2. WEBP CONVERSION:
 *    sharp('input.jpg')
 *      .webp({ quality: 80 })
 *      .toFile('output.webp');
 *
 * 3. RESPONSIVE IMAGES:
 *    <picture>
 *      <source media="(max-width: 768px)" srcset="cert-mobile.webp">
 *      <source media="(max-width: 1200px)" srcset="cert-tablet.webp">
 *      <img src="cert-desktop.webp" alt="Certificate">
 *    </picture>
 *
 * 4. IMAGE CDN SETUP:
 *    - Use services like Cloudinary, ImageKit, or Cloudflare Images
 *    - Enable automatic optimization and WebP conversion
 *    - Set up proper caching headers
 *
 * 5. BROWSER OPTIMIZATIONS:
 *    - Add <link rel="preconnect"> for image domains
 *    - Use loading="lazy" attribute for below-fold images
 *    - Consider decode="async" for faster rendering
 */