import { useScrollAnimation, useScrollToTop } from '@/hooks/useScrollAnimations';
import { ArrowUp, Heart, Users, BookOpen } from 'lucide-react';

// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { scrollToTop, isVisible: showScrollTop } = useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="bg-gradient-hero py-20">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to Dawud Charity
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Building a better future through compassion, education, and community support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/80">Lives Touched</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Students Supported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Heart className="w-8 h-8 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">12+</div>
              <div className="text-white/80">Years of Service</div>
            </div>
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

export default Index;
