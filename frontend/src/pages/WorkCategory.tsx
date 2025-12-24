import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Category data with projects
const categoriesData: Record<string, {
  title: string;
  description: string;
  projects: {
    id: string;
    title: React.ReactNode;
    description: string;
    image: string;
    results: string[];
  }[];
}> = {
  "web-development": {
    title: (
    <>
      Web <span className="text-gradient">Development</span>
    </>
  ),
    description: "Custom web solutions built with cutting-edge technologies for exceptional performance and user experience.",
    projects: [
      {
        id: "ecommerce-platform",
        title: "E-commerce Platform",
        description: "Enterprise-level e-commerce solution with advanced features",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        results: ["60% conversion increase", "2M+ monthly visitors"]
      },
      {
        id: "saas-dashboard",
        title: "SaaS Dashboard",
        description: "Real-time analytics dashboard for enterprise clients",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
        results: ["40% engagement boost", "50% faster loads"]
      },
      {
        id: "corporate-website",
        title: "Corporate Website",
        description: "Modern corporate presence with exceptional performance",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop",
        results: ["85% brand recognition", "3x traffic growth"]
      }
    ]
  },
  "digital-marketing": {
    title: (
  <>
    Digital<span className="text-gradient"> Marketing</span>
  </>
),
    description: "Strategic digital campaigns that drive engagement, conversions, and measurable business growth.",
    projects: [
      {
        id: "social-campaign",
        title: "Social Campaign",
        description: "Viral social media campaign with exceptional reach",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop",
        results: ["10M+ impressions", "500K+ engagements"]
      },
      {
        id: "seo-strategy",
        title: "SEO Strategy",
        description: "Comprehensive SEO overhaul with measurable results",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop",
        results: ["300% traffic increase", "#1 ranking"]
      },
      {
        id: "email-marketing",
        title: "Email Marketing",
        description: "High-converting email campaigns with personalization",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
        results: ["45% open rate", "280% ROI"]
      }
    ]
  },
  "video-production": {
    title: (
  <>
    Video <span className="text-gradient">Production</span>
  </>
),
    description: "Cinematic video content that tells your brand story and captivates your audience.",
    projects: [
      {
        id: "brand-film",
        title: "Brand Film",
        description: "Cinematic brand storytelling that captivates",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop",
        results: ["5M+ views", "Award-winning"]
      },
      {
        id: "product-video",
        title: "Product Video",
        description: "Dynamic product showcase with stunning visuals",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
        results: ["35% conversion lift", "2M+ views"]
      },
      {
        id: "motion-graphics",
        title: "Motion Graphics",
        description: "Eye-catching animated content for digital platforms",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop",
        results: ["60% higher engagement", "100+ campaigns"]
      }
    ]
  },
  "branding": {
    title: (
  <>
    Brand<span className="text-gradient">ing</span>
  </>
),
    description: "Comprehensive brand identity systems that create lasting impressions and build recognition.",
    projects: [
      {
        id: "brand-identity",
        title: "Brand Identity",
        description: "Complete visual identity system for modern brands",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop",
        results: ["85% recognition", "Award-nominated"]
      },
      {
        id: "logo-design",
        title: "Logo Design",
        description: "Iconic logo design that stands the test of time",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop",
        results: ["98% brand recall", "Featured in design pubs"]
      },
      {
        id: "brand-guidelines",
        title: "Brand Guidelines",
        description: "Comprehensive guidelines for brand consistency",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop",
        results: ["100% adoption", "50% faster creation"]
      }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const WorkCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = categoryId ? categoriesData[categoryId] : null;

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-40 pb-24">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl font-semibold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("/work")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate("/work")}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              All Work
            </motion.button>
            
            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-medium text-primary uppercase tracking-widest mb-4 block"
              >
                {category.projects.length} Projects
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight"
              >
                {category.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                {category.description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {category.projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/project/${project.id}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Arrow icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </div>
                      
                      {/* Results badges */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                        {project.results.map((result, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default WorkCategory;