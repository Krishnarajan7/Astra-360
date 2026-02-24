import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, Play, Film, Clapperboard, MonitorPlay, Sparkles, Video } from "lucide-react";
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

type VideoItem = {
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  aspectRatio?: "landscape" | "portrait" | "square" | "ultrawide";
};

const services = [
  {
    icon: Film,
    title: "Brand Films",
    description: "Cinematic storytelling that captures your brand essence and connects emotionally with your audience.",
  },
  {
    icon: Clapperboard,
    title: "Product Videos",
    description: "Dynamic product showcases with stunning visuals that drive conversions and highlight features.",
  },
  {
    icon: MonitorPlay,
    title: "Social Media Reels",
    description: "Short-form, scroll-stopping video content optimized for Instagram, YouTube Shorts, and TikTok.",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description: "Eye-catching animated content, logo reveals, and explainer videos for digital platforms.",
  },
  {
    icon: Video,
    title: "Event Coverage",
    description: "Professional event videography with cinematic editing, highlights, and recap videos.",
  },
  {
    icon: Play,
    title: "Ad Commercials",
    description: "High-impact commercial videos for Meta, Google, and YouTube ad campaigns.",
  },
];

const stats = [
  { value: "50+", label: "Videos Produced" },
  { value: "5M+", label: "Total Views" },
  { value: "10+", label: "Brands Served" },
  { value: "100%", label: "Client Satisfaction" },
];

// Portfolio videos — replace src with actual video URLs
const portfolioVideos: VideoItem[] = [
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop",
    title: "PR3 Fashion Campaign",
    description: "Cinematic brand film for PR3 Salem's seasonal collection",
    category: "Brand Film",
    aspectRatio: "landscape",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
    title: "Product Showcase Reel",
    description: "Dynamic product video for e-commerce listing",
    category: "Product Video",
    aspectRatio: "portrait",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop",
    title: "Logo Reveal Animation",
    description: "Motion graphics logo reveal for brand launch",
    category: "Motion Graphics",
    aspectRatio: "square",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop",
    title: "Vedha Clothing Reel",
    description: "Instagram reel showcasing new arrivals",
    category: "Social Reel",
    aspectRatio: "portrait",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&auto=format&fit=crop",
    title: "Bridal Transformation",
    description: "Before & after bridal makeup transformation video",
    category: "Social Reel",
    aspectRatio: "portrait",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
    title: "Event Highlight Film",
    description: "Event coverage and highlight reel",
    category: "Event Coverage",
    aspectRatio: "landscape",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    title: "Social Ad Commercial",
    description: "30-second ad commercial for Meta campaigns",
    category: "Ad Commercial",
    aspectRatio: "square",
  },
  {
    src: "",
    thumbnail: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?w=800&auto=format&fit=crop",
    title: "Behind the Scenes",
    description: "BTS content from a product shoot day",
    category: "Brand Film",
    aspectRatio: "landscape",
  },
];

const aspectClasses: Record<string, string> = {
  landscape: "aspect-video",
  portrait: "aspect-[9/16]",
  square: "aspect-square",
  ultrawide: "aspect-[21/9]",
};

const HoverVideoCard = ({ video }: { video: VideoItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (video.src && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [video.src]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (video.src && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video.src]);

  const ratio = aspectClasses[video.aspectRatio || "landscape"];

  return (
    <motion.div
      variants={itemVariants}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative ${ratio} rounded-2xl overflow-hidden bg-secondary`}>
        {video.src ? (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.thumbnail}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Play icon overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-500 ${
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

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
            {video.category}
          </span>
        </div>

        {/* Info overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h4 className="text-white font-semibold text-sm">{video.title}</h4>
          <p className="text-white/70 text-xs mt-1">{video.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const VideoProduction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[hsl(var(--astra-orange)/0.08)] to-[hsl(var(--astra-purple)/0.08)] rounded-full blur-3xl" />
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
                className="px-4 py-1.5 rounded-full bg-[hsl(var(--astra-orange)/0.1)] text-[hsl(var(--astra-orange))] text-sm font-semibold tracking-wide uppercase mb-6 inline-block"
              >
                Video Production
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight leading-[1.1]"
              >
                Stories That <br />
                <span className="text-gradient">Move People</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                From brand films and product videos to social reels and motion graphics — we produce 
                cinematic video content in every format and ratio that captivates and converts.
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
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">What We Produce</h2>
              <p className="text-muted-foreground max-w-xl">
                Every video format your brand needs — from vertical reels to widescreen cinematics.
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
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--astra-orange)/0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-[hsl(var(--astra-orange))]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio — Masonry-like responsive grid */}
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
                Hover to preview — videos in all ratios, from portrait reels to widescreen films.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {portfolioVideos.map((video, i) => (
                <div key={i} className="break-inside-avoid">
                  <HoverVideoCard video={video} />
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

export default VideoProduction;
