import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  Moon, Heart, GraduationCap, BookOpen,
  DollarSign, Sun, Droplets, Home,
  Calendar, Users, MapPin, Clock
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimations';

// Programs Page Images - Ramadan with the Poor
import ramadanPoor1 from '@/assets/pictures/programs/celebrating ramadan with the poor/e8dc4fdb-58cb-4dd5-a6d7-dc5d216773a6.jpg';
import ramadanPoor2 from '@/assets/pictures/programs/celebrating ramadan with the poor/21676542-9f37-46e1-8cd4-81a0f10acdcb.jpg';
import ramadanPoor3 from '@/assets/pictures/programs/celebrating ramadan with the poor/2e974efa-29b2-4fd6-8eda-abbea052b86d.jpg';
import ramadanPoor4 from '@/assets/pictures/programs/celebrating ramadan with the poor/47970365-54da-4eb4-ad33-2937e5673f7e.jpg';
import ramadanPoor5 from '@/assets/pictures/programs/celebrating ramadan with the poor/50f0cf65-f592-45c9-9eb4-08fa1aafc349.jpg';
import ramadanPoor6 from '@/assets/pictures/programs/celebrating ramadan with the poor/6df91a44-0fd3-46c6-8673-94a51b43bcb1.jpg';

// Programs Page Images - Arafah with Orphans
import arafahOrphan1 from '@/assets/pictures/programs/celebrating arafah with orphans/8ac17816-76e8-42ee-9462-55acd7285668.jpg';
import arafahOrphan2 from '@/assets/pictures/programs/celebrating arafah with orphans/5d6028b6-846f-4f98-911b-7637d55953a9.jpg';
import arafahOrphan3 from '@/assets/pictures/programs/celebrating arafah with orphans/6e46b20a-a699-4584-96ce-ef664002cb17.jpg';
import arafahOrphan4 from '@/assets/pictures/programs/celebrating arafah with orphans/7184b03d-7c04-4f5e-9035-c9209162f0bc.jpg';
import arafahOrphan5 from '@/assets/pictures/programs/celebrating arafah with orphans/79a82b49-bd4f-4dd8-a48c-2a0120decec8.jpg';

// Programs Page Images - Supporting Scholars
import scholarSupport1 from '@/assets/pictures/programs/supporting scholars around kemise/640b571b-ad77-4bc6-aadf-80dc63e583eb.jpg';
import scholarSupport2 from '@/assets/pictures/programs/supporting scholars around kemise/56a81b65-57db-4bff-b827-221622565faa.jpg';
import scholarSupport3 from '@/assets/pictures/programs/supporting scholars around kemise/1fb712db-8c16-472e-b71c-779c78f4151f.jpg';
import scholarSupport4 from '@/assets/pictures/programs/supporting scholars around kemise/72a0082c-2b32-494c-bdbf-345a4a0a92d2.jpg';

// Programs Page Images - Educational Material Support
import educationMaterial1 from '@/assets/pictures/programs/providing educational material for students/977718ac-2fbc-4227-a6e7-6a9728a017b7.jpg';
import educationMaterial2 from '@/assets/pictures/programs/providing educational material for students/34420099-1a2a-43dc-8a5d-f31827f9aab1.jpg';
import educationMaterial3 from '@/assets/pictures/programs/providing educational material for students/42365b47-ceb0-4c11-9056-2c071dc7c343.jpg';
import educationMaterial4 from '@/assets/pictures/programs/providing educational material for students/49585d63-7d76-4ac1-bcb7-4c7ab2ebe727.jpg';
import educationMaterial5 from '@/assets/pictures/programs/providing educational material for students/7ab776c2-ed9c-485e-8c95-0f731f89f3cd.jpg';

// Programs Page Images - Zakat Distribution
import zakatDist1 from '@/assets/pictures/programs/zakat distribution/8e2768c0-2345-47c4-b53f-fd50eed28570.jpg';
import zakatDist2 from '@/assets/pictures/programs/zakat distribution/1dbb5811-014a-4d9f-852f-d98318f96241.jpg';
import zakatDist3 from '@/assets/pictures/programs/zakat distribution/2c2d26db-dadb-4981-bb62-74dcae5e813c.jpg';
import zakatDist4 from '@/assets/pictures/programs/zakat distribution/4895af29-170e-4b39-95df-15e40f76e5d4.jpg';
import zakatDist5 from '@/assets/pictures/programs/zakat distribution/7836bd1a-924f-4835-888a-c063152342f7.jpg';

// Programs Page Images - Summer Courses
import summerCourse1 from '@/assets/pictures/programs/providing summer course for students/97e1a6dc-159b-4821-8d7b-1418c9e5ae35.jpg';
import summerCourse2 from '@/assets/pictures/programs/providing summer course for students/bfbd7784-d88a-4d4a-93ba-f37f03d2fe0b.jpg';
import summerCourse3 from '@/assets/pictures/programs/providing summer course for students/e5b31be5-066f-43e6-8ff3-460f0b3484f5.jpg';
import summerCourse4 from '@/assets/pictures/programs/providing summer course for students/eacb88cd-be47-4df5-9573-fb7680deecb2.jpg';

// Programs Page Images - Clean Water Wells
import waterWell1 from '@/assets/pictures/programs/water wells built by our charity org/e1ea9f16-f872-48b6-99ee-87aacaa11ed0.jpg';
import waterWell2 from '@/assets/pictures/programs/water wells built by our charity org/429743bf-1168-469b-ae14-9e103222f2d7.jpg';
import waterWell3 from '@/assets/pictures/programs/water wells built by our charity org/46dd6f4a-6580-4be8-8ef3-fa7438564914.jpg';
import waterWell4 from '@/assets/pictures/programs/water wells built by our charity org/c2fe3caf-a5ab-4f7f-a175-233c28dc05ef.jpg';
import waterWell5 from '@/assets/pictures/programs/water wells built by our charity org/c2fe3caf-a5ab-4f7f-a175-233c28dc05ef.jpg';

// Programs Page Images - Permanent Care
import permanentCare1 from '@/assets/pictures/programs/permanent care for weak peoples /1078d31c-721d-4a98-b723-636a5b4ff5ad.jpg';
import permanentCare2 from '@/assets/pictures/programs/permanent care for weak peoples /6fb13155-c469-4175-b286-5bce55272a2a.jpg';
import permanentCare3 from '@/assets/pictures/programs/permanent care for weak peoples /78aef915-b1e7-421e-b5ae-f43ff6255dbb.jpg';
import permanentCare4 from '@/assets/pictures/programs/permanent care for weak peoples /c632ca84-cf13-438d-b294-100fcfdc292b.jpg';
import permanentCare5 from '@/assets/pictures/programs/permanent care for weak peoples /e382489c-26b9-4ac0-818f-0bfbe26701b5.jpg';

const ProgramsPage = () => {
  const navigate = useNavigate();

  // Scroll animations
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const overviewAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Staggered animation for program cards
  const { getItemAnimation } = useStaggeredAnimation(8, 150);

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

  const programs = [
    {
      id: 1,
      title: 'Ramadan with the Poor',
      motto: 'Sharing the blessings of Ramadan with those in need',
      description: 'During the holy month of Ramadan, we provide essential food packages, iftar meals, and financial support to families in need. Our volunteers work tirelessly to ensure that everyone can participate in the spiritual blessings of this sacred time.',
      image: ramadanPoor1,
      icon: Moon,
      features: ['Daily iftar meals', 'Food packages', 'Financial assistance', 'Community gatherings'],
      impact: 'Over 2,000 families supported annually',
      season: 'Annual - Ramadan month',
      gallery: [
        ramadanPoor2,
        ramadanPoor3,
        ramadanPoor4,
        ramadanPoor5,
        ramadanPoor6
      ]
    },
    {
      id: 2,
      title: 'Arafah with Orphans',
      motto: 'Bringing joy and hope to orphaned children during Eid',
      description: 'We celebrate Eid al-Adha with orphaned children, providing them with new clothes, gifts, special meals, and recreational activities. This program ensures that every child feels loved and included during this important Islamic celebration.',
      image: arafahOrphan1,
      icon: Heart,
      features: ['New clothing', 'Eid gifts', 'Special meals', 'Fun activities', 'Educational programs'],
      impact: '200+ orphans celebrated annually',
      season: 'Annual - Eid al-Adha',
      gallery: [
        arafahOrphan1,
        arafahOrphan2,
        arafahOrphan3,
        arafahOrphan4,
        arafahOrphan5
      ]
    },
    {
      id: 3,
      title: 'Support for Scholars',
      motto: 'Investing in knowledge and Islamic education',
      description: 'We provide financial assistance, educational materials, and living support to Islamic scholars and students pursuing religious education. This program helps preserve and spread Islamic knowledge in our community.',
      image: scholarSupport1,
      icon: GraduationCap,
      features: ['Tuition assistance', 'Educational materials', 'Living stipends', 'Mentorship programs'],
      impact: '50+ scholars supported',
      season: 'Ongoing throughout the year',
      gallery: [
        scholarSupport1,
        scholarSupport2,
        scholarSupport3,
        scholarSupport4
      ]
    },
    {
      id: 4,
      title: 'Educational Material Support',
      motto: 'Empowering minds through access to education',
      description: 'We provide school supplies, textbooks, uniforms, and educational tools to students from low-income families. Our goal is to remove financial barriers that prevent children from accessing quality education.',
      image: educationMaterial1,
      icon: BookOpen,
      features: ['School supplies', 'Textbooks', 'Uniforms', 'Study materials', 'Computer access'],
      impact: '1,000+ students assisted annually',
      season: 'Before each school term',
      gallery: [
        educationMaterial1,
        educationMaterial2,
        educationMaterial3,
        educationMaterial4,
        educationMaterial5
      ]
    },
    {
      id: 5,
      title: 'Zakat Distribution',
      motto: 'Fulfilling the pillar of giving with transparency',
      description: 'We collect and distribute Zakat according to Islamic principles, ensuring that eligible recipients receive their rightful share. Our transparent system guarantees that contributions reach those most in need.',
      image: zakatDist1,
      icon: DollarSign,
      features: ['Transparent collection', 'Verified recipients', 'Regular distributions', 'Detailed reporting'],
      impact: 'Thousands of beneficiaries reached',
      season: 'Year-round collections and distributions',
      gallery: [
        zakatDist1,
        zakatDist2,
        zakatDist3,
        zakatDist4,
        zakatDist5
      ]
    },
    {
      id: 6,
      title: 'Summer Courses',
      motto: 'Learning and growth during school holidays',
      description: 'We organize educational and skill-building courses during summer holidays, including Quran memorization, Arabic language, life skills, and vocational training for youth and adults.',
      image: summerCourse1,
      icon: Sun,
      features: ['Quran memorization', 'Arabic classes', 'Life skills training', 'Vocational courses'],
      impact: '100+ participants each summer',
      season: 'Summer holidays',
      gallery: [
        summerCourse1,
        summerCourse2,
        summerCourse3,
        summerCourse4
      ]
    },
    {
      id: 7,
      title: 'Clean Water Wells',
      motto: 'Bringing life-sustaining water to remote communities',
      description: 'We construct and maintain water wells in rural communities that lack access to clean water. Each well serves multiple families and significantly improves health outcomes and quality of life.',
      image: waterWell1,
      icon: Droplets,
      features: ['Well construction', 'Maintenance services', 'Water quality testing', 'Community training'],
      impact: '2+ wells constructed, 10,000+ people served',
      season: 'Year-round construction projects',
      gallery: [
        waterWell1,
        waterWell2,
        waterWell3,
        waterWell4,
        waterWell5
      ]
    },
    {
      id: 8,
      title: 'Permanent Care for Vulnerable People',
      motto: 'Providing comprehensive, long-term support for those in need',
      description: 'Our flagship program provides ongoing support for vulnerable community members, including the elderly, disabled, and those with special needs. We offer housing, healthcare, emotional support, and life skills training.',
      image: permanentCare1,
      icon: Home,
      features: ['Safe housing', 'Healthcare coverage', 'Daily assistance', 'Life skills training', 'Emotional support'],
      impact: '200+ individuals in permanent care',
      season: 'Continuous, year-round support',
      gallery: [
        permanentCare1,
        permanentCare2,
        permanentCare3,
        permanentCare4,
        permanentCare5
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="bg-gradient-hero py-16">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Programs & Activities
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Discover the eight core programs through which we serve our community and create lasting positive change.
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-background">
        <div ref={overviewAnimation.elementRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${overviewAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Eight Pillars of Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each program is carefully designed to address specific needs in our community,
              from immediate relief to long-term empowerment and development.
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((program, index) => {
              const animationStyle = getItemAnimation(index);
              return (
                <Card
                  key={program.id}
                  className="group overflow-hidden shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-slate-800/50 dark:via-slate-700/30 dark:to-slate-800/50"
                  style={{
                    opacity: animationStyle.opacity,
                    transform: animationStyle.transform,
                    transition: `${animationStyle.transition}, opacity 0.8s ease-out`,
                  }}
                >
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''} relative overflow-hidden`}>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                        <program.icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{program.title}</h3>
                        <p className="text-primary text-sm italic mt-1 transition-all duration-300 group-hover:text-primary-glow">{program.motto}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Program Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact & Schedule */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground text-sm">Impact</p>
                          <p className="text-muted-foreground text-xs">{program.impact}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground text-sm">Schedule</p>
                          <p className="text-muted-foreground text-xs">{program.season}</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="program" size="lg" className="w-full sm:w-auto group" onClick={scrollToBankAccounts}>
                      <span className="relative z-10">Support This Program</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    </Button>
                  </CardContent>
                </div>
              </Card>
              );
            })}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero">
        <div ref={ctaAnimation.elementRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${ctaAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Support Our Programs
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your donation helps us continue and expand these vital programs.
            Every contribution makes a real difference in someone's life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" className="group" onClick={scrollToBankAccounts}>
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Make a Donation
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </Button>
            <Button asChild variant="ctaOutline" size="xl" className="group">
              <Link to="/contact" className="relative z-10">
                <span className="relative z-10 flex items-center gap-2">
                  <Users className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  Get Involved
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProgramsPage;