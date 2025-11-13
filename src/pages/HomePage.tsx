import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Heart, Users, BookOpen, Droplets, Target, Eye, Award, Star, Gift, HandHeart, Sparkles, Leaf, ZoomIn, X, ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-mobile';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
// Featured Programs Images
import ramadanImage from '@/assets/pictures/programs/celebrating ramadan with the poor/50f0cf65-f592-45c9-9eb4-08fa1aafc349.jpg';
import arafahImage from '@/assets/pictures/programs/celebrating arafah with orphans/8ac17816-76e8-42ee-9462-55acd7285668.jpg';
import scholarImage from '@/assets/pictures/programs/supporting scholars around kemise/640b571b-ad77-4bc6-aadf-80dc63e583eb.jpg';
import educationImage from '@/assets/pictures/programs/providing educational material for students/7ab776c2-ed9c-485e-8c95-0f731f89f3cd.jpg';
import zakatImage from '@/assets/pictures/programs/zakat distribution/8e2768c0-2345-47c4-b53f-fd50eed28570.jpg';
import summerCourseImage from '@/assets/pictures/programs/providing summer course for students/97e1a6dc-159b-4821-8d7b-1418c9e5ae35.jpg';
import waterWellImage from '@/assets/pictures/programs/water wells built by our charity org/d151b7b9-aedb-41c0-9363-a7e8bc3527c2.jpg';
import permanentCareImage from '@/assets/pictures/programs/permanent care for weak peoples /1078d31c-721d-4a98-b723-636a5b4ff5ad.jpg';

// Hero background images for slideshow
import heroImage1 from '@/assets/heroImages/image1.jpg';
import heroImage2 from '@/assets/heroImages/image2.jpg';
import heroImage3 from '@/assets/heroImages/image3.jpg';
import heroImage4 from '@/assets/heroImages/image4.jpg';
import heroImage5 from '@/assets/heroImages/image5.jpg';
import heroImage6 from '@/assets/heroImages/image6.jpg';
import heroImage7 from '@/assets/heroImages/image7.jpg';
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
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Blur placeholder for better UX */}
      {placeholder === "blur" && !isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 rounded-lg blur-sm"
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

// Animated Statistics Component
const AnimatedStat = ({ icon: Icon, value, label, suffix = "" }: { icon: any, value: number, label: string, suffix?: string }) => {
  const { count, startAnimation } = useAnimatedCounter(value, 1500);

  useEffect(() => {
    const timer = setTimeout(() => startAnimation(), 500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  return (
    <div className="text-center group relative">
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-600/90 to-teal-700/90 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-emerald-600/40 transition-all duration-300 shadow-lg backdrop-blur-sm">
        <Icon className="w-8 h-8 text-white drop-shadow-sm" />
      </div>
      <div className="text-4xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors duration-300">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-emerald-200/90 text-sm font-medium tracking-wide">{label}</div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};


// Animated Programs Carousel Component
const AnimatedProgramsCarousel = ({ programs }: {
  programs: any[];
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  
  // Duplicate programs for seamless infinite scroll
  const duplicatedPrograms = [...programs, ...programs];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [0, -22 * programs.length * 16], // 22rem = 22 * 16px
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: programs.length * 3,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, programs.length]);

  return (
    <div className="relative mb-12">
      {/* Fade gradients for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-slate-50 via-white to-transparent dark:from-slate-900 dark:via-slate-800 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-slate-50 via-white to-transparent dark:from-slate-900 dark:via-slate-800 to-transparent z-10 pointer-events-none"></div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 px-4"
          animate={controls}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {duplicatedPrograms.map((program, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[22rem]"
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              <Card className="group relative overflow-hidden bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-gray-700 hover:border-emerald-200/60 dark:hover:border-emerald-600/60 transition-all duration-500 hover:shadow-2xl h-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className={`absolute top-4 right-4 w-20 h-20 rounded-full ${
                    index % 2 === 0 ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-teal-400 dark:bg-teal-500'
                  } blur-xl`}></div>
                </div>

                {/* Enhanced Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600">
                  <div className="aspect-[16/10] relative">
                    <LazyImage
                      src={program.image}
                      alt={`${program.title} program`}
                      className="w-full h-full transition-all duration-700 group-hover:scale-110"
                      placeholder="blur"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                    {/* Hover Icon Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <BookOpen className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                    </div>

                    {/* Program Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                        index % 2 === 0 ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'
                      }`}>
                        Program {(index % programs.length) + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button asChild className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600 dark:hover:from-emerald-300 dark:hover:via-emerald-400 dark:hover:to-emerald-500 shadow-lg hover:shadow-emerald-500/25 dark:shadow-emerald-900/50 transition-all duration-500 transform hover:scale-105">
                    <Link to={program.link} className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold">
                      <span>Explore Program</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />

                      {/* Enhanced shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                    </Link>
                  </Button>
                </CardContent>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
                  index % 2 === 0 ? 'bg-emerald-400/20' : 'bg-teal-400/20'
                }`}></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Animated Certificates Carousel Component
const AnimatedCertificatesCarousel = ({ certificates, onCertificateClick }: {
  certificates: any[];
  onCertificateClick: (index: number) => void;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [0, -100 * certificates.length],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: certificates.length * 2.5,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, certificates.length]);

  return (
    <div className="relative mb-12">
      {/* Fade gradients for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 sm:gap-6 px-2 sm:px-4"
          animate={controls}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            width: `${certificates.length * 18}rem`,
            '--card-width': '18rem'
          } as React.CSSProperties}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[18rem]"
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="certificate-card h-full overflow-hidden hover:shadow-xl transition-all duration-500 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-gray-700 hover:border-emerald-200/60 dark:hover:border-emerald-600/60 hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                {/* Certificate Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 cursor-pointer" onClick={() => onCertificateClick(index)}>
                  <div className="aspect-[16/10] relative">
                    <LazyImage
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                    {/* Click to View Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                    </div>

                    {/* Touch/Click Indicator */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view
                    </div>
                  </div>

                  {/* Certificate Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-600/90 text-white shadow-md backdrop-blur-sm">
                      {cert.type}
                    </span>
                  </div>
                </div>

                {/* Enhanced Content */}
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:text-emerald-300 transition-colors duration-300 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Award className="w-3.5 h-3.5 mr-2 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Scroll Progress Component with Page Transitions
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Enhanced Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 dark:from-emerald-500 dark:via-teal-600 dark:to-emerald-700 transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle Section Transition Indicators */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          {[
            { color: 'emerald', label: 'Hero' },
            { color: 'emerald', label: 'Stats' },
            { color: 'teal', label: 'Mission' },
            { color: 'emerald', label: 'Programs' },
            { color: 'teal', label: 'Certificates' },
            { color: 'emerald', label: 'Values' },
            { color: 'slate', label: 'Action' }
          ].map((indicator, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === activeSection
                  ? `bg-${indicator.color}-400 dark:bg-${indicator.color}-500 scale-125 shadow-lg`
                  : `bg-${indicator.color}-200/50 dark:bg-${indicator.color}-300/30 hover:bg-${indicator.color}-300/70 dark:hover:bg-${indicator.color}-400/50`
              }`}
              title={indicator.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
  // Hero background slideshow
  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5, heroImage6, heroImage7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToBankAccounts = () => {
    navigate('/donate');

    // Function to scroll to bank accounts section
    const performScroll = () => {
      const bankAccountsSection = document.getElementById('bank-accounts');
      if (bankAccountsSection) {
        bankAccountsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Try to scroll immediately, then retry after a short delay
    performScroll();
    setTimeout(performScroll, 200);
    setTimeout(performScroll, 500);
  };

  const scrollToAchievements = () => {
    navigate('/about');

    // Function to scroll to achievements section
    const performScroll = () => {
      const achievementsSection = document.getElementById('achievements');
      if (achievementsSection) {
        achievementsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Try to scroll immediately, then retry after a short delay
    performScroll();
    setTimeout(performScroll, 200);
    setTimeout(performScroll, 500);
  };

  const coreValues = [
    { icon: Heart, title: 'Sincerity', description: 'Pure intentions in all our work' },
    { icon: Users, title: 'Service', description: 'Dedicated to serving humanity' },
    { icon: Target, title: 'Excellence', description: 'Striving for the highest standards' },
    { icon: Eye, title: 'Transparency', description: 'Open and accountable operations' },
  ];

  const featuredPrograms = [
    {
      title: 'Ramadan with the Poor',
      description: 'Providing essential food and support during the holy month of Ramadan.',
      image: ramadanImage,
      link: '/programs',
    },
    {
      title: 'Arafah with Orphans',
      description: 'Bringing joy and hope to orphaned children during Eid celebrations.',
      image: arafahImage,
      link: '/programs',
    },
    {
      title: 'Support for Scholars',
      description: 'Investing in knowledge and Islamic education for future scholars.',
      image: scholarImage,
      link: '/programs',
    },
    {
      title: 'Educational Material Support',
      description: 'Empowering minds through access to school supplies and education.',
      image: educationImage,
      link: '/programs',
    },
    {
      title: 'Zakat Distribution',
      description: 'Fulfilling the pillar of giving with transparency and accountability.',
      image: zakatImage,
      link: '/programs',
    },
    {
      title: 'Summer Courses',
      description: 'Learning and growth during school holidays with Quran and life skills.',
      image: summerCourseImage,
      link: '/programs',
    },
    {
      title: 'Clean Water Wells',
      description: 'Building sustainable water sources for rural communities.',
      image: waterWellImage,
      link: '/programs',
    },
    {
      title: 'Permanent Care',
      description: 'Comprehensive long-term support for vulnerable community members.',
      image: permanentCareImage,
      link: '/programs',
    },
  ];

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
      title: 'Recognition from Kemise City Administration Women and Social Affairs Department',
      issuer: 'Kemise City Administration Women and Social Affairs Department',
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
    }
  ];

  const openCertificateModal = (index: number) => {
    setSelectedCertificate(index);
    setShowCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
  };

  const navigateCertificate = (direction: 'prev' | 'next') => {
    if (selectedCertificate === null) return;

    if (direction === 'prev') {
      setSelectedCertificate((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
    } else {
      setSelectedCertificate((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      {/* Enhanced Hero Section with Ramadan Background */}
      <motion.section
        className="relative bg-gradient-professional overflow-hidden min-h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Modern Background with Dynamic Slideshow */}
        <div className="absolute inset-0">
          {/* Dynamic Background Images with Smooth Transitions */}
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
          {/* Professional Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-emerald-900/60 to-slate-800/70 z-10"></div>
          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 z-10"></div>
        </div>

        {/* Professional Background Accents */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Subtle floating elements */}
          <div className="absolute top-24 right-24 animate-float opacity-15" style={{ animationDelay: '2s' }}>
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 rounded-full backdrop-blur-sm border border-emerald-400/20"></div>
          </div>
          <div className="absolute bottom-36 left-20 animate-pulse opacity-12" style={{ animationDelay: '1s' }}>
            <div className="w-4 h-4 bg-gradient-to-br from-teal-400/15 to-teal-500/8 rounded-full backdrop-blur-sm border border-teal-400/15"></div>
          </div>

          {/* Professional corner accents */}
          <div className="absolute top-16 left-16 opacity-10">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent"></div>
          </div>
          <div className="absolute bottom-16 right-16 opacity-10">
            <div className="w-px h-32 bg-gradient-to-t from-transparent via-teal-400/30 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-30 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 lg:py-0 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Heading */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Building a Better
                    <span className="block mt-2 text-emerald-400">Tomorrow</span>
                  </h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Empowering communities through sustainable development, education, and compassionate support for those in need.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    onClick={scrollToBankAccounts}
                    className="group relative bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <HandHeart className="w-5 h-5" />
                      Make a Donation
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300"
                  >
                    <Link to="/programs" className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Our Programs
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right Hadith Quote */}
              <motion.div
                className="hidden lg:flex"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Quote Icon */}
                    <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>

                    {/* Hadith Text */}
                    <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                      "The believer's shade on the Day of Resurrection will be his charity."
                    </blockquote>

                    {/* Attribution */}
                    <div className="pt-4 border-t border-white/20 space-y-2">
                      <p className="text-emerald-300 font-semibold text-sm">Prophet Muhammad ﷺ</p>
                      <p className="text-gray-400 text-sm">Sahih al-Bukhari</p>
                    </div>

                    {/* Decorative Element */}
                    <div className="flex gap-2 pt-2">
                      <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
                      <div className="w-8 h-1 bg-teal-400 rounded-full"></div>
                      <div className="w-4 h-1 bg-emerald-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Mission Statement - Alternative Design */}
      <motion.section
        className="py-24 lg:py-32 bg-white dark:bg-slate-900 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Bright background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-emerald-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-teal-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Mission Journey Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-xs sm:text-sm font-semibold text-emerald-500 uppercase tracking-wider">Our Foundation</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
            Our Mission
              <span className="block text-emerald-500 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Since 2012</span>
          </h2>

            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium px-4">
              A journey of compassion, dedication, and sustainable impact in our community
          </p>
        </div>

          {/* Mission Timeline - Mobile Optimized */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 shadow-lg"></div>

            {/* Mobile Timeline - Vertical Stack */}
            <div className="md:hidden space-y-8">
              {/* Origin Story - Mobile */}
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:via-emerald-800/30 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl mb-4 shadow-lg animate-pulse mx-auto">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Founded in Honor</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                    Named after the respected Sheikh Mufti Dawud, our organization was established
                    to continue his legacy of service and compassion for the most vulnerable.
                  </p>
                </div>
          </div>

              {/* Growth & Impact - Mobile */}
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 via-teal-100 to-emerald-50 dark:from-teal-900/20 dark:via-teal-800/30 dark:to-emerald-900/20 rounded-2xl p-6 border border-teal-200 shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-xl mb-4 shadow-lg animate-pulse mx-auto" style={{ animationDelay: '0.5s' }}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Growing Impact</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-center">
                    From humble beginnings to a dedicated team of 7 executives and 30 active members,
                    we've expanded our reach to serve thousands across our community.
                  </p>

                  {/* Team Stats - Mobile */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-lg border border-emerald-300 dark:border-emerald-700 shadow-md">
                      <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-1">7</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Executives</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 rounded-lg border border-teal-300 dark:border-teal-700 shadow-md">
                      <div className="text-lg font-bold text-teal-700 dark:text-teal-300 mb-1">30</div>
                      <div className="text-xs text-teal-600 dark:text-teal-400 font-medium">Members</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Mission - Mobile */}
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:via-emerald-800/30 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl mb-4 shadow-lg animate-pulse mx-auto">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Our Commitment</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                    We work tirelessly to provide hope, support, and sustainable solutions
                    to those in need, creating lasting positive change in our community.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Timeline - Alternating Layout */}
            <div className="hidden md:block space-y-16">
              {/* Origin Story */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:via-emerald-800/30 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-200 shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl mb-4 shadow-lg animate-pulse">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Founded in Honor</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Named after the respected Sheikh Mufti Dawud, our organization was established
                      to continue his legacy of service and compassion for the most vulnerable.
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>

                <div className="flex-1"></div>
              </div>

              {/* Growth & Impact */}
              <div className="relative flex items-center">
                <div className="flex-1"></div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>

                <div className="flex-1 pl-8">
                  <div className="bg-gradient-to-br from-teal-50 via-teal-100 to-emerald-50 dark:from-teal-900/20 dark:via-teal-800/30 dark:to-emerald-900/20 rounded-2xl p-8 border border-teal-200 shadow-lg hover:shadow-teal-200/50 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-xl mb-4 shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Growing Impact</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      From humble beginnings to a dedicated team of 7 executives and 30 active members,
                      we've expanded our reach to serve thousands across our community.
                    </p>

                    {/* Team Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-lg border border-emerald-300 dark:border-emerald-700 shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">7</div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Executives</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 rounded-lg border border-teal-300 dark:border-teal-700 shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-1">30</div>
                        <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">Members</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Mission */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:via-emerald-800/30 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-200 shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl mb-4 shadow-lg animate-pulse">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Commitment</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We work tirelessly to provide hope, support, and sustainable solutions
                      to those in need, creating lasting positive change in our community.
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>

                <div className="flex-1"></div>
              </div>
            </div>
          </div>

          {/* Mission Values Summary */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              <span className="text-base font-semibold text-emerald-500 uppercase tracking-wider">Our Core Values</span>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {[
                { icon: Heart, title: 'Compassion', desc: 'Genuine care for all', color: 'from-emerald-400 to-emerald-600' },
                { icon: Users, title: 'Unity', desc: 'Strength in community', color: 'from-teal-400 to-teal-600' },
                { icon: Target, title: 'Excellence', desc: 'Highest standards', color: 'from-emerald-400 to-emerald-600' },
                { icon: Eye, title: 'Transparency', desc: 'Open accountability', color: 'from-teal-400 to-teal-600' }
              ].map((value, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <value.icon className="w-9 h-9 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{value.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{value.desc}</p>
                </div>
            ))}
          </div>
        </div>
        </div>
      </motion.section>

      {/* Subtle Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent dark:via-emerald-700/30"></div>

      {/* Enhanced Featured Programs - Modern & Interactive */}
      <motion.section
        className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-16 w-32 h-32 bg-emerald-400/8 rounded-full blur-2xl animate-bounce opacity-50" style={{ animationDuration: '12s' }}></div>
          <div className="absolute bottom-16 left-16 w-40 h-40 bg-teal-400/8 rounded-full blur-2xl animate-pulse opacity-40" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-emerald-300/6 to-teal-300/6 rounded-full blur-xl animate-spin opacity-30" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Our Impact</span>
              <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Featured Programs
              <span className="block text-emerald-600 dark:text-emerald-400 mt-2">Making a Difference</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover our transformative initiatives that create lasting positive change in communities across Ethiopia
            </p>
          </div>

          {/* Animated Programs Carousel */}
          <AnimatedProgramsCarousel programs={featuredPrograms} />

                        </div>
      </motion.section>

      {/* Subtle Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent dark:via-emerald-700/30"></div>

      {/* Enhanced Certificates Showcase - Landscape Horizontal */}
      <motion.section
        className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-400/8 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/5 dark:bg-teal-400/8 rounded-full blur-2xl"></div>
                      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-full mb-6 shadow-lg hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105">
              <Award className="w-10 h-10 text-white animate-pulse" />
                </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Certificates &
              <span className="block text-emerald-600 dark:text-emerald-400">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Official recognition and credentials that validate our commitment to transparency and excellence in service
            </p>
          </div>

          {/* Animated Certificates Carousel */}
          <AnimatedCertificatesCarousel
            certificates={certificates}
            onCertificateClick={openCertificateModal}
          />

          {/* Enhanced Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-emerald-200 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-700 px-6 py-3"
                onClick={scrollToAchievements}
              >
                <span className="flex items-center gap-2 relative z-10">
                  <Award className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>View All Certificates</span>
                  {/* Subtle background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Button>
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-lg hover:shadow-emerald-600/25 transition-all duration-300 px-6 py-3"
              >
                <Link to="/about" className="flex items-center gap-2 relative z-10">
                  <span>Learn More About Us</span>
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />

                  {/* Enhanced shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Subtle Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent dark:via-emerald-700/30"></div>

      {/* Enhanced Core Values - Vibrant & Modern */}
      <motion.section
        className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating gradient orbs */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 dark:from-emerald-300/15 dark:to-teal-300/15 rounded-full blur-2xl animate-bounce opacity-60 dark:opacity-40" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 dark:from-teal-300/15 dark:to-emerald-300/15 rounded-full blur-2xl animate-pulse opacity-50 dark:opacity-35" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-emerald-300/8 to-teal-300/8 dark:from-emerald-200/12 dark:to-teal-200/12 rounded-full blur-xl animate-spin opacity-40 dark:opacity-25" style={{ animationDuration: '15s' }}></div>

          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Our Foundation</span>
              <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Our Values
              <span className="block text-emerald-600 dark:text-emerald-400 mt-2">Guiding Principles</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
              The core principles that inspire every action and decision we make
            </p>
          </div>

          {/* Enhanced Values Grid - Mobile & Desktop Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <Card className="relative overflow-hidden bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-gray-700 hover:border-emerald-200/60 dark:hover:border-emerald-600/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 p-8 text-center h-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className={`absolute top-4 right-4 w-16 h-16 rounded-full ${
                      index % 2 === 0 ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-teal-400 dark:bg-teal-500'
                    } blur-lg`}></div>
                </div>

                  {/* Enhanced Icon Container */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-500 relative ${
                    index === 0 ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600' :
                    index === 1 ? 'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600' :
                    index === 2 ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600' :
                    'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600'
                  }`}>
                    <value.icon className="w-10 h-10 text-white drop-shadow-sm" />

                    {/* Pulse Ring Effect */}
                    <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping ${
                      index % 2 === 0 ? 'border-emerald-300 dark:border-emerald-700' : 'border-teal-300 dark:border-teal-700'
                    }`}></div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="relative z-10">
                    <h3 className={`text-xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300 ${
                      index === 0 ? 'text-emerald-600 dark:text-emerald-400' :
                      index === 1 ? 'text-teal-600 dark:text-teal-400' :
                      index === 2 ? 'text-emerald-600 dark:text-emerald-400' :
                      'text-teal-600 dark:text-teal-400'
                    }`}>
                  {value.title}
                </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">
                  {value.description}
                </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
                    index % 2 === 0 ? 'bg-emerald-400/20' : 'bg-teal-400/20'
                  }`}></div>

                  {/* Corner Accent */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    index % 2 === 0 ? 'bg-emerald-400' : 'bg-teal-400'
                  }`}></div>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Call to Action */}
      <motion.section
        className="py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 dark:from-slate-800 dark:via-emerald-800 dark:to-slate-700 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Be the Change
              <span className="block text-emerald-300">Today</span>
          </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Every contribution, no matter the size, creates ripples of hope and transformation.
              <span className="block mt-2 text-emerald-200 font-medium">Your generosity changes lives forever.</span>
            </p>
          </div>

          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              variant="secondary"
              size="xl"
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600 dark:hover:from-emerald-300 dark:hover:via-emerald-400 dark:hover:to-emerald-500 shadow-2xl hover:shadow-emerald-400/50 dark:shadow-emerald-900/50 transition-all duration-500 transform hover:scale-105 border-2 border-emerald-300 dark:border-emerald-700/50 hover:border-emerald-200/70 dark:border-emerald-600/50 dark:hover:border-emerald-500/70 px-10 py-5 text-lg font-bold"
            >
              <Link to="/donate" className="flex items-center gap-3 relative z-10">
                <HandHeart className="w-6 h-6 group-hover:animate-pulse transition-all duration-300" />
                <span>Donate & Transform Lives</span>

                {/* Enhanced shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 dark:via-white/40 to-white/0 dark:to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-lg border border-white/20 dark:border-white/30 opacity-0 group-hover:opacity-100 group-hover:border-white/40 dark:group-hover:border-white/50 transition-all duration-500 animate-pulse"></div>
              </Link>
            </Button>

            <Button
              asChild
              variant="trust"
              size="xl"
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 dark:bg-slate-800/60 dark:hover:bg-slate-700/70 border-2 border-white/30 dark:border-slate-600/50 text-white hover:border-white/50 dark:hover:border-slate-500/60 transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-white/25 dark:hover:shadow-slate-900/40 transform hover:scale-105 px-8 py-5 text-lg font-semibold"
            >
              <Link to="/contact" className="flex items-center gap-3 relative z-10">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Join Our Mission</span>

                {/* Subtle background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-600/8 dark:to-teal-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner accent */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 dark:bg-slate-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in mt-12" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 dark:text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse"></div>
                <span>100% Transparent</span>
        </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse delay-300"></div>
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse delay-700"></div>
                <span>12+ Years Impact</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certificate Viewer Modal */}
      <Dialog open={showCertificateModal} onOpenChange={setShowCertificateModal}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black/95 dark:bg-black/98 border-0">
          {selectedCertificate !== null && (
            <>
              <DialogHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-white text-xl font-bold">
                      {certificates[selectedCertificate].title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 dark:text-gray-400 mt-1">
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeCertificateModal}
                    className="text-white hover:bg-white/20 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="flex-1 relative overflow-hidden">
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateCertificate('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 dark:hover:bg-white/10 bg-black/50 hover:scale-110 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateCertificate('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 dark:hover:bg-white/10 bg-black/50 hover:scale-110 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                {/* Certificate Image */}
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="relative max-w-full max-h-full">
                    <img
                      src={certificates[selectedCertificate].image}
                      alt={`${certificates[selectedCertificate].title} certificate`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      style={{ minHeight: '60vh' }}
                    />

                    {/* Certificate Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                      <p className="text-white dark:text-gray-200 text-sm leading-relaxed">
                        {certificates[selectedCertificate].description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-300 dark:text-gray-400 text-xs">
                          Certificate {selectedCertificate + 1} of {certificates.length}
                        </span>
                        <span className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
                          {certificates[selectedCertificate].type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {certificates.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i === selectedCertificate ? 'bg-emerald-400' : 'bg-white/30'
                    }`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;