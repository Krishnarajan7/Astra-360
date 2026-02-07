import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-ring opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-headline lg:text-display font-medium text-foreground mb-8 reveal">
            Ready to transform
            <br />
            <span className="text-gradient">Your Brand?</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 reveal">
            Let's create something extraordinary together. Tell us about your vision and we'll show you what's possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
  <Button variant="hero" size="lg" asChild>
    <Link
      to="/contact"
      className="group"
      aria-label="Get in touch with Astra 360 digital agency"
    >
      Get in Touch
      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </Button>

  <Button variant="heroOutline" size="lg" asChild>
    <Link
      to="/services"
      aria-label="Explore Astra 360 digital marketing and IT services"
    >
      Explore Services
    </Link>
  </Button>
</div>

        </div>
      </div>
    </section>
  );
};
