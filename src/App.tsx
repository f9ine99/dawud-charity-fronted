import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import EventsPage from "./pages/EventsPage";
import DonatePage from "./pages/DonatePage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import "./lib/i18n"; // Initialize i18next

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Signal to the loading screen that React app is ready
    const signalAppReady = () => {
      // Dispatch a custom event that the loading screen can listen for
      window.dispatchEvent(new CustomEvent('react-app-ready'));
    };

    // Signal that React app is mounting and starting to render
    signalAppReady();

    // Also hide the loading screen after a reasonable delay as fallback
    const loadingScreen = document.getElementById('initial-loading');
    if (loadingScreen) {
      // Give it a bit more time for smooth transition
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 200);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/donate" element={<DonatePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
