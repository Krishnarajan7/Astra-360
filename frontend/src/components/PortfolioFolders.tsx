import { useMemo } from "react";
import { ClickableFolder } from "@/components/ui/clickable-folder";
import { categoriesData } from "@/pages/WorkCategory";

interface ProjectPreview {
  image?: string;
  videoUrl?: string;
  title: string;
  route: string;
}

interface FolderData {
  title: string;
  projectCount: number;
  route: string;
  allPreviews: ProjectPreview[];
}

const portfolioData: FolderData[] = Object.entries(categoriesData).map(([id, category]) => {
  // Extract the plain text title if it's a ReactNode
  let displayTitle = "Category";
  if (typeof category.title === 'string') {
    displayTitle = category.title;
  } else {
    // Basic mapping for known categories to avoid complex ReactNode parsing
    const titleMap: Record<string, string> = {
      "web-development": "Web Development",
      "digital-marketing": "Digital Marketing",
      "video-production": "Video Production",
      "branding": "Branding"
    };
    displayTitle = titleMap[id] || id;
  }

  return {
    title: displayTitle,
    projectCount: category.projects.length,
    route: `/work/${id}`,
    allPreviews: category.projects.map(p => ({
      image: p.image,
      videoUrl: p.videoUrl,
      title: typeof p.title === 'string' ? p.title : 'Project',
      route: `/project/${p.id}`
    }))
  };
});

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