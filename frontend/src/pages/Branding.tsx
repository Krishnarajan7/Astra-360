import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, Play, Palette, PenTool, Layers, BookOpen, Brush, Figma } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

type BrandingItem = {
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  category: string;
  aspectRatio?: "portrait" | "landscape" | "square";
};

const services = [
  {
    icon: PenTool,
    title: "Logo Design",
    description: "Iconic, memorable logos that represent your brand's core identity and values.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete visual identity systems — colors, typography, patterns, and brand voice.",
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    description: "Comprehensive brand manuals ensuring consistency across all touchpoints.",
  },
  {
    icon: Layers,
    title: "Poster & Print Design",
    description: "Eye-catching posters, flyers, business cards, and all print collateral.",
  },
  {
    icon: Brush,
    title: "Social Media Creatives",
    description: "Scroll-stopping graphics and templates designed for every social platform.",
  },
  {
    icon: Figma,
    title: "Packaging Design",
    description: "Product packaging that stands out on shelves and creates unboxing moments.",
  },
];

const stats = [
  { value: "30+", label: "Brands Designed" },
  { value: "200+", label: "Creatives Delivered" },
  { value: "100%", label: "Client Retention" },
  { value: "15+", label: "Logo Designs" },
];

// Portfolio items — mix of vertical posters and videos
const portfolioItems: BrandingItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop",
    title: "Fashion Brand Identity",
    description: "Complete brand identity for a fashion label",
    category: "Brand Identity",
    aspectRatio: "portrait",
  },
  {
    type: "video",
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop",
    title: "Logo Reveal Animation",
    description: "Animated logo reveal for brand launch",
    category: "Logo Design",
    aspectRatio: "square",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop",
    title: "Brand Guidelines Book",
    description: "Comprehensive brand manual design",
    category: "Guidelines",
    aspectRatio: "landscape",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop",
    title: "Fashion Poster Series",
    description: "Seasonal poster designs for Vedha Clothing",
    category: "Poster Design",
    aspectRatio: "portrait",
  },
  {
    type: "video",
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    title: "Brand Story Video",
    description: "Brand storytelling motion video",
    category: "Motion Design",
    aspectRatio: "landscape",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
    title: "Beauty Brand Poster",
    description: "Promotional poster for Brindha Makeup Artist",
    category: "Poster Design",
    aspectRatio: "portrait",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop",
    title: "Product Packaging",
    description: "Modern packaging design concept",
    category: "Packaging",
    aspectRatio: "square",
  },
  {
    type: "video",
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop",
    title: "Social Media Promo",
    description: "Animated social media creative",
    category: "Social Creatives",
    aspectRatio: "portrait",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&auto=format&fit=crop",
    title: "Event Invitation Design",
    description: "Premium event invitation and poster design",
    category: "Print Design",
    aspectRatio: "portrait",
  },
];

const aspectClasses: Record<string, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-video",
  square: "aspect-square",
};

const HoverCard = ({ item }: { item: BrandingItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (item.type === "video" && item.src && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (item.type === "video" && item.src && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [item]);

  const ratio = aspectClasses[item.aspectRatio || "portrait"];
  const displaySrc = item.type === "video" ? item.thumbnail : item.src;

  return (
    <motion.div
      variants={itemVariants}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative ${ratio} rounded-2xl overflow-hidden bg-secondary`}>
        {item.type === "video" && item.src ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.thumbnail}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted
          />
        ) : (
          <img
            src={displaySrc}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Play overlay for videos */}
        {item.type === "video" && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovering ? "bg-black/10" : "bg-black/30"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
            {item.category}
          </span>
        </div>

        {/* Info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h4 className="text-white font-semibold text-sm">{item.title}</h4>
          <p className="text-white/70 text-xs mt-1">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Branding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-[hsl(var(--astra-purple)/0.08)] to-[hsl(var(--astra-teal)/0.08)] rounded-full blur-3xl" />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                transition={{ duration: 0.6, delay: 0.1 }}
                className="px-4 py-1.5 rounded-full bg-[hsl(var(--astra-purple)/0.1)] text-[hsl(var(--astra-purple))] text-sm font-semibold tracking-wide uppercase mb-6 inline-block"
              >
                Branding & Design
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight leading-[1.1]"
              >
                Designs That <br />
                <span className="text-gradient">Leave a Mark</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                From logos and brand identities to vertical posters and social creatives — we craft 
                visual experiences that make brands unforgettable.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">What We Design</h2>
              <p className="text-muted-foreground max-w-xl">
                Every visual asset your brand needs — from identity systems to social-ready creatives.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="p-6 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--astra-purple)/0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-[hsl(var(--astra-purple))]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio — Masonry layout for mixed ratios */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Our Work</h2>
              <p className="text-muted-foreground max-w-xl">
                Vertical posters, brand assets, and animated creatives — hover to preview videos.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {portfolioItems.map((item, i) => (
                <div key={i} className="break-inside-avoid">
                  <HoverCard item={item} />
                </div>
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

export default Branding;
