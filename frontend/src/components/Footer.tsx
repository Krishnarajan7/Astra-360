import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Instagram, Github } from "lucide-react";

const coreServices = [
  { label: "Custom Web Development", href: "/services" },
  { label: "App Development", href: "/services" },
  { label: "SEO Optimization", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
  { label: "Web Hosting & Infrastructure", href: "/services" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-astra-dark text-white overflow-hidden">
      {/* Hero CTA Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-10 md:p-16 text-center">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-astra-teal/10 via-astra-purple/10 to-astra-orange/10 rounded-full blur-[120px] pointer-events-none" />
          
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-4">Ready to start?</p>
          <h3 className="relative text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8">
            Let's build something <span className="text-gradient">Remarkable.</span>
          </h3>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 rounded-full p-[2px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, hsl(var(--astra-teal)), hsl(var(--astra-purple)), hsl(var(--astra-orange)))"
            }}
          >
            <span className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0a0f1e] font-semibold text-sm group-hover:bg-white/95 transition-colors">
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 pb-14">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* Brand Column */}
          <div className="lg:max-w-xs shrink-0">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-ring rounded-full animate-spin-slow opacity-80" />
                <div className="absolute inset-[3px] bg-astra-navy rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold tracking-tight text-white">A</span>
                </div>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                ASTRA<span className="opacity-60 font-normal"> 360</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed text-sm mb-8">
              We craft digital experiences that transform brands and drive measurable growth.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-12">
            {/* Core Services */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 text-white/30">
                Services
              </h4>
              <ul className="space-y-3">
                {coreServices.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 text-white/30">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 text-white/30">
                Stay Updated
              </h4>
              <p className="text-sm text-white/40 mb-4 leading-relaxed">
                Digital trends, straight to your inbox.
              </p>
              <div className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all duration-300"
                />
                <button
                  className="group relative w-full rounded-xl p-[1.5px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--astra-teal)), hsl(var(--astra-purple)), hsl(var(--astra-orange)))"
                  }}
                >
                  <span className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[10px] bg-white text-[#0a0f1e] text-sm font-semibold group-hover:bg-white/95 transition-colors">
                    Subscribe
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </div>

              {/* Contact shortcuts */}
              <div className="mt-6 space-y-2.5">
                <a href="mailto:hello@astra360.com" className="flex items-center gap-2.5 text-xs text-white/35 hover:text-white/60 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  info@360astra.com
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2.5 text-xs text-white/35 hover:text-white/60 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +91 9345280327
                </a>
                <span className="flex items-center gap-2.5 text-xs text-white/35">
                  <MapPin className="w-3.5 h-3.5" />
                  Global · Remote First
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Status dot */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-astra-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-astra-teal"></span>
              </span>
              <p className="text-[11px] text-white/25">
                © {new Date().getFullYear()} Astra 360 · All systems operational
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">Terms</Link>
              <Link to="/sitemap" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">Sitemap</Link>
            </div>
          </div>
          {/* Creator Credit */}
        {/* <div className="mt-6 pb-20 md:pb-0 text-center">
  <p className="text-xs text-primary-foreground/30">
    Cooked by{" "}
   <a
  href="https://krish-dev-portfolio.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="
    font-signature
    text-lg
    text-primary-foreground/60
    drop-shadow-[0_0.4px_0_currentColor]
    hover:text-primary-foreground/90
    transition-colors
  "
>
  &nbsp;KriSh 🤍
</a>
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};
