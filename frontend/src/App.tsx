import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Feedback from "./pages/Feedback";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { SimpleToastProvider } from "./components/ui/simple-toast";
import WorkCategory from "./pages/WorkCategory";
import DigitalMarketing from "./pages/DigitalMarketing";
import { ExpandableChatDemo } from "./components/ExpandableChatDemo";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsent } from "@/components/ui/cookie-consent";
import VideoProduction from "./pages/VideoProduction";
import Branding from "./pages/Branding";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { PixelCursorTrail } from "./components/ui/pixel-trail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SimpleToastProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/work/video-production" element={<VideoProduction />} />
          <Route path="/work/branding" element={<Branding />} />
            <Route path="/work/:categoryId" element={<WorkCategory />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent showDelay={3000} autoHideDelay={15000} />
          <FloatingActionButton />
          <ExpandableChatDemo />
          <PixelCursorTrail />
        </BrowserRouter>
      </SimpleToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
