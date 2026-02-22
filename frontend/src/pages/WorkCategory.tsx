import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, ArrowUpRight, Instagram, ExternalLink, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Category data with projects
export const categoriesData: Record<string, {
  title: React.ReactNode;
  description: React.ReactNode;
  projects: {
    id: string;
    title: React.ReactNode;
    description: string;
    image?: string;
    videoUrl?: string;
    projectUrl?: string;
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
  id: "pranitha-portfolio",
  title: "Pranitha Portfolio",
  description: "A space-inspired portfolio website developed for a client using Vite + React and Tailwind CSS, featuring a sleek cosmic UI, smooth animations, and a fully responsive layout to showcase projects and skills.",
  image: "/images/pranitha-portfolio.png",
  results: ["Client Portfolio", "Space-Themed Design", "Responsive UI"]
}
,
         {
        id: "mimcraftlab",
        title: "MiM Craft Lab",
        description: "MiM Craft Lab is a custom 3D printing e-commerce platform built for a UK-based client, enabling users to order personalized products with precision and flexibility. The platform focuses on performance, scalability, and a modern shopping experience tailored for custom manufacturing workflows.",
        image: "/images/mimcraft.png",
        results: ["Custom 3D Printing", "E-commerce Platform"]
      },
      {
  id: "tntpo",
  title: "TNTPO",
  description: "TNTPO is the official website of the Tamil Nadu Training and Placement Officers Association, built to connect training and placement professionals across the state. The platform highlights the association’s objectives, member institutions, industry partnerships, and key initiatives through a clean and accessible interface.",
  image: "/images/tntpo.png",
  results: ["Training & Placement Network", "Statewide Professional Association"]
},

      {
        id: "bestpracticeway",
        title: "BestPracticeWay",
        description: "BestPractice Way is a full-stack English learning platform designed to improve communication skills across Speaking, Writing, Listening, Reading, and Mail-based practice modules. Built with a scalable architecture and learner-focused UX.",
        image: "/images/bestpracticeway.png",
        projectUrl: "https://bestpracticeway.com",
        results: ["Full-Stack English Learning", "Scalable Architecture"]
      },
      {
        id: "eduverse",
        title: "EduVerse",
        description: "Full-stack ERP system built using Python (Django REST API) for the backend and React with Tailwind CSS for the frontend.",
        image: "/images/eduverse.png",
        results: ["Full-Stack ERP", "Django + React"]
      },
      {
        id: "growvest-academy",
        title: "Growvest Academy",
        description: "A modern educational platform that teaches mutual fund investing and personal finance, built with React, Node.js, Tailwind CSS, and PostgreSQL.",
        image: "/images/growvest.png",
        results: ["Payment Integration", "PostgreSQL Backend"]
      },
      {
        id: "mimacademy",
        title: "MiMacademy",
        description: "A modern, responsive website for MiM Academy — a UK-based coaching institute. Built with clean UI/UX practices to showcase courses, testimonials, and contact information.",
        image: "/images/mimacademy.png",
        results: ["UK-based client", "Clean UI/UX"]
      },
      {
        id: "phoenix-data-consulting",
        title: "Phoenix Data Consulting",
        description: "Phoenix Data Consulting is a Next Gen IT solutions provider, built with React, Tailwind CSS, and Shadcn UI to deliver a modern, responsive, and accessible web experience.",
        image: "/images/pdc.png",
        results: ["IT Solutions", "Shadcn UI"]
      },
      {
        id: "space-portfolio",
        title: "Space Portfolio",
        description: "Personal portfolio built with React, Tailwind CSS, and JavaScript, featuring a sleek, space-inspired design with responsive UI and smooth animations.",
        image: "/images/krishportfolio.png",
        results: ["Space-inspired", "Smooth Animations"]
      },
      {
        id: "halleyshop",
        title: "HalleyShop",
        description: "Modern e-commerce platform with role-based access for customers and admins, secure authentication, and customer management. Built with Node.js, Express, Prisma, and JWT.",
        image: "/images/halleyshop.png",
        results: ["Role-based Access", "Prisma + JWT"]
      },
      {
      id: "rightchoice-trust",
      title: "RightChoice Trust",
      description: "Right Choice is built using modern web technologies like HTML, CSS, and JavaScript, ensuring a fast and responsive user experience.",
      image: "/images/Rightchoice.png",
      results: ["Modern Web Tech", "Responsive Design"] 
      },
    ]
  },
  "digital-marketing": {
    title: (
  <>
    Digital<span className="text-gradient"> Marketing</span>
  </>
),
    description: (
      <div className="space-y-8 animate-fade-up" style={{ animationDelay: "250ms" }}>
        <div className="p-1 px-4 rounded-full bg-primary/10 border border-primary/20 w-fit text-primary text-sm font-bold tracking-wider uppercase">
          Official Partnership
        </div>
        <p className="text-2xl md:text-3xl font-medium text-foreground leading-tight max-w-3xl">
          Astra 360 is the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-astra-teal font-bold italic">Official PR3 team digital marketing team</span>.
        </p>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          We manage the complete digital ecosystem for PR3, focusing on high-impact visual storytelling and seamless brand integration.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {[
            { label: "Video Production", desc: "Professional cinematic shoots" },
            { label: "Professional Editing", desc: "Expert post-production" },
            { label: "Content Making", desc: "Creative social strategy" }
          ].map((point) => (
            <div key={point.label} className="p-6 rounded-2xl bg-secondary/50 border border-border/50 group hover:border-primary/50 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground mb-1">{point.label}</h4>
              <p className="text-sm text-muted-foreground">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a 
            href="https://pr3.in/shop/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 scale-100 hover:scale-105 active:scale-95 font-semibold"
          >
            <ExternalLink className="w-5 h-5" />
            Visit PR3 Shop
          </a>
          <a 
            href="https://www.instagram.com/pr3.in_clothings?igsh=MTZnaWlsMGE1cGp5cA==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-secondary text-foreground rounded-full hover:bg-secondary/80 transition-all duration-300 border border-border shadow-sm hover:shadow-md scale-100 hover:scale-105 active:scale-95 font-semibold"
          >
            <Instagram className="w-5 h-5 text-[#E4405F]" />
            PR3 Instagram
          </a>
        </div>
      </div>
    ),
    projects: [
      {
        id: "pr3-showcase",
        title: "PR3 Official Showcase",
        description: "Behind the scenes and promotional content for PR3 Shop.",
        videoUrl: "/pr3/IMG_9738.mp4",
        results: ["Official Partner", "Visual Excellence", "Content Mastery"]
      },
      {
        id: "pr3-marketing",
        title: "PR3 Digital Marketing Team",
        description: "Comprehensive digital marketing and content strategy for the official PR3 team.",
        image: "https://pr3.in/shop/wp-content/uploads/2023/12/pr3-logo.png",
        results: ["Official Partner", "Content Excellence", "Brand Growth"]
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
        id: "brindha-ai",
        title: "Brindha AI & IT Solutions",
        description: "Innovative AI and IT solutions promo showcasing technological expertise.",
        videoUrl: "/videos/Brindha-AI.mp4",
        results: ["AI Showcase", "Tech Promo"]
      },
      {
        id: "brindha-makeup",
        title: "Brindha Makeup Artistry",
        description: "Stunning visual presentation of professional makeup artistry and style.",
        videoUrl: "/videos/Brindha-Makeup.mp4",
        results: ["Artist Showcase", "Visual Storytelling"]
      },
      {
        id: "vedha-clothing",
        title: "Vedha Clothing Promo",
        description: "Dynamic fashion and lifestyle promo for Vedha Clothing.",
        videoUrl: "/videos/Vedha-clothing-promo.mp4",
        results: ["Fashion Promo", "Brand Film"]
      },
      {
        id: "client-personal-work",
        title: "Client Personal Work",
        description: "High-quality personal project highlighting creative cinematography.",
        videoUrl: "/videos/Client-Personal-work.mp4",
        results: ["Creative Cinematography", "Personal Branding"]
      }
    ]
  },
  "branding": {
    title: (
  <>
    Brand<span className="text-gradient">ing</span>
  </>
),
    description: "Comprehensive brand identity systems that create lasting impressions including poster designs and logo templates.",
    projects: [
      {
        id: "cooking-ars-branding",
        title: "Cooking ARS Branding",
        description: "Complete branding for Cooking ARS including creative poster designs.",
        image: "/branding/Cooking-ARS.jpg",
        results: ["Poster Design", "Brand Identity"]
      },
      {
        id: "ars-offer-poster",
        title: "ARS Offer Campaigns",
        description: "Dynamic offer and promotion posters for ARS brand.",
        image: "/branding/ARS(offer).jpg",
        results: ["Promotion Design", "Poster Template"]
      },
      {
        id: "ars-saree-logo",
        title: "ARS Saree Collections",
        description: "Logo and branding elements for ARS Saree Collections.",
        image: "/branding/ARS(saree).jpg",
        results: ["Logo Design", "Traditional Branding"]
      },
      {
        id: "mimcraft-branding",
        title: "MiM Craft Lab Identity",
        description: "Full brand identity and guidelines for MiM Craft Lab.",
        image: "/images/mimcraft.png",
        projectUrl: "/branding/MimCraft.pdf",
        results: ["Brand Guidelines", "Visual Identity"]
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
              {categoryId !== "digital-marketing" && (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm font-medium text-primary uppercase tracking-widest mb-4 block"
                >
                  {category.projects.length} Projects
                </motion.span>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight"
              >
                {category.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                {category.description}
              </motion.div>
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
              className={`grid gap-6 lg:gap-8 ${
                category.projects.length === 1 
                  ? "grid-cols-1 max-w-2xl" 
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
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
                      {project.videoUrl ? (
                        <video
                          src={project.videoUrl}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          onMouseOver={(e) => e.currentTarget.play()}
                          onMouseOut={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={typeof project.title === 'string' ? project.title : 'Project Image'}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
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