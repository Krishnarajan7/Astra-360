import { useMemo } from "react";
import { ClickableFolder } from "@/components/ui/clickable-folder";

interface ProjectPreview {
  image: string;
  title: string;
  route: string;
}

interface FolderData {
  title: string;
  projectCount: number;
  route: string;
  allPreviews: ProjectPreview[];
}

// All web development projects from Krish's portfolio
const webDevProjects: ProjectPreview[] = [
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/MiMacademy.png", 
    title: "MiMacademy", 
    route: "/project/mimacademy" 
  },
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/EduVerse.png", 
    title: "EduVerse", 
    route: "/project/eduverse" 
  },
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/grovvest.png", 
    title: "Growvest Academy", 
    route: "/project/growvest-academy" 
  },
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/phoenix.png", 
    title: "Phoenix Data Consulting", 
    route: "/project/phoenix-data-consulting" 
  },
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/Portfolio.png", 
    title: "Space Portfolio", 
    route: "/project/space-portfolio" 
  },
  { 
    image: "https://krish-dev-portfolio.netlify.app/assets/images/halley.png", 
    title: "HalleyShop", 
    route: "/project/halleyshop" 
  },
];

const portfolioData: FolderData[] = [
  {
    title: "Web Development",
    projectCount: 6,
    route: "/work/web-development",
    allPreviews: webDevProjects,
  },
  {
    title: "Digital Marketing",
    projectCount: 3,
    route: "/work/digital-marketing",
    allPreviews: [
      { image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&auto=format&fit=crop", title: "Social Campaign", route: "/project/social-campaign" },
      { image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&auto=format&fit=crop", title: "SEO Strategy", route: "/project/seo-strategy" },
      { image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop", title: "Email Marketing", route: "/project/email-marketing" },
    ],
  },
  {
    title: "Video Production",
    projectCount: 3,
    route: "/work/video-production",
    allPreviews: [
      { image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop", title: "Brand Film", route: "/project/brand-film" },
      { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop", title: "Product Video", route: "/project/product-video" },
      { image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&auto=format&fit=crop", title: "Motion Graphics", route: "/project/motion-graphics" },
    ],
  },
  {
    title: "Branding",
    projectCount: 3,
    route: "/work/branding",
    allPreviews: [
      { image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&auto=format&fit=crop", title: "Brand Identity", route: "/project/brand-identity" },
      { image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&auto=format&fit=crop", title: "Logo Design", route: "/project/logo-design" },
      { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&auto=format&fit=crop", title: "Brand Guidelines", route: "/project/brand-guidelines" },
    ],
  },
];

// Helper function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface PortfolioFoldersProps {
  className?: string;
}

export function PortfolioFolders({ className }: PortfolioFoldersProps) {
  // Memoize random previews so they don't change on every render
  const foldersWithRandomPreviews = useMemo(() => {
    return portfolioData.map((folder) => ({
      ...folder,
      previews: folder.allPreviews.length > 3 
        ? getRandomItems(folder.allPreviews, 3)
        : folder.allPreviews,
    }));
  }, []);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center px-2 sm:px-0">
        {foldersWithRandomPreviews.map((folder) => (
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