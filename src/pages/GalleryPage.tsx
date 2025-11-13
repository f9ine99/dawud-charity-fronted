import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, Eye, Filter } from 'lucide-react';

// Gallery Images - Blood Donation Events
import bloodDonation1 from '@/assets/pictures/events/blood donation event/1d196137-8aa3-4a00-a915-81fc972fdf1a.jpg';
import bloodDonation2 from '@/assets/pictures/events/blood donation event/34f1fadf-e858-46ea-b963-d7dab51239b5.jpg';
import bloodDonation3 from '@/assets/pictures/events/blood donation event/354a9454-d724-4e09-b222-54dca9d0332c.jpg';

// Gallery Images - Graduation Events
import graduation1 from '@/assets/pictures/events/graduation cermony event/cbd8a1f0-56d6-4362-b67e-6b060fb9bea7.jpg';
import graduation2 from '@/assets/pictures/events/graduation cermony event/IMG_20250928_165925_514.jpg';
import graduation3 from '@/assets/pictures/events/graduation cermony event/IMG_20250928_165943_307.jpg';

// Gallery Images - Holiday Gift Events
import holidayGift1 from '@/assets/pictures/events/holiday gift event/04e16f2d-46d3-43db-8f7c-91e6e545263f.jpg';
import holidayGift2 from '@/assets/pictures/events/holiday gift event/3d391378-b2c9-4884-bb67-b0553c857eb7.jpg';
import holidayGift3 from '@/assets/pictures/events/holiday gift event/6641fcce-badb-4bd8-8d50-4fd888cfc7ca.jpg';

// Gallery Images - Home to Home Ziyara Events
import homeZiyara1 from '@/assets/pictures/events/home to home ziyara event/f33013c5-560f-4a54-a2fd-7035ea4e633d.jpg';
import homeZiyara2 from '@/assets/pictures/events/home to home ziyara event/47248850-02c7-42fb-be54-5fec5bc95821.jpg';
import homeZiyara3 from '@/assets/pictures/events/home to home ziyara event/57d5ae05-b46a-4298-a1eb-797337f59916.jpg';

// Gallery Images - Random Caring Events
import caring1 from '@/assets/pictures/events/random caring event/18903c72-cfa5-4f21-8cfe-da2402c6795b.jpg';
import caring2 from '@/assets/pictures/events/random caring event/5cb8380d-81f1-4429-ae0a-de1f8b761527.jpg';
import caring3 from '@/assets/pictures/events/random caring event/75b76b21-5b34-4012-8b46-412e562d7af2.jpg';

// Gallery Images - Orphan Care Programs
import orphan1 from '@/assets/pictures/programs/celebrating arafah with orphans/5d6028b6-846f-4f98-911b-7637d55953a9.jpg';
import orphan2 from '@/assets/pictures/programs/celebrating arafah with orphans/6e46b20a-a699-4584-96ce-ef664002cb17.jpg';
import orphan3 from '@/assets/pictures/programs/celebrating arafah with orphans/7184b03d-7c04-4f5e-9035-c9209162f0bc.jpg';

// Gallery Images - Ramadan Programs
import ramadan1 from '@/assets/pictures/programs/celebrating ramadan with the poor/21676542-9f37-46e1-8cd4-81a0f10acdcb.jpg';
import ramadan2 from '@/assets/pictures/programs/celebrating ramadan with the poor/2e974efa-29b2-4fd6-8eda-abbea052b86d.jpg';
import ramadan3 from '@/assets/pictures/programs/celebrating ramadan with the poor/47970365-54da-4eb4-ad33-2937e5673f7e.jpg';

// Gallery Images - Elderly Care Programs
import elderly1 from '@/assets/pictures/programs/permanent care for weak peoples /1078d31c-721d-4a98-b723-636a5b4ff5ad.jpg';
import elderly2 from '@/assets/pictures/programs/permanent care for weak peoples /6fb13155-c469-4175-b286-5bce55272a2a.jpg';
import elderly3 from '@/assets/pictures/programs/permanent care for weak peoples /78aef915-b1e7-421e-b5ae-f43ff6255dbb.jpg';

// Gallery Images - Educational Programs
import education1 from '@/assets/pictures/programs/providing educational material for students/42365b47-ceb0-4c11-9056-2c071dc7c343.jpg';
import education2 from '@/assets/pictures/programs/providing educational material for students/34420099-1a2a-43dc-8a5d-f31827f9aab1.jpg';
import education3 from '@/assets/pictures/programs/providing educational material for students/42365b47-ceb0-4c11-9056-2c071dc7c343.jpg';

// Gallery Images - Summer Course Programs
import summer1 from '@/assets/pictures/programs/providing summer course for students/97e1a6dc-159b-4821-8d7b-1418c9e5ae35.jpg';
import summer2 from '@/assets/pictures/programs/providing summer course for students/bfbd7784-d88a-4d4a-93ba-f37f03d2fe0b.jpg';
import summer3 from '@/assets/pictures/programs/providing summer course for students/e5b31be5-066f-43e6-8ff3-460f0b3484f5.jpg';

// Gallery Images - Scholar Support Programs
import scholar1 from '@/assets/pictures/programs/supporting scholars around kemise/1fb712db-8c16-472e-b71c-779c78f4151f.jpg';
import scholar2 from '@/assets/pictures/programs/supporting scholars around kemise/56a81b65-57db-4bff-b827-221622565faa.jpg';
import scholar3 from '@/assets/pictures/programs/supporting scholars around kemise/640b571b-ad77-4bc6-aadf-80dc63e583eb.jpg';

// Gallery Images - Water Well Programs
import water1 from '@/assets/pictures/programs/water wells built by our charity org/268fd984-ff41-4594-bd50-d907f68ef3cc.jpg';
import water2 from '@/assets/pictures/programs/water wells built by our charity org/429743bf-1168-469b-ae14-9e103222f2d7.jpg';
import water3 from '@/assets/pictures/programs/water wells built by our charity org/46dd6f4a-6580-4be8-8ef3-fa7438564914.jpg';

// Gallery Images - Zakat Distribution
import zakat1 from '@/assets/pictures/programs/zakat distribution/8e2768c0-2345-47c4-b53f-fd50eed28570.jpg';
import zakat2 from '@/assets/pictures/programs/zakat distribution/1dbb5811-014a-4d9f-852f-d98318f96241.jpg';
import zakat3 from '@/assets/pictures/programs/zakat distribution/2c2d26db-dadb-4981-bb62-74dcae5e813c.jpg';

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

/*
 * GALLERY PAGE - PERFORMANCE OPTIMIZED
 *
 * Features implemented:
 * - Lazy loading for all 21 gallery images
 * - Lazy loading for 12 YouTube video thumbnails
 * - Progressive image loading with blur placeholders
 * - Loading skeletons during image fetch
 * - Intersection Observer for efficient viewport detection
 * - Performance CSS optimizations
 * - Hardware-accelerated animations
 *
 * Images are loaded only when they come into view (50px margin)
 * This dramatically improves initial page load and reduces bandwidth usage
 */

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const galleryItems = [
    // EVENTS SECTION
    // Blood Donation Events
    {
      id: 1,
      title: 'Blood Donation Drive - Community Health Initiative',
      image: bloodDonation1,
      category: 'Health Events',
      location: 'Kemise Community Center',
      description: 'Our quarterly blood donation drive bringing together community members to save lives and support local hospitals.'
    },
    {
      id: 2,
      title: 'Blood Donation Volunteers in Action',
      image: bloodDonation2,
      category: 'Health Events',
      location: 'Kemise Community Center',
      description: 'Volunteers coordinating and supporting donors during our life-saving blood donation campaign.'
    },
    {
      id: 3,
      title: 'Blood Donation Volunteers in Action',
      image: bloodDonation3,
      category: 'Health Events',
      location: 'Kemise Community Center',
      description: 'Community members registering to participate in our blood donation drive, showing their commitment to helping others.'
    },

    // Graduation Ceremony Events
    {
      id: 4,
      title: 'Educational Achievement Celebration',
      image: graduation1,
      category: 'Education Events',
      location: 'Kemise Educational Center',
      description: 'Celebrating the academic achievements of students supported by our educational programs.'
    },
    {
      id: 5,
      title: 'Graduation Ceremony - Student Success',
      image: graduation2,
      category: 'Education Events',
      location: 'Kemise Educational Center',
      description: 'Proud moment as students graduate from our educational support programs, ready for their next chapter.'
    },
    {
      id: 6,
      title: 'Academic Excellence Recognition',
      image: graduation3,
      category: 'Education Events',
      location: 'Kemise Educational Center',
      description: 'Recognizing outstanding academic performance and dedication of our scholarship recipients.'
    },

    // Holiday Gift Events
    {
      id: 7,
      title: 'Holiday Gift Distribution - Spreading Joy',
      image: holidayGift1,
      category: 'Holiday Events',
      location: 'Kemise Community',
      description: 'Bringing smiles to children and families during Islamic holidays through our gift distribution program.'
    },
    {
      id: 8,
      title: 'Eid Celebration with Community',
      image: holidayGift2,
      category: 'Holiday Events',
      location: 'Kemise Community',
      description: 'Community gathering during Eid celebrations, sharing joy and gifts with families in need.'
    },
    {
      id: 9,
      title: 'Children\'s Holiday Celebration',
      image: holidayGift3,
      category: 'Holiday Events',
      location: 'Kemise Community',
      description: 'Special holiday event focused on bringing joy and gifts to children in our community.'
    },

    // Home to Home Ziyara Events
    {
      id: 10,
      title: 'Home-to-Home Ziyara - Personal Care',
      image: homeZiyara1,
      category: 'Community Outreach',
      location: 'Kemise Neighborhoods',
      description: 'Our volunteers visiting families in their homes, providing personal support and assistance.'
    },
    {
      id: 11,
      title: 'Family Support Visit',
      image: homeZiyara2,
      category: 'Community Outreach',
      location: 'Kemise Neighborhoods',
      description: 'Direct family support through our home visitation program, bringing aid where it\'s needed most.'
    },
    {
      id: 12,
      title: 'Community Connection Through Ziyara',
      image: homeZiyara3,
      category: 'Community Outreach',
      location: 'Kemise Neighborhoods',
      description: 'Building stronger community bonds through personal visits and direct family support.'
    },

    // Random Caring Events
    {
      id: 13,
      title: 'Community Care Initiative',
      image: caring1,
      category: 'Community Support',
      location: 'Kemise Community',
      description: 'Spontaneous acts of kindness and support reaching out to community members in need.'
    },
    {
      id: 14,
      title: 'Volunteer Outreach Program',
      image: caring2,
      category: 'Community Support',
      location: 'Kemise Community',
      description: 'Our volunteers actively engaging with the community to identify and address immediate needs.'
    },
    {
      id: 15,
      title: 'Community Assistance Program',
      image: caring3,
      category: 'Community Support',
      location: 'Kemise Community',
      description: 'Providing immediate assistance and care to community members facing various challenges.'
    },

    // PROGRAMS SECTION
    // Celebrating Arafah with Orphans
    {
      id: 16,
      title: 'Arafah Celebration with Orphans',
      image: orphan1,
      category: 'Orphan Care',
      location: 'Kemise Orphan Center',
      description: 'Special Arafah celebration bringing joy and Islamic education to orphaned children in our care.'
    },
    {
      id: 17,
      title: 'Orphan Care - Eid Preparation',
      image: orphan2,
      category: 'Orphan Care',
      location: 'Kemise Orphan Center',
      description: 'Preparing orphaned children for Eid celebrations with gifts, new clothes, and special activities.'
    },
    {
      id: 18,
      title: 'Islamic Education for Orphans',
      image: orphan3,
      category: 'Orphan Care',
      location: 'Kemise Orphan Center',
      description: 'Providing Islamic education and spiritual guidance to orphaned children during special occasions.'
    },

    // Celebrating Ramadan with the Poor
    {
      id: 19,
      title: 'Ramadan Food Distribution',
      image: ramadan1,
      category: 'Ramadan Program',
      location: 'Kemise Community',
      description: 'Distributing iftar meals and food packages to families in need during the holy month of Ramadan.'
    },
    {
      id: 20,
      title: 'Ramadan Community Iftar',
      image: ramadan2,
      category: 'Ramadan Program',
      location: 'Kemise Community',
      description: 'Community iftar gatherings bringing people together to break their fast during Ramadan.'
    },
    {
      id: 21,
      title: 'Ramadan Support Program',
      image: ramadan3,
      category: 'Ramadan Program',
      location: 'Kemise Community',
      description: 'Comprehensive Ramadan support including food, financial aid, and spiritual programs for the needy.'
    },

    // Permanent Care for Weak Peoples
    {
      id: 22,
      title: 'Elderly Care Program',
      image: elderly1,
      category: 'Elderly Care',
      location: 'Kemise Community',
      description: 'Ongoing care and support for elderly community members who need assistance with daily activities.'
    },
    {
      id: 23,
      title: 'Disability Support Services',
      image: elderly2,
      category: 'Disability Support',
      location: 'Kemise Community',
      description: 'Specialized care and support services for community members with disabilities and special needs.'
    },
    {
      id: 24,
      title: 'Vulnerable Population Care',
      image: elderly3,
      category: 'Community Care',
      location: 'Kemise Community',
      description: 'Comprehensive care program for the most vulnerable members of our community.'
    },

    // Educational Material Support
    {
      id: 25,
      title: 'School Supply Distribution',
      image: education1,
      category: 'Education Support',
      location: 'Local Schools',
      description: 'Providing essential school supplies and materials to students from low-income families.'
    },
    {
      id: 26,
      title: 'Educational Resource Program',
      image: education2,
      category: 'Education Support',
      location: 'Local Schools',
      description: 'Comprehensive educational support including textbooks, uniforms, and learning materials.'
    },
    {
      id: 27,
      title: 'Student Support Initiative',
      image: education3,
      category: 'Education Support',
      location: 'Local Schools',
      description: 'Supporting students\' educational journey through provision of necessary learning materials.'
    },

    // Summer Course Programs
    {
      id: 28,
      title: 'Summer Learning Program',
      image: summer1,
      category: 'Summer Education',
      location: 'Kemise Educational Center',
      description: 'Intensive summer courses providing additional learning opportunities during school holidays.'
    },
    {
      id: 29,
      title: 'Youth Skill Development',
      image: summer2,
      category: 'Summer Education',
      location: 'Kemise Educational Center',
      description: 'Summer programs focused on developing practical skills and knowledge for young people.'
    },
    {
      id: 30,
      title: 'Islamic Summer School',
      image: summer3,
      category: 'Summer Education',
      location: 'Kemise Educational Center',
      description: 'Summer Islamic education program combining Quran study with modern educational approaches.'
    },

    // Scholar Support Programs
    {
      id: 31,
      title: 'Scholar Support Program',
      image: scholar1,
      category: 'Scholar Support',
      location: 'Kemise Region',
      description: 'Supporting Islamic scholars and religious educators in the Kemise area with resources and assistance.'
    },
    {
      id: 32,
      title: 'Religious Education Support',
      image: scholar2,
      category: 'Scholar Support',
      location: 'Kemise Region',
      description: 'Providing financial and material support to scholars dedicated to Islamic education and community service.'
    },
    {
      id: 33,
      title: 'Islamic Knowledge Preservation',
      image: scholar3,
      category: 'Scholar Support',
      location: 'Kemise Region',
      description: 'Supporting efforts to preserve and transmit Islamic knowledge through scholar assistance programs.'
    },

    // Water Well Projects
    {
      id: 34,
      title: 'Water Well Construction Project',
      image: water1,
      category: 'Water Projects',
      location: 'Rural Kemise',
      description: 'Construction of new water wells to provide clean, accessible water to rural communities.'
    },
    {
      id: 35,
      title: 'Community Water Access',
      image: water2,
      category: 'Water Projects',
      location: 'Rural Kemise',
      description: 'Completed water well serving multiple families with clean, safe drinking water.'
    },
    {
      id: 36,
      title: 'Rural Water Infrastructure',
      image: water3,
      category: 'Water Projects',
      location: 'Rural Kemise',
      description: 'Developing water infrastructure to improve health and quality of life in rural communities.'
    },

    // Zakat Distribution
    {
      id: 37,
      title: 'Zakat Distribution Program',
      image: zakat1,
      category: 'Zakat Program',
      location: 'Kemise Community',
      description: 'Transparent and systematic distribution of Zakat to eligible recipients in our community.'
    },
    {
      id: 38,
      title: 'Islamic Charity Distribution',
      image: zakat2,
      category: 'Zakat Program',
      location: 'Kemise Community',
      description: 'Fulfilling the Islamic obligation of Zakat through organized distribution to those in need.'
    },
    {
      id: 39,
      title: 'Community Zakat Support',
      image: zakat3,
      category: 'Zakat Program',
      location: 'Kemise Community',
      description: 'Supporting community members through the Islamic principle of Zakat distribution.'
    }
  ];


  const filteredItems = galleryItems;

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-hero py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-lg rotate-45 animate-wave"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full animate-pulse-gentle"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Media & Gallery
          </h1>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Witness the impact of our programs through photos and visual stories from our community
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-secondary" />
              <span>Visual Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Photo Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Photo Gallery
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Visual stories of hope, compassion, and community transformation
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="certificate-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="certificate-card group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                  />

                  {/* Overlay with view button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100 backdrop-blur-sm"
                          onClick={() => setSelectedImage(item)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="relative">
                          <img
                            src={selectedImage?.image}
                            alt={selectedImage?.title}
                            className="w-full h-auto max-h-[70vh] object-contain"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h3 className="text-white text-xl font-bold mb-2">{selectedImage?.title}</h3>
                            <p className="text-white/90 text-sm">{selectedImage?.description}</p>
                            <div className="flex items-center justify-between mt-4 text-white/80 text-sm">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{selectedImage?.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results info */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-6">
              Showing {galleryItems.length} gallery items
            </p>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Our YouTube Channel
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Watch our community programs in action, hear inspiring stories from beneficiaries,
              and see the real impact of your support through our video content.
            </p>
          </div>

          {/* Featured Videos */}
          <div className="certificate-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                id: 'QTGdKfEYBGg',
                title: 'Ramadan with the Poor',
                thumbnail: 'https://img.youtube.com/vi/QTGdKfEYBGg/maxresdefault.jpg',
                duration: '8:15'
              
              },
              {
                id: 'vfhauma9Wsc',
                title: 'Ramadan with the Poor',
                thumbnail: 'https://img.youtube.com/vi/vfhauma9Wsc/maxresdefault.jpg',
                duration: '6:42'
            
              },
              {
                id: 'JpxoF7cTcUg',
                title: 'Ramadan with the Poor',
                thumbnail: 'https://img.youtube.com/vi/JpxoF7cTcUg/maxresdefault.jpg',
                duration: '10:33'
    
              },
              {
                id: 'BLHO6HjzISo',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/BLHO6HjzISo/maxresdefault.jpg',
                duration: '14:22'
          
              },
              {
                id: 'dI0pt-0SOhI',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/dI0pt-0SOhI/maxresdefault.jpg',
                duration: '11:18'
              },
              {
                id: '_n32VbvG7bE',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/_n32VbvG7bE/maxresdefault.jpg',
                duration: '9:45'
              },
              {
                id: '6cpwpRmO8Rs',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/6cpwpRmO8Rs/maxresdefault.jpg',
                duration: '16:30'
              },
              {
                id: 'c4dzz0wMpd8',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/c4dzz0wMpd8/maxresdefault.jpg',
                duration: '13:12'
              },
              {
                id: 'amA4RnHp5dY',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/amA4RnHp5dY/maxresdefault.jpg',
                duration: '12:08'
              },
              {
                id: 'GjlVFzghHKE',
                title: 'Graduation Ceremony',
                thumbnail: 'https://img.youtube.com/vi/GjlVFzghHKE/maxresdefault.jpg',
                duration: '15:45'
              
              },
              {
                id: 'NrXrICFyBro',
                title: 'Educational Material Support for Students',
                thumbnail: 'https://img.youtube.com/vi/NrXrICFyBro/maxresdefault.jpg',
                duration: '18:22'
              
              },
              {
                id: 'XytO780FaJg',
                title: 'Educational Material Support for Students',
                thumbnail: 'https://img.youtube.com/vi/XytO780FaJg/maxresdefault.jpg',
                duration: '11:55'
              
              },
              {
                id: 'zt3lY9oBFg0',
                title: 'Arafah with Orphans',
                thumbnail: 'https://img.youtube.com/vi/zt3lY9oBFg0/maxresdefault.jpg',
                duration: '11:18'
              },
              {
                id: 'pojknPUWskw',
                title: 'Arafah with Orphans',
                thumbnail: 'https://img.youtube.com/vi/pojknPUWskw/maxresdefault.jpg',
                duration: '9:45'
              },
              {
                id: 'DvRas5FJ2Do',
                title: 'Arafah with Orphans',
                thumbnail: 'https://img.youtube.com/vi/DvRas5FJ2Do/maxresdefault.jpg',
                duration: '16:30'
              },
              {
                id: 'yTFY2rbvHUA',
                title: 'Arafah with Orphans',
                thumbnail: 'https://img.youtube.com/vi/yTFY2rbvHUA/maxresdefault.jpg',
                duration: '13:12'
              },
              {
                id: 'DEc86GBp70Y',
                title: 'Arafah with Orphans',
                thumbnail: 'https://img.youtube.com/vi/DEc86GBp70Y/maxresdefault.jpg',
                duration: '12:08'
              },

            ].map((video, index) => (
              <Card key={index} className="certificate-card group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative aspect-video">
                  {/* YouTube Thumbnail */}
                  <LazyImage
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                      YouTube Video
                    </Badge>
                    <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>

                  <Button
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* YouTube Channel CTA */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our YouTube Channel</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Get notified when we upload new videos showcasing our community programs,
                  beneficiary stories, and the real impact of your support.
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://www.youtube.com/@MuftiDawudCharity/videos', '_blank')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Visit Our Channel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GalleryPage;

/*
 * GALLERY IMAGE OPTIMIZATION SCRIPT (Ready to use):
 *
 * npm install sharp imagemin imagemin-mozjpeg imagemin-pngquant
 *
 * const sharp = require('sharp');
 * const fs = require('fs');
 * const path = require('path');
 *
 * // Optimize all gallery images
 * const imagesDir = './src/assets/images/';
 * const galleryImages = [
 *   'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
 *   'image6.jpg', 'iamge7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg',
 *   'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg',
 *   'image17.jpg', 'image18.jpg', 'image19.jpg'
 * ];
 *
 * galleryImages.forEach(file => {
 *   const inputPath = `${imagesDir}${file}`;
 *   const outputPath = `${imagesDir}optimized/${file}`;
 *
 *   if (fs.existsSync(inputPath)) {
 *     sharp(inputPath)
 *       .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
 *       .jpeg({ quality: 85, progressive: true })
 *       .toFile(outputPath)
 *       .then(() => console.log(`✅ Optimized: ${file}`))
 *       .catch(err => console.error(`❌ Error optimizing ${file}:`, err));
 *   }
 * });
 *
 * // YouTube thumbnails are external, so they benefit from CDN caching
 * // Consider using YouTube's thumbnail CDN with optimized URLs
 */