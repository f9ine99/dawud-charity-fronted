import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Home, Gift, Heart as HeartIcon, PartyPopper,
  Calendar, Users, MapPin, Clock, UserCheck, UserPlus, HandHeart
} from 'lucide-react';
import homeToHomeImage from '@/assets/home-to-home-ziyara.jpg';
import holidayGiftsImage from '@/assets/holiday-gifts.jpg';
import bloodDonationImage from '@/assets/blood-donation.jpg';
import eidCelebrationImage from '@/assets/eid-celebration.jpg';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimations';

// Events Page Images - Home to Home Ziyara
import homeZiyara1 from '@/assets/pictures/events/home to home ziyara event/f33013c5-560f-4a54-a2fd-7035ea4e633d.jpg';
import homeZiyara2 from '@/assets/pictures/events/home to home ziyara event/47248850-02c7-42fb-be54-5fec5bc95821.jpg';
import homeZiyara3 from '@/assets/pictures/events/home to home ziyara event/57d5ae05-b46a-4298-a1eb-797337f59916.jpg';
import homeZiyara4 from '@/assets/pictures/events/home to home ziyara event/5f491f50-4c68-463e-a931-5649afd6aecd.jpg';
import homeZiyara5 from '@/assets/pictures/events/home to home ziyara event/6ca22f88-bd98-468d-92f6-7e0f668474b1.jpg';

// Events Page Images - Holiday Gift Events
import holidayGift1 from '@/assets/pictures/events/holiday gift event/04e16f2d-46d3-43db-8f7c-91e6e545263f.jpg';
import holidayGift2 from '@/assets/pictures/events/holiday gift event/3d391378-b2c9-4884-bb67-b0553c857eb7.jpg';
import holidayGift3 from '@/assets/pictures/events/holiday gift event/6641fcce-badb-4bd8-8d50-4fd888cfc7ca.jpg';
import holidayGift4 from '@/assets/pictures/events/holiday gift event/8a1d1f38-70ae-4abe-b74f-f786c4a9bab2.jpg';
import holidayGift5 from '@/assets/pictures/events/holiday gift event/93cfd4c5-d7aa-47c3-9ba2-7e26a935831f.jpg';

// Events Page Images - Blood Donation Events
import bloodDonationEvent1 from '@/assets/pictures/events/blood donation event/faee0340-06b9-4112-b8fa-5b154680190f.jpg';
import bloodDonationEvent2 from '@/assets/pictures/events/blood donation event/34f1fadf-e858-46ea-b963-d7dab51239b5.jpg';
import bloodDonationEvent3 from '@/assets/pictures/events/blood donation event/354a9454-d724-4e09-b222-54dca9d0332c.jpg';
import bloodDonationEvent4 from '@/assets/pictures/events/blood donation event/a42f7e6e-b8c9-4536-a56a-c40255d83ee1.jpg';
import bloodDonationEvent5 from '@/assets/pictures/events/blood donation event/e7f071d0-d5a5-4c3e-9484-13e8ea3e2492.jpg';

// Events Page Images - Graduation Events
import graduationEvent1 from '@/assets/pictures/events/graduation cermony event/cbd8a1f0-56d6-4362-b67e-6b060fb9bea7.jpg';
import graduationEvent2 from '@/assets/pictures/events/graduation cermony event/IMG_20250928_165925_514.jpg';
import graduationEvent3 from '@/assets/pictures/events/graduation cermony event/IMG_20250928_165943_307.jpg';

// Events Page Images - Random Caring Events
import caringEvent1 from '@/assets/pictures/events/random caring event/18903c72-cfa5-4f21-8cfe-da2402c6795b.jpg';
import caringEvent2 from '@/assets/pictures/events/random caring event/5cb8380d-81f1-4429-ae0a-de1f8b761527.jpg';
import caringEvent3 from '@/assets/pictures/events/random caring event/75b76b21-5b34-4012-8b46-412e562d7af2.jpg';

const EventsPage = () => {
  // Scroll animations
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const eventsAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Staggered animation for event cards
  const { getItemAnimation } = useStaggeredAnimation(5, 150);

  const events = [
    {
      id: 1,
      title: 'Home-to-Home Ziyara',
      description: 'Personal visits to families in need, bringing support directly to their homes with food, assistance, and spiritual comfort.',
      image: homeZiyara1,
      icon: Home,
      frequency: 'Monthly',
      participants: '20+ volunteers',
      gallery: [
        homeZiyara1,
        homeZiyara2,
        homeZiyara3,
        homeZiyara4,
        homeZiyara5
      ]
    },
    {
      id: 2,
      title: 'Holiday Gift Distribution',
      description: 'Special gift-giving events during Islamic holidays, ensuring every child and family feels the joy of celebration.',
      image: holidayGift1,
      icon: Gift,
      frequency: 'During Islamic holidays',
      participants: '500+ recipients',
      gallery: [
        holidayGift1,
        holidayGift2,
        holidayGift3,
        holidayGift4,
        holidayGift5
      ]
    },
    {
      id: 3,
      title: 'Blood Donation Drives',
      description: 'Community health initiatives organizing blood donation campaigns to support local hospitals and save lives.',
      image: bloodDonationEvent1,
      icon: HeartIcon,
      frequency: 'Quarterly',
      participants: '100+ donors',
      gallery: [
        bloodDonationEvent1,
        bloodDonationEvent2,
        bloodDonationEvent3,
        bloodDonationEvent4,
        bloodDonationEvent5
      ]
    },
    {
      id: 4,
      title: 'Graduation Ceremony',
      description: 'Celebrating academic achievements and educational milestones of students supported by our programs.',
      image: graduationEvent1,
      icon: PartyPopper,
      frequency: 'Annual',
      participants: '300+ students and families',
      gallery: [
        graduationEvent1,
        graduationEvent2,
        graduationEvent3
      ]
    },
    {
      id: 5,
      title: 'Community Care Events',
      description: 'Spontaneous community outreach and care initiatives addressing immediate needs and providing support.',
      image: caringEvent1,
      icon: HeartIcon,
      frequency: 'As needed',
      participants: 'Entire community',
      gallery: [
        caringEvent1,
        caringEvent2,
        caringEvent3
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="bg-gradient-hero py-16">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Community Events & Activities
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Join us in bringing our community together through meaningful events and celebrations that strengthen bonds and spread joy.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-background">
        <div ref={eventsAnimation.elementRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${eventsAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Special Events & Activities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Throughout the year, we organize special events that bring our community together
              and provide additional support to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => {
              const animationStyle = getItemAnimation(index);
              return (
                <Card
                  key={event.id}
                  className="overflow-hidden shadow-card hover:shadow-lg transition-smooth hover:-translate-y-1"
                  style={{
                    opacity: animationStyle.opacity,
                    transform: animationStyle.transform,
                    transition: `${animationStyle.transition}, opacity 0.8s ease-out`,
                  }}
                >
                <div className="aspect-video">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center mr-3">
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Frequency</p>
                        <p className="text-xs text-muted-foreground">{event.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Reach</p>
                        <p className="text-xs text-muted-foreground">{event.participants}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-subtle">
        <div ref={ctaAnimation.elementRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${ctaAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Get Involved in Our Events
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Whether as a volunteer, donor, or participant, your involvement makes these events
            possible and helps strengthen our community bonds.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="xl"
              className="group relative overflow-hidden bg-gradient-warm hover:shadow-warm hover:shadow-lg text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-0"
            >
              <Link to="/donate" className="flex items-center space-x-3">
                <div className="relative">
                  <HandHeart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="relative z-10">Support Our Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </Button>
            <Button
              size="xl"
              className="group relative overflow-hidden bg-gradient-hero hover:shadow-xl text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-0"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScGeL86ENck1CrY5I8tHiKzLu5swWZRMCQ07__EpjPfFrp8JQ/viewform?usp=header', '_blank')}
            >
              <div className="flex items-center space-x-3 relative z-10">
                <div className="relative">
                  <UserPlus className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span>Register as Volunteer</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EventsPage;
