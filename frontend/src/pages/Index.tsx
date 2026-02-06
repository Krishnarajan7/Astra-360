import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GlowingServicesGrid } from "@/components/GlowingServicesGrid";
import { PortfolioFolders } from "@/components/PortfolioFolders";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { CTASection } from "@/components/CTASection";
import { Pricing } from "@/components/ui/pricing";
import { Footer } from "@/components/Footer";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SEOHead } from "@/components/SEOHead";


export const pricingPlans = [
  {
    name: "Static Website",
    price: "2999",
    features: [
      "Up to 5 static pages (Home, About, Services, Gallery, Contact)",
      "Mobile responsive design",
      "Basic on-page SEO setup",
      "Contact form / WhatsApp button integration",
      "Domain & hosting setup support",
    ],
    description:
      "Perfect for startups and local businesses that need a clean, fast, professional online presence.",
    buttonText: "Get Static Website",
    href: "/contact",
    isPopular: false,
  },
  {
    name: "E-commerce Website",
    price: "19999",
    features: [
      "Up to 50 products setup",
      "Modern storefront UI/UX",
      "Categories, filters & search",
      "Payment gateway (Razorpay / Paytm)",
      "Order management dashboard",
      "Coupons, discounts & GST invoicing (basic)",
    ],
    description:
      "Best for brands that want to sell online with secure payments and smooth order management.",
    buttonText: "Start Selling Online",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "Custom Solution",
    price: "Custom",
    features: [
      "Fully custom features & workflows",
      "Custom UI/UX design system",
      "Scalable cloud-ready architecture",
      "Advanced API integrations (CRM, ERP, Payments)",
      "Performance optimization & security hardening",
      "Dedicated account manager & priority support",
    ],
    description:
      "For serious businesses that need fully custom platforms, portals, or high-scale solutions.",
    buttonText: "Book a Strategy Call",
    href: "/contact",
    isPopular: false,
  },
];


const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="ASTRA 360 | Premium Digital Marketing & IT Solutions Agency"
        description="ASTRA 360 is a premium digital agency specializing in web development, SEO optimization, app development, and digital marketing. We build exceptional digital experiences that drive measurable growth."
        canonical="https://360astra.io/"
      />
      <Navigation />
      <main>
        <HeroSection />
        
        {/* Glowing Services Section */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                What We Do
              </span>
              <h2 className="text-headline font-semibold text-foreground mb-6">
                Complete digital <span className="text-gradient">Solutions.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From strategy to execution, we provide end-to-end services that drive real business results.
              </p>
            </div>
            <GlowingServicesGrid />
          </div>
        </section>

        {/* Portfolio Folders Section */}
        <section className="py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                Our Work
              </span>
              <h2 className="text-headline font-semibold text-foreground mb-6">
                Explore our <span className="text-gradient">Portfolio.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hover over each folder to preview our latest projects across different categories.
              </p>
            </div>
            {/* Reduced padding for moderate card pop-out */}
            <div className="pt-12 sm:pt-16">
              <PortfolioFolders />
            </div>
          </div>
        </section>

        <AboutSection />
        <WorkSection />
        <TestimonialsSection />
        <Pricing plans={pricingPlans} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
