import { useEffect, useRef } from "react";
import { Code, TrendingUp, Video, Palette, Zap } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "IT Solutions",
    description: "Custom web development, cloud infrastructure, and scalable digital platforms built for performance.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven campaigns, SEO optimization, and performance advertising that delivers measurable ROI.",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Cinematic storytelling, motion graphics, and commercial content that captivates audiences.",
  },
  {
    icon: Palette,
    title: "Creative Strategy",
    description: "Brand identity, visual systems, and strategic positioning that differentiates and elevates.",
  },
  {
    icon: Zap,
    title: "Performance Ads",
    description: "High-converting ad campaigns across all major platforms, optimized for growth and efficiency.",
  },
];

export const ServicesSection = () => {
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
    <section ref={sectionRef} className="py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-20 reveal">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="text-headline font-semibold text-foreground mb-6">
            Comprehensive digital solutions for modern brands.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            We combine technical expertise with creative vision to deliver results that matter.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal group p-8 lg:p-10 rounded-3xl bg-secondary/50 hover:bg-secondary transition-all duration-500 hover-lift cursor-default"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 shadow-elegant group-hover:shadow-elegant-lg transition-shadow duration-500">
                <service.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-title font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
