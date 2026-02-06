import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TrustedBadge } from "./TrustedBadge";

export const HeroSection = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Experiences", "Solutions", "Strategies", "Innovations", "Results"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Animated gradient ring background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[800px] h-[800px] opacity-20">
          <div className="absolute inset-0 bg-gradient-ring rounded-full animate-spin-slow blur-3xl" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-astra-teal/40 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-astra-purple/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-astra-orange/40 rounded-full animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trusted Badge */}
          <div className="animate-fade-up mb-8">
            <TrustedBadge />
          </div>

          {/* Main heading */}
          <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up-delay-1">
            We Build Digital
            <br />
            <span className="relative flex justify-center items-center h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                {titles.map((title, index) => (
                  titleNumber === index && (
                    <motion.span
                      key={index}
                      className="text-gradient absolute"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ 
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      {title}
                    </motion.span>
                  )
                ))}
              </AnimatePresence>
            </span>
            That Grow Brands.
          </h1>

          {/* Subheading */}
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up-delay-2">
            IT Solutions • Digital Marketing • Video Production • Creative Strategy
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact" className="group">
                Start a Project
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up-delay-3">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};