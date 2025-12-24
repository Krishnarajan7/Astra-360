import { ClickableFolder } from "@/components/ui/clickable-folder";

interface FolderData {
  title: string;
  projectCount: number;
  route: string;
  previews: { image: string; title: string; route: string }[];
}

const portfolioData: FolderData[] = [
  {
    title: "Web Development",
    projectCount: 3,
    route: "/work/web-development",
    previews: [
      { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop", title: "E-commerce Platform", route: "/project/ecommerce-platform" },
      { image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop", title: "SaaS Dashboard", route: "/project/saas-dashboard" },
      { image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&auto=format&fit=crop", title: "Corporate Website", route: "/project/corporate-website" },
    ],
  },
  {
    title: "Digital Marketing",
    projectCount: 3,
    route: "/work/digital-marketing",
    previews: [
      { image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&auto=format&fit=crop", title: "Social Campaign", route: "/project/social-campaign" },
      { image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&auto=format&fit=crop", title: "SEO Strategy", route: "/project/seo-strategy" },
      { image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop", title: "Email Marketing", route: "/project/email-marketing" },
    ],
  },
  {
    title: "Video Production",
    projectCount: 3,
    route: "/work/video-production",
    previews: [
      { image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop", title: "Brand Film", route: "/project/brand-film" },
      { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop", title: "Product Video", route: "/project/product-video" },
      { image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&auto=format&fit=crop", title: "Motion Graphics", route: "/project/motion-graphics" },
    ],
  },
  {
    title: "Branding",
    projectCount: 3,
    route: "/work/branding",
    previews: [
      { image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&auto=format&fit=crop", title: "Brand Identity", route: "/project/brand-identity" },
      { image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&auto=format&fit=crop", title: "Logo Design", route: "/project/logo-design" },
      { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&auto=format&fit=crop", title: "Brand Guidelines", route: "/project/brand-guidelines" },
    ],
  },
];

interface PortfolioFoldersProps {
  className?: string;
}

export function PortfolioFolders({ className }: PortfolioFoldersProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center px-2 sm:px-0">
        {portfolioData.map((folder) => (
          <ClickableFolder
            key={folder.title}
            title={folder.title}
            projectCount={folder.projectCount}
            route={folder.route}
            previews={folder.previews}
          />
        ))}
      </div>
    </div>
  );
}