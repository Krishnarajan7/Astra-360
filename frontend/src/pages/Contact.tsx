import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { RatingInteraction } from "@/components/ui/emoji-rating";
import { useSimpleToast } from "@/components/ui/simple-toast";
import { SEOHead } from "@/components/SEOHead";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const faqItems = [
  {
    id: "response",
    number: "01",
    title: "How quickly will you respond?",
    content: "We respond to all inquiries within 24 hours during business days. For urgent matters, we prioritize accordingly and will reach out as soon as possible.",
  },
  {
    id: "meeting",
    number: "02",
    title: "What happens in the first meeting?",
    content: "Our discovery call is a casual conversation where we learn about your business, goals, and challenges. We'll discuss your vision and explore how we can help bring it to life.",
  },
  {
    id: "remote",
    number: "03",
    title: "Do you work with remote clients?",
    content: "Absolutely! We work with clients worldwide. Our team is fully equipped for remote collaboration using modern tools and clear communication practices.",
  },
  {
    id: "start",
    number: "04",
    title: "What do I need to get started?",
    content: "Just fill out the contact form with some details about your project. The more context you provide, the better prepared we'll be for our initial conversation.",
  },
];


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const { showToast } = useSimpleToast();

  const handleRatingComplete = (rating) => {
    const messages = [
      "We're sorry to hear that. We'll work to improve!",
      "Thanks for your feedback. We'll do better!",
      "Thanks for rating us!",
      "Great! Thanks for the positive feedback!",
      "Awesome! We're thrilled you love it! 🎉"
    ];
    showToast(messages[rating - 1], rating >= 4 ? "success" : rating >= 3 ? "info" : "warning");
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Contact Us | ASTRA 360 - Get In Touch"
        description="Ready to start your project? Contact ASTRA 360 today. We respond within 24 hours. Let's create something exceptional together."
        canonical="https://360astra.io/"
      />
      <Navigation />
      <main ref={sectionRef}>
        {/* Hero */}
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block animate-fade-up">
                Get in Touch
              </span>
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up-delay-1">
                Let's create
                <br />
                <span className="text-gradient">Together.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-up-delay-2">
                Tell us about your project and we'll show you what's possible. We respond within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Form */}
              <div className="reveal">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="h-12 rounded-xl border-border/50 bg-secondary/50 focus:bg-background transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="h-12 rounded-xl border-border/50 bg-secondary/50 focus:bg-background transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="h-12 rounded-xl border-border/50 bg-secondary/50 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                      required
                      className="rounded-xl border-border/50 bg-secondary/50 focus:bg-background transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="reveal lg:pl-12">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-6">
                      <a
                        href="mailto:info@360astra.io"
                        className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span>info@360astra.io</span>
                      </a>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span>Available Worldwide</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      What to Expect
                    </h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-astra-teal mt-2.5" />
                        <span>Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-astra-teal mt-2.5" />
                        <span>Discovery call to understand your goals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-astra-teal mt-2.5" />
                        <span>Custom proposal tailored to your needs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-astra-teal mt-2.5" />
                        <span>Transparent pricing with no surprises</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Experience Section */}
        <Card className="content-section mb-12 border-none shadow-none ring-none">
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                <span className="text-gradient">How was your experience?</span>
              </p>
              <RatingInteraction onRatingComplete={handleRatingComplete} />
              <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <section className="py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                FAQ
              </span>
              <h2 className="text-headline font-semibold text-foreground">
                Common <span className="text-gradient">Questions.</span>
              </h2>
            </div>
            <div className="reveal">
              <UniqueAccordion items={faqItems} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
