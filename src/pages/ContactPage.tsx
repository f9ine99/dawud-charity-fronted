import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Mail, Phone, MapPin, Clock, Facebook, Send,
  Send as TelegramIcon, Users, HandHeart, Calendar, Youtube, ExternalLink, UserPlus, Sparkles
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimations';

const ContactPage = () => {
  const [mapError, setMapError] = useState(false);

  // Scroll animations
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const contactInfoAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const formAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Staggered animation for contact info cards
  const { getItemAnimation } = useStaggeredAnimation(4, 150);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'muftidawudcharity@gmail.com',
      link: 'mailto:muftidawudcharity@gmail.com',
      description: 'Send us an email for inquiries and information'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+251965070705',
      link: 'tel:+251965070705',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: 'Khulafa\'urashidin Shopping Center, 1st Floor, Office No. 109, Kemise City, Oromoia Zone, Amhara Region, Ethiopia',
      link: '#',
      description: 'Visit our office for in-person assistance'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Monday - Sunday: 8:00 AM - 5:00 PM',
      link: '#'
    },
  ];

  // Custom TikTok Icon Component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=100064369375240', color: 'bg-blue-600' },
    { name: 'Telegram', icon: TelegramIcon, url: 'https://t.me/muftiDawudcharity', color: 'bg-blue-500' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@MuftiDawudCharity/videos', color: 'bg-red-600' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@muftidawudcharity?_t=ZM-904tY1Khrh5&_r=1', color: 'bg-black' },
  ];

  const getInvolvedOptions = [
    {
      icon: HandHeart,
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers and make a direct impact in your community.'
    },
    {
      icon: Users,
      title: 'Partner with Us',
      description: 'Collaborate with us as an organization or business to expand our reach and impact.'
    },
    {
      icon: Calendar,
      title: 'Organize Fundraiser',
      description: 'Host a fundraising event in your community to support our programs.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="bg-gradient-hero py-16">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Get in touch with us to learn more about our work, volunteer opportunities,
            or how you can support our mission.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-background">
        <div ref={contactInfoAnimation.elementRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${contactInfoAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              We're here to answer your questions and help you get involved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const animationStyle = getItemAnimation(index);
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-card transition-smooth hover:-translate-y-1"
                  style={{
                    opacity: animationStyle.opacity,
                    transform: animationStyle.transform,
                    transition: `${animationStyle.transition}, opacity 0.8s ease-out`,
                  }}
                >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.link && info.link !== '#' ? (
                    <a
                      href={info.link}
                      className="text-primary hover:text-primary-glow transition-smooth font-medium break-words"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium break-words">{info.details}</p>
                  )}
                  <p className="text-muted-foreground text-sm mt-2">{info.description}</p>
                </CardContent>
              </Card>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card ref={formAnimation.elementRef} className={`shadow-card transition-all duration-1000 ${formAnimation.isVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-8'}`}>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Your last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Your phone number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
                        <SelectItem value="donation">Donation Question</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="program">Program Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required 
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Office Info */}
            <div className="space-y-6">
              {/* Interactive Map */}
              <Card className="shadow-card hover:shadow-lg transition-smooth">
                <CardContent className="p-0">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    {/* Google Maps Embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1674.3906003210254!2d39.869423447532384!3d10.7143675256648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1647f3b9a39d28bb%3A0xaaafdd6b32ae0725!2sMasjid%20Al-Khulafa%20Al-Rashidin!5e1!3m2!1sen!2set!4v1759942564229!5m2!1sen!2set"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mufti Dawud Charity Organization Location"
                      className="rounded-lg"
                    />

                    {/* Optional overlay for additional info */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Masjid Al-Khulafa Al-Rashidin</p>
                          <p className="text-xs text-slate-600">Office No. 109, 1st Floor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Details */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Visit Our Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p className="text-muted-foreground text-sm">
                          Khulafa'urashidin Shopping Center<br />
                          1st Floor, Office No. 109<br />
                          Kemise City, Oromoia Zone<br />
                          Amhara Region, Ethiopia
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Office Hours</p>
                        <p className="text-muted-foreground text-sm">
                          Monday - Sunday: 8:00 AM - 5:00 PM<br />
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Follow Us on Social Media
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stay updated with our latest activities and impact stories
          </p>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`w-16 h-16 ${social.color} rounded-lg flex items-center justify-center hover:scale-110 transition-spring shadow-card`}
              >
                <social.icon className="w-8 h-8 text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-background">
        <div ref={ctaAnimation.elementRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${ctaAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Involved
            </h2>
            <p className="text-xl text-muted-foreground">
              There are many ways to support our mission and make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-card transition-smooth">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{option.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{option.description}</p>
                  <Button
                    className="group relative overflow-hidden bg-gradient-hero hover:shadow-xl text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-0 w-full"
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScGeL86ENck1CrY5I8tHiKzLu5swWZRMCQ07__EpjPfFrp8JQ/viewform?usp=header', '_blank')}
                  >
                    <div className="flex items-center justify-center space-x-3 relative z-10">
                      <div className="relative">
                        <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <div className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="font-medium">Register as Volunteer</span>
                      <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default ContactPage;