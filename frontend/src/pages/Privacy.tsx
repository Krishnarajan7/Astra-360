import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Privacy Policy | ASTRA 360"
        description="Read ASTRA 360's privacy policy to understand how we collect, use, and protect your personal information."
        canonical="https://360astra.io/"
      />
      <Navigation />
      <main>
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <h1 className="text-display font-semibold text-foreground mb-8 animate-fade-up">
                Privacy <span className="text-gradient">Policy</span>
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
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company or organization name</li>
                  <li>Project details and requirements</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Deliver the services you request</li>
                  <li>Send you updates about our services (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances: with your consent, to comply with legal obligations, to protect our rights, or with service providers who assist us in operating our business (under strict confidentiality agreements).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us through our contact page or email us directly.
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

export default Privacy;