import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
];

export const AboutSection = () => {
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
    <section ref={sectionRef} className="py-32 lg:py-40 bg-astra-dark text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <span className="text-sm font-medium text-primary-foreground/60 uppercase tracking-widest mb-4 block reveal">
              About Us
            </span>
            <h2 className="text-headline font-semibold mb-8 reveal">
              We believe in the power of
              <span className="text-gradient"> exceptional design</span> and strategic thinking.
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8 reveal">
              Astra 360 is a premium digital agency that partners with ambitious brands to create impactful digital experiences. We combine cutting-edge technology with creative excellence to deliver solutions that drive real business growth.
            </p>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-12 reveal">
              Our team of strategists, designers, and developers work collaboratively to transform your vision into reality—with precision, purpose, and a relentless focus on quality.
            </p>

            <div className="reveal">
              <Button variant="heroOutline" size="lg" asChild className="border-primary-foreground/20 text-primary-foreground hover:border-primary-foreground/40 hover:bg-primary-foreground/5">
                <Link to="/about" className="group">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="relative">
            {/* Decorative gradient */}
            <div className="absolute -inset-20 bg-gradient-ring opacity-10 blur-3xl rounded-full" />
            
            <div className="relative grid grid-cols-1 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="reveal p-8 rounded-3xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl lg:text-6xl font-semibold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/60 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
