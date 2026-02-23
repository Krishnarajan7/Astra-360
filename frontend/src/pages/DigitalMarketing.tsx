import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { ArrowLeft, ExternalLink, Instagram, TrendingUp, Target, Megaphone, BarChart3, Play, Users, ShoppingBag, Eye, Palette, Video, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

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

const services = [
  {
    icon: Target,
    title: "Social Media Management",
    description: "End-to-end social media strategy, content creation, and community management across all platforms.",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description: "ROI-driven Meta & Google ad campaigns that maximize reach and drive conversions.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Data-driven insights and monthly performance reports to optimize every marketing rupee spent.",
  },
  {
    icon: Video,
    title: "Video & Reels Production",
    description: "Professional short-form video content, reels, and promotional videos that drive engagement.",
  },
  {
    icon: Palette,
    title: "Logo & Brand Design",
    description: "Complete brand identity design including logos, brand guidelines, and visual assets.",
  },
  {
    icon: Camera,
    title: "Poster & Creative Design",
    description: "Eye-catching posters, social media creatives, and promotional graphics for all platforms.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Comprehensive growth hacking and brand positioning strategies to scale online presence.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Marketing",
    description: "Product listing optimization, promotional campaigns, and conversion rate optimization.",
  },
  {
    icon: Eye,
    title: "Content Strategy",
    description: "Strategic content planning, storytelling, and audience engagement across digital channels.",
  },
];

const stats = [
  { value: "3+", label: "Brand Partners" },
  { value: "100+", label: "Creatives Delivered" },
  { value: "50K+", label: "Social Followers Grown" },
  { value: "1M+", label: "Monthly Impressions" },
];

type Brand = {
  name: string;
  tagline: string;
  description: string;
  instagram: string;
  instagramHandle: string;
  website?: string;
  color: string;
  servicesProvided: string[];
  works: WorkItem[];
};

type WorkItem = {
  type: "video" | "image";
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
};

const brands: Brand[] = [
  {
    name: "PR3 Salem",
    tagline: "Fashion & Lifestyle Brand",
    description:
      "PR3 is a premium fashion and lifestyle brand based in Salem, Tamil Nadu, offering an extensive range of men's and women's clothing — from track pants and shorts to formal shirts and combo deals. As their official digital marketing team, we handle everything from social media strategy to paid advertising and e-commerce optimization.",
    instagram: "https://www.instagram.com/pr3_online",
    instagramHandle: "@pr3_online",
    website: "https://pr3.in/shop/",
    color: "var(--astra-teal)",
    servicesProvided: [
      "Social Media Management",
      "Paid Advertising",
      "E-commerce Marketing",
      "Content & Reels",
      "Product Photography",
      "Growth Strategy",
    ],
    works: [
      {
        type: "video",
        src: "",
        thumbnail: "https://pr3.in/wp-content/uploads/2025/11/IMG-20251113-WA0358-430x648.jpg",
        title: "PR3 Track Pants Collection Launch",
        description: "Product launch reel for the TP003 collection",
      },
      {
        type: "image",
        src: "https://pr3.in/wp-content/uploads/2025/11/IMG-20251113-WA0358-430x648.jpg",
        title: "Track Pants Campaign",
        description: "Social media creative for PR3 track pants",
      },
      {
        type: "image",
        src: "https://pr3.in/wp-content/uploads/2025/11/IMG-20251113-WA0331-430x650.jpg",
        title: "Grey Collection Shoot",
        description: "Product photography for PR3 grey collection",
      },
      {
        type: "video",
        src: "",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
        title: "E-commerce Promo Reel",
        description: "Promotional video for PR3's online store launch",
      },
    ],
  },
  {
    name: "Vedha Clothing",
    tagline: "Women's Fashion Store — Tiruvarur",
    description:
      "Vedha Clothing is a women's fashion store based in Tiruvarur, offering trendy and affordable clothing for modern women. We partnered with Vedha to build their entire digital brand identity from scratch — including logo design, poster creatives, video production, and short-form content creation for social media.",
    instagram: "https://www.instagram.com/vedha_clothing_tvr/",
    instagramHandle: "@vedha_clothing_tvr",
    color: "var(--astra-purple)",
    servicesProvided: [
      "Logo Design",
      "Poster Design",
      "Video Production",
      "Short Content / Reels",
      "Social Media Creatives",
      "Brand Identity",
    ],
    works: [
      {
        type: "video",
        src: "",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop",
        title: "Vedha Brand Launch Reel",
        description: "Brand introduction video for social media",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop",
        title: "Collection Poster Design",
        description: "Seasonal collection poster for Vedha Clothing",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop",
        title: "Product Showcase Creative",
        description: "Instagram carousel design for new arrivals",
      },
      {
        type: "video",
        src: "",
        thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
        title: "Fashion Reel Content",
        description: "Short-form video content for Instagram Reels",
      },
    ],
  },
  {
    name: "Brindha Makeup Artist",
    tagline: "Professional Makeup Artist — Nagai",
    description:
      "Brindha is a professional makeup artist based in Nagapattinam, known for bridal and event makeup services. We handle Brindha's complete digital presence — from video production and poster designs to social media creatives that showcase her stunning transformation work.",
    instagram: "https://www.instagram.com/brindha_makeupartist_nagai/",
    instagramHandle: "@brindha_makeupartist_nagai",
    color: "var(--astra-orange)",
    servicesProvided: [
      "Video Production",
      "Poster Design",
      "Social Media Creatives",
      "Short Content / Reels",
      "Brand Promotion",
      "Content Strategy",
    ],
    works: [
      {
        type: "video",
        src: "",
        thumbnail: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&auto=format&fit=crop",
        title: "Bridal Makeup Transformation",
        description: "Before & after transformation reel",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
        title: "Service Poster Design",
        description: "Promotional poster for bridal makeup packages",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&auto=format&fit=crop",
        title: "Portfolio Showcase",
        description: "Instagram carousel showcasing recent work",
      },
      {
        type: "video",
        src: "",
        thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop",
        title: "Event Makeup Reel",
        description: "Short-form video for event makeup services",
      },
    ],
  },
];

const VideoCard = ({ work }: { work: WorkItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (work.type === "video" && work.src && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (work.type === "video" && work.src && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const displaySrc = work.type === "video" ? work.thumbnail : work.src;

  return (
    <div
      className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {work.type === "video" && work.src ? (
        <>
          <video
            ref={videoRef}
            src={work.src}
            poster={work.thumbnail}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted
          />
          {!isHovering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <img
            src={displaySrc}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {work.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </div>
          )}
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h4 className="text-white font-semibold text-sm">{work.title}</h4>
        <p className="text-white/70 text-xs mt-1">{work.description}</p>
      </div>
    </div>
  );
};

const BrandSection = ({ brand, index }: { brand: Brand; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="mb-24 last:mb-0">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}>
          <div className={isReversed ? "lg:col-start-2" : ""}>
            <span
              className="text-sm font-medium uppercase tracking-widest mb-4 block"
              style={{ color: `hsl(${brand.color})` }}
            >
              Brand Partner #{index + 1}
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              {brand.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-5">{brand.tagline}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{brand.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {brand.servicesProvided.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-secondary/50 text-foreground"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Store
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {brand.instagramHandle}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Brand Works Grid */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={isReversed ? "lg:col-start-1" : ""}
          >
            <div className="grid grid-cols-2 gap-3">
              {brand.works.map((work, i) => (
                <VideoCard key={i} work={work} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const DigitalMarketing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[hsl(var(--astra-teal)/0.08)] to-[hsl(var(--astra-orange)/0.08)] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[hsl(var(--astra-purple)/0.06)] to-transparent rounded-full blur-3xl" />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="px-4 py-1.5 rounded-full bg-[hsl(var(--astra-teal)/0.1)] text-[hsl(var(--astra-teal))] text-sm font-semibold tracking-wide uppercase">
                  Digital Marketing Division
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight leading-[1.1]"
              >
                We Build Brands <br />
                That{" "}
                <span className="text-gradient">Stand Out</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
              >
                From logo design and brand identity to social media management, video production, and paid advertising — 
                we are the digital marketing team trusted by leading brands across Tamil Nadu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                {brands.map((brand) => (
                  <a
                    key={brand.name}
                    href={brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {brand.instagramHandle}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services We Provide */}
        <section className="py-20 lg:py-28 bg-secondary/50">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-[hsl(var(--astra-teal))] uppercase tracking-widest mb-4 block">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                Full-Stack Digital Marketing
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-[hsl(var(--astra-teal)/0.3)] hover:shadow-lg transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--astra-teal)/0.1)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--astra-teal)/0.15)] transition-colors">
                    <service.icon className="w-6 h-6 text-[hsl(var(--astra-teal))]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brand Partners Sections */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <span className="text-sm font-medium text-[hsl(var(--astra-orange))] uppercase tracking-widest mb-4 block">
                Our Clients
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
                Brands We Power
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A showcase of our digital marketing work across multiple brands — from fashion to beauty. Hover over videos to play.
              </p>
            </motion.div>

            {brands.map((brand, index) => (
              <BrandSection key={brand.name} brand={brand} index={index} />
            ))}
          </div>
        </section>

        {/* Follow Our Brands CTA */}
        <section className="py-20 bg-astra-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--astra-teal)/0.1)] to-[hsl(var(--astra-purple)/0.1)]" />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Instagram className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight">
                Follow Our Brand Partners
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Check out the brands we work with and see our digital marketing in action — 
                daily stories, reels, creatives, and growth-driven content.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {brands.map((brand) => (
                  <a
                    key={brand.name}
                    href={brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[hsl(var(--astra-navy))] rounded-full font-semibold hover:bg-white/90 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {brand.instagramHandle}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default DigitalMarketing;
