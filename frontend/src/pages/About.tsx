import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

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
                <span className="text-gradient">excellence.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                A premium digital agency dedicated to building exceptional experiences that transform brands and drive measurable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="reveal">
                <h2 className="text-headline font-semibold text-foreground mb-8">
                  Our Story
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Astra 360 was founded with a singular vision: to bridge the gap between creative ambition and technical execution. We saw too many brands struggling with fragmented digital solutions and set out to create something different.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we're a team of strategists, designers, developers, and storytellers united by a shared commitment to excellence. We don't just deliver projects—we build partnerships and create lasting impact.
                </p>
              </div>
              <div className="reveal">
                <h2 className="text-headline font-semibold text-foreground mb-8">
                  Our Philosophy
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
                What drives us forward.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="reveal text-center p-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mx-auto mb-6 shadow-elegant">
                    <value.icon className="w-7 h-7 text-foreground" />
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

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
