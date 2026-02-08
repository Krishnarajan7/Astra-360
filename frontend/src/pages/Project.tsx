import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, ExternalLink, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock project data - in a real app this would come from an API
const projectsData: Record<string, {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  results: string[];
  client: string;
  year: string;
  team: string;
  services: string[];
}> = {
  // Web Development Projects from Krish's Portfolio
  "bestpracticeway": {
  id: "bestpracticeway",
  title: (
    <>
      Best<span className="text-gradient">PracticeWay</span>
    </>
  ),
  category: "EdTech Platform",
  description: "Full-stack English learning platform",
  fullDescription:
    "BestPractice Way is a full-stack English learning platform focused on improving English communication skills through Speaking, Writing, Listening, Reading, and Mail-based practice modules. It delivers structured learning paths, real-world exercises, and performance tracking with a learner-centric experience.",
  image: "/bestpracticeway.png",
  results: [
    "Multi-module English skill development",
    "Real-world communication practice",
    "Scalable full-stack architecture"
  ],
  client: "BestPractice Way",
  year: "2026",
  team: "Solo Developer",
  services: [
    "Web Development",
    "EdTech Platform",
    "Language Learning System"
  ]
},
  "eduverse": {
    id: "eduverse",
    title: (
      <>
        Edu<span className="text-gradient">Verse</span>
      </>
    ),
    category: "Web Development",
    description: "Next-generation ERP system for educational institutions",
    fullDescription: "EduVerse is an innovative ERP system tailored for educational institutions, streamlining administrative tasks, student management, and communication. The platform offers a user-friendly interface, real-time analytics, and seamless integration with existing systems.",
    image: "/eduverse.png",
    results: ["5K+ users", "4.8 star rating", "50% time savings on admin tasks"],
    client: "EduVerse Inc.",
    year: "2026",
    team: "Solo Developer",
    services: ["Web Development", "ERP System", "SaaS Platform"]
  },
"pranitha-portfolio": {
  id: "pranitha-portfolio",
  title: (
    <>
      Pranitha<span className="text-gradient">Portfolio</span>
    </>
  ),
  category: "Web Development",
  description: "Space-inspired personal portfolio website",
  fullDescription:
    "Pranitha Portfolio is a visually striking, space-themed portfolio website developed for a client using Vite + React and Tailwind CSS. The site showcases projects, skills, and experience through a modern cosmic UI, smooth animations, and a fully responsive design, creating an engaging and professional online presence.",
  image: "/images/pranitha-portfolio.png",
  results: [
    "Modern space-themed UI",
    "Fully responsive design",
    "Improved personal branding"
  ],
  client: "Pranitha",
  year: "2026",
  team: "Solo Developer",
  services: [
    "Web Development",
    "UI/UX Design",
    "Portfolio Website"
  ]
}
,
  "growvest-academy": {
    id: "growvest-academy",
    title: (
      <>
        Growvest <span className="text-gradient">Academy</span>
      </>
    ),
    category: "Web Development",
    description: "Financial education platform for investment learning",
    fullDescription: "Growvest Academy is a specialized platform for financial education, helping users learn about investments, trading, and wealth management. The platform features structured courses, real-time market data integration, and personalized learning paths.",
    image: "/growvest.png",
    results: ["5K+ investors trained", "85% course completion", "Award-winning curriculum"],
    client: "Growvest",
    year: "2025",
    team: "Solo Developer",
    services: ["Web Development", "Financial Tools", "Educational Platform"]
  },
  "mimacademy": {
    id: "mimacademy",
    title: (
    <>
      MiM <span className="text-gradient">Academy</span>
    </>
  ),
    category: "Web Development",
    description: "Educational platform for music instruction and learning",
    fullDescription: "MiM Academy is a comprehensive educational platform designed for academic and career potential with personalized guidance. This platform provides comprehensive coaching for students, professional and parents",
    image: "/mimacademy.png",
    results: ["250+ active students", "98% satisfaction rate", "25+ courses available"],
    client: "MiM Academy",
    year: "2025",
    team: "1 specialist",
    services: ["Web Development", "UI/UX Design", "Learning Management System"]
  },

  "mimcraftlab": {
    id: "mimcraftlab",
    title: (
      <>
        MiM <span className="text-gradient">Craft Lab</span>
      </>
    ),
    category: "Web Development",
    description: "Custom 3D printing e-commerce platform",
    fullDescription: "MiM Craft Lab is a custom 3D printing e-commerce platform built for a UK-based client, enabling users to order personalized products with precision and flexibility. The platform focuses on performance, scalability, and a modern shopping experience tailored for custom manufacturing workflows.",
    image: "/images/mimcraft.png",
    results: ["Custom 3D Printing", "E-commerce Platform"],
    client: "MiM Craft Lab",
    year: "2026",
    team: "1 specialist",
    services: ["Web Development", "E-commerce Platform", "3D Printing Integration"]
  },

  "rightchoice-trust": {
    id: "rightchoice-trust",
    title: (
      <>
        RightChoice <span className="text-gradient">Trust</span>
      </>
    ),
    category: "Web Development",
    description: "Modern website for RightChoice Trust with responsive design",
    fullDescription: "RightChoice Trust is a modern, responsive website built using cutting-edge web technologies. The site features a clean, professional design that enhances user experience and accessibility across all devices.",
    image: "/images/Rightchoice.png",
    results: ["Responsive Design", "Fast Loading", "Modern UI"],
    client: "RightChoice Trust",
    year: "2025",
    team: "Solo Developer",
    services: ["Web Development", "Responsive Design", "Modern UI"]
  },

  "phoenix-data-consulting": {
    id: "phoenix-data-consulting",
    title: "Phoenix Data Consulting",
    category: "Web Development",
    description: "Professional consulting firm website with modern design",
    fullDescription: "A sophisticated corporate website for Phoenix Data Consulting, featuring an elegant design that communicates professionalism and expertise. The site includes service showcases, case studies, team profiles, and an integrated contact system.",
    image: "/pdc.png",
    results: ["150% lead increase", "40% lower bounce rate", "Professional brand image"],
    client: "Phoenix Data Consulting",
    year: "2025",
    team: "2 Specialists",
    services: ["Web Development", "Corporate Design", "SEO Optimization"]
  },
  "space-portfolio": {
    id: "space-portfolio",
    title: "Space Portfolio",
    category: "Web Development",
    description: "Creative portfolio website with space-themed design",
    fullDescription: "A visually stunning portfolio website featuring a space-themed design with immersive animations and 3D elements. The site showcases creative work through an engaging, interactive experience that leaves a lasting impression.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop",
    results: ["Unique visual identity", "Featured on Awwwards", "95% positive feedback"],
    client: "Creative Studio",
    year: "2025",
    team: "Solo Developer",
    services: ["Web Development", "Creative Design", "3D Animations"]
  },
  "halleyshop": {
    id: "halleyshop",
    title: "HalleyShop",
    category: "Web Development",
    description: "Modern e-commerce platform with seamless shopping experience",
    fullDescription: "HalleyShop is a full-featured e-commerce platform built for performance and conversion. Features include product catalogs, shopping cart, secure checkout, order management, and a responsive design optimized for all devices.",
    image: "halleyshop.png",
    results: ["50% conversion increase", "10K+ products", "99.9% uptime"],
    client: "HalleyShop",
    year: "2024",
    team: "5 specialists",
    services: ["E-commerce Development", "Payment Integration", "UI/UX Design"]
  },
  "ecommerce-platform": {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Enterprise-level e-commerce solution with advanced features",
    fullDescription: "We built a comprehensive e-commerce platform that handles thousands of transactions daily. The solution includes real-time inventory management, AI-powered product recommendations, and a seamless checkout experience optimized for conversion.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
    results: ["60% conversion rate increase", "2M+ monthly visitors", "99.9% uptime"],
    client: "TechRetail Inc.",
    year: "2024",
    team: "8 specialists",
    services: ["Web Development", "UI/UX Design", "Performance Optimization"]
  },
  "saas-dashboard": {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Real-time analytics dashboard for enterprise clients",
    fullDescription: "A powerful SaaS dashboard that provides real-time analytics and insights. Built with performance in mind, it handles massive datasets while maintaining a responsive and intuitive user interface.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop",
    results: ["40% increase in user engagement", "50% faster load times", "95% user satisfaction"],
    client: "DataFlow Systems",
    year: "2024",
    team: "6 specialists",
    services: ["Web Development", "Data Visualization", "API Integration"]
  },
  "corporate-website": {
    id: "corporate-website",
    title: "Corporate Website",
    category: "Web Development",
    description: "Modern corporate presence with exceptional performance",
    fullDescription: "A sleek, modern corporate website that establishes a strong digital presence. Featuring smooth animations, optimized performance, and a content management system for easy updates.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop",
    results: ["85% brand recognition increase", "3x organic traffic growth", "45% lower bounce rate"],
    client: "Horizon Enterprises",
    year: "2023",
    team: "5 specialists",
    services: ["Web Development", "Branding", "SEO Optimization"]
  },
  "social-campaign": {
    id: "social-campaign",
    title: "Social Campaign",
    category: "Digital Marketing",
    description: "Viral social media campaign with exceptional reach",
    fullDescription: "A multi-platform social media campaign that went viral, reaching millions of users organically. Strategic content planning combined with data-driven optimization delivered exceptional results.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&auto=format&fit=crop",
    results: ["10M+ impressions", "500K+ engagements", "200% follower growth"],
    client: "LifeStyle Brand",
    year: "2024",
    team: "4 specialists",
    services: ["Social Media Marketing", "Content Strategy", "Influencer Partnerships"]
  },
  "seo-strategy": {
    id: "seo-strategy",
    title: "SEO Strategy",
    category: "Digital Marketing",
    description: "Comprehensive SEO overhaul with measurable results",
    fullDescription: "A complete SEO transformation that took the client from page 5 to the top 3 results for their key terms. Technical SEO, content optimization, and link building combined for maximum impact.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&auto=format&fit=crop",
    results: ["300% organic traffic increase", "#1 ranking for 50+ keywords", "150% more leads"],
    client: "Growth Startup",
    year: "2024",
    team: "3 specialists",
    services: ["SEO Optimization", "Content Marketing", "Technical Audit"]
  },
  "email-marketing": {
    id: "email-marketing",
    title: "Email Marketing",
    category: "Digital Marketing",
    description: "High-converting email campaigns with personalization",
    fullDescription: "Developed a sophisticated email marketing system with advanced segmentation and personalization. Automated workflows nurture leads through the funnel with precision timing.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop",
    results: ["45% open rate", "12% click-through rate", "280% ROI"],
    client: "E-Commerce Plus",
    year: "2023",
    team: "3 specialists",
    services: ["Email Marketing", "Automation", "A/B Testing"]
  },
  "brand-film": {
    id: "brand-film",
    title: "Brand Film",
    category: "Video Production",
    description: "Cinematic brand storytelling that captivates",
    fullDescription: "A premium brand film that tells the company's story through stunning visuals and emotional storytelling. Shot on location with a professional crew, this film elevates the brand to new heights.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop",
    results: ["5M+ views", "Featured in 20+ publications", "Award-winning"],
    client: "Luxury Motors",
    year: "2024",
    team: "12 specialists",
    services: ["Video Production", "Cinematography", "Post-Production"]
  },
  "product-video": {
    id: "product-video",
    title: "Product Video",
    category: "Video Production",
    description: "Dynamic product showcase with stunning visuals",
    fullDescription: "A series of product videos that showcase every detail in stunning 4K quality. Dynamic camera movements and precise lighting highlight the product's premium qualities.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop",
    results: ["35% increase in conversions", "2M+ views across platforms", "Shared by 50+ influencers"],
    client: "TechGadget Co.",
    year: "2024",
    team: "8 specialists",
    services: ["Video Production", "Product Photography", "Motion Graphics"]
  },
  "motion-graphics": {
    id: "motion-graphics",
    title: "Motion Graphics",
    category: "Video Production",
    description: "Eye-catching animated content for digital platforms",
    fullDescription: "A comprehensive motion graphics package including explainer videos, social media content, and animated advertisements. Each piece is designed to grab attention and communicate clearly.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&auto=format&fit=crop",
    results: ["60% higher engagement", "Used in 100+ campaigns", "Reduced production time by 40%"],
    client: "SaaS Platform",
    year: "2023",
    team: "5 specialists",
    services: ["Motion Graphics", "Animation", "Sound Design"]
  },
  "brand-identity": {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Branding",
    description: "Complete visual identity system for modern brands",
    fullDescription: "A comprehensive brand identity that includes logo design, color palette, typography, iconography, and extensive brand guidelines. Every element works together to create a cohesive brand experience.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop",
    results: ["Brand recognition up 85%", "Consistent across 50+ touchpoints", "Award-nominated design"],
    client: "FinTech Startup",
    year: "2024",
    team: "6 specialists",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
  "logo-design": {
    id: "logo-design",
    title: "Logo Design",
    category: "Branding",
    description: "Iconic logo design that stands the test of time",
    fullDescription: "A timeless logo that captures the essence of the brand in a single mark. Through extensive research and iteration, we created a logo that is both memorable and versatile.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&auto=format&fit=crop",
    results: ["98% brand recall", "Scalable from favicon to billboard", "Featured in design publications"],
    client: "Wellness Brand",
    year: "2024",
    team: "3 specialists",
    services: ["Logo Design", "Icon Design", "Typography"]
  },
  "brand-guidelines": {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    category: "Branding",
    description: "Comprehensive guidelines for brand consistency",
    fullDescription: "A detailed brand guidelines document that ensures consistency across all touchpoints. From color usage to voice and tone, every aspect of the brand is documented and explained.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop",
    results: ["100% team adoption", "50% faster content creation", "Zero brand inconsistencies"],
    client: "Enterprise Corp",
    year: "2023",
    team: "4 specialists",
    services: ["Brand Guidelines", "Asset Library", "Training Materials"]
  }
};

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-40 pb-24">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-display font-semibold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/work")}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Work
            </Button>
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
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            
            <div className="max-w-4xl">
              <span className="text-sm font-medium text-primary uppercase tracking-widest mb-4 block animate-fade-up">
                {project.category}
              </span>
              <h1 className="text-display font-semibold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Image */}
        <section className="pb-16 lg:pb-24 bg-gradient-subtle">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl animate-fade-up" style={{ animationDelay: "300ms" }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-title font-semibold text-foreground mb-6">About the Project</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {project.fullDescription}
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">Services Provided</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">Key Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.results.map((result, index) => (
                    <div
                      key={index}
                      className="p-6 bg-secondary rounded-2xl text-center"
                    >
                      <Target className="w-6 h-6 text-primary mx-auto mb-3" />
                      <p className="font-semibold text-foreground">{result}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="p-6 bg-secondary rounded-2xl">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Project Details</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Client</p>
                        <p className="font-medium text-foreground">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Year</p>
                        <p className="font-medium text-foreground">{project.year}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Team Size</p>
                        <p className="font-medium text-foreground">{project.team}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <ExternalLink className="mr-2 w-4 h-4" />
                  View Live Project
                </Button>
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

export default Project;