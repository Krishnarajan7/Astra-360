import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { Code, TrendingUp, Video, Palette, Zap, Globe } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const faqItems = [
  {
    id: "timeline",
    number: "01",
    title: "What's the typical project timeline?",
    content: "Project timelines vary based on scope and complexity. A typical branding project takes 4-6 weeks, while web development projects range from 8-16 weeks. We'll provide a detailed timeline during our discovery phase.",
  },
  {
    id: "pricing",
    number: "02",
    title: "How do you price your services?",
    content: "We offer both project-based and retainer pricing models. After understanding your goals, we provide transparent, detailed proposals with no hidden costs. Every project includes a discovery phase to ensure accurate scoping.",
  },
  {
    id: "process",
    number: "03",
    title: "What does your process look like?",
    content: "Our process follows four key phases: Discovery (understanding your goals), Strategy (defining the approach), Execution (bringing ideas to life), and Optimization (refining for results). You'll have visibility and input at every stage.",
  },
  {
    id: "support",
    number: "04",
    title: "Do you offer ongoing support?",
    content: "Absolutely. We offer flexible retainer packages for ongoing support, maintenance, and continuous optimization. Many clients continue working with us long after their initial project is complete.",
  },
];

const services = [
  {
    icon: Code,
    title: "IT Solutions & Web Development",
    description: "From custom web applications to enterprise platforms, we build digital solutions that scale with your business.",
    features: ["Custom Web Applications", "E-commerce Platforms", "Cloud Infrastructure", "API Development", "Performance Optimization"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies that connect you with your audience and convert engagement into growth.",
    features: ["SEO & Content Strategy", "Social Media Management", "Email Marketing", "Analytics & Reporting", "Conversion Optimization"],
  },
  {
    icon: Zap,
    title: "Performance Advertising",
    description: "High-impact campaigns across all major platforms, optimized for maximum ROI and sustainable growth.",
    features: ["Google Ads Management", "Meta Advertising", "LinkedIn Campaigns", "Programmatic Buying", "Retargeting Strategies"],
  },
  {
    icon: Video,
    title: "Video & Motion",
    description: "Cinematic storytelling and dynamic motion graphics that captivate audiences and elevate brands.",
    features: ["Commercial Production", "Motion Graphics", "Social Video Content", "Brand Films", "Animation"],
  },
  {
    icon: Palette,
    title: "Branding & Creative",
    description: "Strategic brand development and visual identity systems that differentiate and resonate.",
    features: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Creative Direction", "Packaging Design"],
  },
  {
    icon: Globe,
    title: "Content Creation",
    description: "Compelling content that tells your story, engages your audience, and drives meaningful action.",
    features: ["Copywriting", "Photography", "Graphic Design", "Social Content", "Editorial"],
  },
];

const Services = () => {
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
      <Navigation />
      <main ref={sectionRef}>
        {/* Hero */}
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block animate-fade-up">
                Our Services
              </span>
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up-delay-1">
                Complete digital
                <br />
                <span className="text-gradient">solutions.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                From strategy to execution, we provide end-to-end services that drive real business results.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="reveal group p-8 lg:p-12 rounded-3xl bg-secondary/50 hover:bg-secondary transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-8 shadow-elegant group-hover:shadow-elegant-lg transition-shadow duration-500">
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-title font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-astra-teal mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 lg:py-32 bg-astra-dark text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-primary-foreground/60 uppercase tracking-widest mb-4 block">
                Our Process
              </span>
              <h2 className="text-headline font-semibold">
                How we <span className="text-gradient">work.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {["Discovery", "Strategy", "Execution", "Optimization"].map((step, index) => (
                <div
                  key={step}
                  className="reveal text-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl font-semibold text-gradient mb-4">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <div className="w-12 h-px bg-primary-foreground/20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <TestimonialsSection />

        {/* FAQ Section */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="reveal">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                  FAQ
                </span>
                <h2 className="text-headline font-semibold text-foreground mb-6">
                  Questions? <br />
                  <span className="text-gradient">We've got answers.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Everything you need to know about working with Astra 360. Can't find what you're looking for? Get in touch.
                </p>
              </div>
              <div className="reveal">
                <UniqueAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
