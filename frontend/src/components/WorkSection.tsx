import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "TechFlow Platform",
    category: "Web Development",
    description: "Enterprise SaaS dashboard with real-time analytics",
    gradient: "from-astra-teal/20 to-astra-purple/20",
  },
  {
    title: "Nexus Brand Campaign",
    category: "Digital Marketing",
    description: "360° launch campaign with 300% ROI increase",
    gradient: "from-astra-orange/20 to-astra-teal/20",
  },
  {
    title: "Velocity Motion",
    category: "Video Production",
    description: "Cinematic product reveal for automotive brand",
    gradient: "from-astra-purple/20 to-astra-orange/20",
  },
];

export const WorkSection = () => {
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 reveal">
          <div className="max-w-2xl mb-8 lg:mb-0">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
              Selected Work
            </span>
            <h2 className="text-headline font-semibold text-foreground">
              Projects that speak for themselves.
            </h2>
          </div>
          <Button variant="minimal" size="lg" asChild>
            <Link to="/work" className="group">
              View All Work
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Link
              to="/work"
              key={project.title}
              className="reveal group relative overflow-hidden rounded-3xl bg-secondary aspect-[4/5] p-8 flex flex-col justify-end hover-lift cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-title font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-500">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {project.description}
                </p>
                <div className="flex items-center text-sm font-medium text-foreground">
                  <span>View Project</span>
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
