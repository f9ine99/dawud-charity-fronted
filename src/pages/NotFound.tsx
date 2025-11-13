import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useScrollToTop } from '@/hooks/useScrollAnimations';
import { ArrowUp, Home, Search, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { scrollToTop, isVisible: showScrollTop } = useScrollToTop();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="bg-gradient-hero py-20 flex items-center justify-center">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-gentle">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-8xl md:text-9xl font-bold text-white mb-6">
              404
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
              Oops! The page you're looking for seems to have wandered off
            </p>
            <p className="text-lg text-white/80 mb-8">
              Don't worry, even the best explorers sometimes take a wrong turn.
              Let's get you back on the right path!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="xl" className="group">
              <Link to="/" className="flex items-center gap-3">
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Back to Home</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="group bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/programs" className="flex items-center gap-3">
                <span>View Our Programs</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="text-white/60 text-sm">
            <p>Need help? <a href="/contact" className="text-white/80 hover:text-white underline">Contact us</a></p>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NotFound;
