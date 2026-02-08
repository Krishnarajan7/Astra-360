import { Link } from "react-router-dom";
import { SocialIcons } from "@/components/ui/social-icons";

export const Footer = () => {
  return (
    <footer className="bg-astra-dark text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-ring rounded-full animate-spin-slow opacity-80" />
                <div className="absolute inset-[3px] bg-astra-navy rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold tracking-tight text-primary-foreground">A</span>
                </div>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                ASTRA<span className="opacity-60 font-normal"> 360</span>
              </span>
            </Link>
            <p className="text-primary-foreground/60 max-w-md leading-relaxed mb-8">
              We craft digital experiences that transform brands and drive measurable growth. Premium solutions for ambitious companies.
            </p>
            
            {/* Social Icons */}
            <SocialIcons />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 opacity-60">
              Navigation
            </h3>
            <ul className="space-y-4">
              {["About", "Services", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 opacity-60">
              Services
            </h4>
            <ul className="space-y-4">
              {["IT Solutions", "Digital Marketing", "Video Production", "Branding"].map((item) => (
                <li key={item}>
                  <span className="text-primary-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} Astra 360. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors">
              Terms
            </Link>
          </div>
        </div>
        {/* Creator Credit */}
        <div className="mt-6 pb-20 md:pb-0 text-center">
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
</div>

      </div>
    </footer>
  );
};