import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { PortfolioFolders } from "@/components/PortfolioFolders";
import { 
  Code, 
  TrendingUp, 
  Server, 
  Smartphone, 
  Search, 
  Shield, 
  Rocket, 
  Palette,
  Database,
  Cloud,
  Wrench,
  LineChart
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const faqItems = [
  {
    id: "timeline",
    number: "01",
    title: "What's the typical project timeline?",
    content: "Project timelines vary based on scope and complexity. A landing page takes 1-2 weeks, a full website 4-8 weeks, and custom web applications 8-16 weeks. We'll provide a detailed timeline during our discovery phase.",
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
    id: "hosting",
    number: "04",
    title: "Do you provide hosting and maintenance?",
    content: "Yes! We offer managed hosting solutions with 99.9% uptime guarantee, SSL certificates, daily backups, and 24/7 monitoring. Our maintenance packages include security updates, performance optimization, and content updates.",
  },
  {
    id: "seo",
    number: "05",
    title: "Will my website be optimized for search engines?",
    content: "Absolutely. Every website we build includes on-page SEO optimization, including meta tags, schema markup, site speed optimization, mobile responsiveness, and proper URL structures. We also offer ongoing SEO services.",
  },
  {
    id: "support",
    number: "06",
    title: "Do you offer ongoing support?",
    content: "We offer flexible retainer packages for ongoing support, maintenance, and continuous optimization. Many clients continue working with us long after their initial project is complete.",
  },
];

const services = [
  {
    icon: Code,
    title: "Custom Web Development",
    description: "Bespoke websites and web applications built with modern technologies for performance, scalability, and exceptional user experience.",
    features: ["React & Next.js Development", "Custom CMS Solutions", "Progressive Web Apps", "Responsive Design", "API Integration"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across iOS and Android devices.",
    features: ["iOS & Android Apps", "React Native Development", "App Store Optimization", "Push Notifications", "Offline Functionality"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies that improve your search rankings, drive organic traffic, and increase conversions.",
    features: ["Technical SEO Audits", "Keyword Research & Strategy", "On-Page Optimization", "Link Building", "Local SEO"],
  },
  {
    icon: Server,
    title: "Web Hosting & Infrastructure",
    description: "Enterprise-grade hosting solutions with 99.9% uptime, automated backups, and lightning-fast performance.",
    features: ["Managed Cloud Hosting", "SSL Certificates", "CDN Integration", "Daily Backups", "24/7 Monitoring"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Comprehensive marketing strategies that connect you with your audience and convert engagement into measurable growth.",
    features: ["PPC Campaigns", "Social Media Marketing", "Email Marketing", "Content Strategy", "Analytics & Reporting"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality to create intuitive, engaging digital experiences.",
    features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Design Systems", "Usability Testing"],
  },
  {
    icon: Database,
    title: "Database & Backend",
    description: "Robust backend architecture and database solutions that power your applications with reliability and speed.",
    features: ["Database Design", "API Development", "Cloud Functions", "Data Migration", "Performance Tuning"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Comprehensive security solutions to protect your digital assets and ensure regulatory compliance.",
    features: ["Security Audits", "GDPR Compliance", "SSL Implementation", "Vulnerability Testing", "Data Encryption"],
  },
];

type Tech = {
  name: string;
  category: string;
  logo: string;
};

const techStack: Tech[] = [
  { name: "React",       category: "Frontend",   logo: "/logos/react.png" },
  { name: "Node.js",     category: "Backend",    logo: "/logos/node.png" },
  { name: "Python",       category: "Backend",   logo: "/logos/python.png" },
  { name: "PHP",       category: "Backend",   logo: "/logos/php.png" },
  { name: "Django",       category: "Backend",   logo: "/logos/django.svg" },
  { name: "Next.js",     category: "Framework",  logo: "/logos/nextjs.svg" },
  { name: "TypeScript",  category: "Language",   logo: "/logos/typescript.png" },
  { name: "PostgreSQL",  category: "Database",   logo: "/logos/postgres.png" },
  { name: "AWS",         category: "Cloud",      logo: "/logos/aws.png" },
  { name: "Hostinger",         category: "Hosting",      logo: "/logos/hostinger.svg" },
  { name: "Vercel",      category: "Hosting",    logo: "/logos/vercel.svg" },
  { name: "Figma",       category: "Design",     logo: "/logos/figma.png" },
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
      <SEOHead 
        title="Services | ASTRA 360 - Web Development, SEO & App Development"
        description="Explore our comprehensive digital services including custom web development, SEO optimization, app development, web hosting, UI/UX design, and digital marketing solutions."
        canonical="https://360astra.io/"
      />
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
                Full-stack digital
                <br />
                <span className="text-gradient">Solutions.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                From web development and SEO to hosting and app development — we provide end-to-end services that power your digital success.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                What We Offer
              </span>
              <h2 className="text-headline font-semibold text-foreground">
                Comprehensive <span className="text-gradient">Web Services.</span>
              </h2>
            </div>
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

        {/* Tech Stack – Updated with Logos */}
        <section className="py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                Technology Stack
              </span>
              <h2 className="text-headline font-semibold text-foreground">
                Built with <span className="text-gradient">Modern Tools.</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                We use industry-leading technologies to build fast, secure, and scalable solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 reveal">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-elegant transition-all duration-300 text-center flex flex-col items-center justify-center"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="h-10 mx-auto mb-4 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="text-xs text-muted-foreground">
                    {tech.category}
                  </p>
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
              {[
                { step: "Discovery", desc: "Understanding your goals, audience, and requirements" },
                { step: "Strategy", desc: "Defining the technical approach and project roadmap" },
                { step: "Execution", desc: "Building and iterating with continuous feedback" },
                { step: "Optimization", desc: "Refining for performance, SEO, and conversions" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="reveal text-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl font-semibold text-gradient mb-4">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.step}</h3>
                  <p className="text-sm text-primary-foreground/70">{item.desc}</p>
                  <div className="w-12 h-px bg-primary-foreground/20 mx-auto mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="text-headline font-semibold text-foreground mb-6">
                  Your success is <br />
                  <span className="text-gradient">our priority.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We don't just build websites — we build digital experiences that drive real business results. Our approach combines technical excellence with strategic thinking.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal">
                {[
                  { icon: Rocket, title: "Fast Delivery", desc: "Agile development with quick turnaround times" },
                  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security and 99.9% uptime" },
                  { icon: Wrench, title: "Ongoing Support", desc: "Dedicated maintenance and support packages" },
                  { icon: LineChart, title: "Results-Driven", desc: "Data-backed decisions for measurable growth" },
                ].map((item, index) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-secondary/50" style={{ transitionDelay: `${index * 100}ms` }}>
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
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