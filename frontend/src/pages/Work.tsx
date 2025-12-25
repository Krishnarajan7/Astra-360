import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowUpRight } from "lucide-react";
import { PortfolioFolders } from "@/components/PortfolioFolders";
import { SEOHead } from "@/components/SEOHead";

const projects = [
  {
    title: "TechFlow Platform",
    category: "Web Development",
    description: "Enterprise SaaS dashboard with real-time analytics and seamless user experience.",
    results: "40% increase in user engagement",
    gradient: "from-astra-teal/20 to-astra-purple/20",
  },
  {
    title: "Nexus Brand Campaign",
    category: "Digital Marketing",
    description: "Comprehensive 360° launch campaign across all digital touchpoints.",
    results: "300% ROI improvement",
    gradient: "from-astra-orange/20 to-astra-teal/20",
  },
  {
    title: "Velocity Motion",
    category: "Video Production",
    description: "Cinematic product reveal film for premium automotive brand launch.",
    results: "2M+ organic views",
    gradient: "from-astra-purple/20 to-astra-orange/20",
  },
  {
    title: "Horizon Rebrand",
    category: "Branding",
    description: "Complete visual identity overhaul for fintech startup entering new markets.",
    results: "Brand recognition up 85%",
    gradient: "from-astra-teal/30 to-astra-purple/10",
  },
  {
    title: "Pulse E-commerce",
    category: "Web Development",
    description: "High-performance e-commerce platform with custom checkout experience.",
    results: "60% conversion rate increase",
    gradient: "from-astra-purple/20 to-astra-teal/30",
  },
  {
    title: "Atlas Performance",
    category: "Performance Ads",
    description: "Multi-channel advertising strategy for B2B software company.",
    results: "Cost per acquisition reduced 45%",
    gradient: "from-astra-orange/30 to-astra-purple/20",
  },
];

const Work = () => {
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
    <div className="min-h-screen">
      <SEOHead 
        title="Our Work | ASTRA 360 - Portfolio & Case Studies"
        description="Explore our portfolio of successful projects. From web development to digital marketing campaigns, see how we deliver measurable results for ambitious brands."
        canonical="https://astra360.com/work"
      />
      <Navigation />
      <main ref={sectionRef}>
        {/* Hero */}
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block animate-fade-up">
                Our Work
              </span>
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up-delay-1">
                Projects that
                <br />
                <span className="text-gradient">Deliver Results.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                A selection of our work across industries, demonstrating our commitment to excellence and measurable impact.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="reveal group relative overflow-hidden rounded-3xl bg-secondary aspect-[4/3] p-8 lg:p-12 flex flex-col justify-end hover-lift cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-title font-semibold text-foreground mb-3 group-hover:text-gradient transition-all duration-500">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-astra-teal">
                        {project.results}
                      </span>
                      <div className="flex items-center text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>View Case Study</span>
                        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Folders */}
                <section className="py-24 lg:py-32 bg-secondary/30">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16 reveal">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                        Browse By Category
                      </span>
                      <h2 className="text-headline font-semibold text-foreground">
                        Explore our <span className="text-gradient">Expertise.</span>
                      </h2>
                    </div>
                    <PortfolioFolders className="reveal" />
                  </div>
                </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Work;
