import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { Counter } from "@/components/ui/counter";
import { SEOHead } from "@/components/SEOHead";
import { Target, Heart, Lightbulb, Users, Award, Clock, Globe, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every pixel, every line of code, every strategy is crafted with meticulous attention to detail.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're driven by a genuine love for what we do and the impact it creates for our clients.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of trends, embracing new technologies and creative approaches.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside you, not just for you. Your success is our success.",
  },
];

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

const milestones = [
  { year: "2024", title: "Founded", description: "Started with a vision to bridge creativity and technology" },
  { year: "2024", title: "First Major Client", description: "Landed our first clothing brand partnership" },
  { year: "2024", title: "Team Expansion", description: "Grew to 10+ talented professionals" },
  { year: "2025", title: "25+ Projects", description: "Reached milestone of 25 successful projects" },
  { year: "2025", title: "Full-Stack Agency", description: "Expanded services to include hosting & SEO" },
  { year: "2025", title: "Global Reach", description: "Serving clients across 15+ countries" },
];

const About = () => {
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
        title="About Us | ASTRA 360 - Premium Digital Agency"
        description="Learn about ASTRA 360, a premium digital agency dedicated to building exceptional web experiences. 100+ projects delivered, 50+ happy clients, 5+ years of experience."
        canonical="https://360astra.io/"
      />
      <Navigation />
      <main ref={sectionRef}>
        {/* Hero */}
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block animate-fade-up">
                About Astra 360
              </span>
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up-delay-1">
                We craft digital
                <br />
                <span className="text-gradient">Excellence.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                A premium digital agency dedicated to building exceptional web experiences that transform brands and drive measurable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-astra-dark">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="reveal text-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} duration={2000} />
                  </p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="reveal">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                  Our Story
                </span>
                <h2 className="text-headline font-semibold text-foreground mb-8">
                  From vision to <span className="text-gradient">reality.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Astra 360 was founded with a singular vision: to bridge the gap between creative ambition and technical execution. We saw too many brands struggling with fragmented digital solutions and set out to create something different.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we're a team of strategists, designers, developers, and SEO specialists united by a shared commitment to excellence. We don't just deliver projects—we build partnerships and create lasting impact.
                </p>
              </div>
              <div className="reveal">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                  Our Philosophy
                </span>
                <h2 className="text-headline font-semibold text-foreground mb-8">
                  Simplicity meets <span className="text-gradient">power.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  We believe in the power of simplicity. In a world of noise, clarity wins. That's why we focus on creating clean, purposeful solutions that communicate effectively and perform flawlessly.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Quality isn't negotiable. From the first discovery call to final delivery, we maintain the highest standards—because your brand deserves nothing less.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 lg:py-32 bg-secondary/50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                Our Values
              </span>
              <h2 className="text-headline font-semibold text-foreground">
                What drives us <span className="text-gradient">forward.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="reveal text-center p-8 rounded-2xl bg-background/50 hover:bg-background transition-colors duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                Our Journey
              </span>
              <h2 className="text-headline font-semibold text-foreground">
                Growing <span className="text-gradient">together.</span>
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`reveal relative flex items-start gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Content */}
                    <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2 mt-1.5" />

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                  Why Astra 360
                </span>
                <h2 className="text-headline font-semibold text-foreground mb-6">
                  What sets us <span className="text-gradient">apart.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We combine technical expertise with creative thinking to deliver solutions that not only look stunning but also perform exceptionally. Every project is an opportunity to exceed expectations.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal">
                {[
                  { icon: Award, title: "Award-Winning", desc: "Recognized for design excellence and innovation" },
                  { icon: Clock, title: "On-Time Delivery", desc: "We respect deadlines and keep our promises" },
                  { icon: Globe, title: "Global Perspective", desc: "Working with clients across 15+ countries" },
                  { icon: Zap, title: "Fast & Efficient", desc: "Agile processes for quick turnaround times" },
                ].map((item, index) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-background" style={{ transitionDelay: `${index * 100}ms` }}>
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
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

export default About;