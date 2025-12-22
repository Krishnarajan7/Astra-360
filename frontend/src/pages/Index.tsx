import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GlowingServicesGrid } from "@/components/GlowingServicesGrid";
import { PortfolioFolders } from "@/components/PortfolioFolders";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
                Complete digital <span className="text-gradient">solutions.</span>
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
                Explore our <span className="text-gradient">portfolio.</span>
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
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
