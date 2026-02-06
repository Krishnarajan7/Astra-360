import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Terms of Service | ASTRA 360"
        description="Read ASTRA 360's terms of service to understand the rules and regulations governing the use of our services."
        canonical="https://360astra.io/"
      />
      <Navigation />
      <main>
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up">
                Terms of <span className="text-gradient">Service</span>
              </h1>
              <p className="text-muted-foreground animate-fade-up-delay-1">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl space-y-12">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using ASTRA 360's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ASTRA 360 provides digital services including but not limited to web development, digital marketing, video production, branding, SEO optimization, and IT solutions. The specific scope of services will be outlined in individual project agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Client Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide accurate and complete information as required</li>
                  <li>Respond to requests for feedback or approvals in a timely manner</li>
                  <li>Ensure you have the rights to any materials you provide</li>
                  <li>Make payments according to agreed terms</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement. ASTRA 360 retains the right to display completed work in our portfolio unless otherwise agreed. Pre-existing intellectual property, third-party assets, and proprietary tools remain the property of their respective owners.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Payment terms will be specified in individual project agreements. Generally, projects require an upfront deposit before work begins. Final payment is due upon project completion or as outlined in the agreement. Late payments may incur additional fees.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Revisions and Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each project includes a specified number of revision rounds as outlined in the project agreement. Additional revisions beyond the agreed scope may incur extra charges. Major changes to project scope may require a separate agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ASTRA 360 shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate a project agreement with written notice. In case of termination, the client is responsible for payment of all work completed up to the termination date. Deposits are non-refundable unless otherwise specified.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This obligation survives the termination of our business relationship.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us through our contact page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;