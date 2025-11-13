import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Send, Youtube } from 'lucide-react';
import logoImage from '@/assets/images/logo.jpg';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={logoImage}
                  alt="Mufti Dawud Charity Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Mufti Dawud</h3>
                <p className="text-sm text-muted-foreground">Charity Organization</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Caring for Orphans, Supporting the Poor, and Building a Better Future since 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Programs', href: '/programs' },
                { name: 'Events', href: '/events' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Contact', href: '/contact' },
                { name: 'Make a Donation', href: '/donate' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Our Programs</h4>
            <div className="space-y-2">
              {[
                'Ramadan with the Poor',
                'Arafah with Orphans',
                'Educational Support',
                'Clean Water Wells',
                'Zakat Distribution',
                'Support for Scholars',
                'Summer Courses',
              ].map((program) => (
                <div key={program} className="text-muted-foreground text-sm">
                  {program}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:muftidawudcharity@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                >
                  muftidawudcharity@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+251965070705"
                  className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                >
                  +251965070705
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <address className="text-muted-foreground text-sm not-italic">
                  Kulafaurashid Shopping Center,<br />
                  1st Floor, Office No. 109,<br />
                  Kemise City, Ethiopia
                </address>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064369375240"
                className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-spring"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://t.me/muftiDawudcharity"
                className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-spring"
              >
                <Send className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@MuftiDawudCharity/videos"
                className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center hover:scale-110 transition-spring"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@muftidawudcharity?_t=ZM-904tY1Khrh5&_r=1"
                className="w-8 h-8 bg-black rounded-lg flex items-center justify-center hover:scale-110 transition-spring"
              >
                <TikTokIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Mufti Dawud Charity Organization. All rights reserved. Built with compassion and care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;