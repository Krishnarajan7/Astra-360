"use client";

import { useState, useRef, forwardRef, useEffect, useLayoutEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  image: string;
  title: string;
  route?: string;
}

interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  className?: string;
  onProjectClick?: (project: Project) => void;
}

export function AnimatedFolder({ title, projects, className, onProjectClick }: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleProjectClick = (project: Project, index: number) => {
    if (onProjectClick) {
      onProjectClick(project);
      return;
    }
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect());
    }
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setSourceRect(null);
  };

  const handleCloseComplete = () => {
    setHiddenCardId(null);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  return (
    <>
      <div
        className={cn(
          "relative w-36 sm:w-44 md:w-52 lg:w-56 cursor-pointer transition-transform duration-500 ease-out hover:scale-105",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle background glow on hover */}
        <div
          className={cn(
            "absolute -inset-4 rounded-3xl bg-gradient-to-br from-folder-front/20 via-transparent to-folder-front/20 opacity-0 blur-xl transition-opacity duration-500",
            isHovered && "opacity-100"
          )}
        />

        {/* Wrapper with overflow visible for cards to pop out */}
        <div className="relative aspect-[4/3]" style={{ overflow: 'visible' }}>
          {/* Folder back layer */}
          <div
            className={cn(
              "absolute inset-0 z-10 rounded-lg bg-folder-back shadow-lg transition-all duration-500 ease-out",
              isHovered ? "translate-y-[-4px] scale-[1.01]" : ""
            )}
          />

          {/* Folder tab */}
          <div
            className={cn(
              "absolute left-2 sm:left-3 top-0 z-10 h-4 sm:h-5 w-12 sm:w-16 -translate-y-3 sm:-translate-y-4 rounded-t-md bg-folder-tab transition-all duration-500 ease-out",
              isHovered ? "translate-y-[-8px] sm:translate-y-[-10px]" : ""
            )}
          />

          {/* Project cards container - positioned to allow cards to pop out above */}
          <div 
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ overflow: 'visible' }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front layer */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-30 h-[85%] rounded-lg bg-folder-front shadow-xl transition-all duration-500 ease-out",
              isHovered ? "translate-y-1 scale-[0.98]" : ""
            )}
          />

          {/* Folder shine effect */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-[31] h-[85%] overflow-hidden rounded-lg transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
          </div>
        </div>

        {/* Folder title */}
        <div className="mt-3 text-center">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>

        {/* Project count */}
        <div className="mt-0.5 text-center text-xs text-muted-foreground">
          {projects.length} projects
        </div>

        {/* Hover hint */}
        <div
          className={cn(
            "mt-1.5 text-center text-[10px] text-muted-foreground/60 transition-opacity duration-300",
            isHovered ? "opacity-0" : "opacity-100"
          )}
        >
          Hover to explore
        </div>
      </div>

      <ImageLightbox
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  );
}

interface ImageLightboxProps {
  projects: Project[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  sourceRect: DOMRect | null;
  onCloseComplete?: () => void;
  onNavigate: (index: number) => void;
}

function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial");
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const totalProjects = projects.length;
  const hasNext = internalIndex < totalProjects - 1;
  const hasPrev = internalIndex > 0;

  const currentProject = projects[internalIndex];

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? "left" : "right";
      setSlideDirection(direction);
      setPrevIndex(internalIndex);
      setIsSliding(true);

      const timer = setTimeout(() => {
        setInternalIndex(currentIndex);
        setIsSliding(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isOpen, internalIndex, isSliding]);

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex);
      setPrevIndex(currentIndex);
      setIsSliding(false);
    }
  }, [isOpen, currentIndex]);

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return;
    onNavigate(internalIndex + 1);
  }, [internalIndex, totalProjects, isSliding, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return;
    onNavigate(internalIndex - 1);
  }, [internalIndex, isSliding, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase("initial");
      onCloseComplete?.();
    }, 400);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true);
      setAnimationPhase("initial");
      setIsClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase("animating");
        });
      });
      const timer = setTimeout(() => {
        setAnimationPhase("complete");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, sourceRect]);

  const handleDotClick = (idx: number) => {
    if (isSliding || idx === internalIndex) return;
    onNavigate(idx);
  };

  if (!shouldRender || !currentProject) return null;

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {};

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = Math.min(768, viewportWidth - 64);
    const targetHeight = Math.min(viewportHeight * 0.85, 600);

    const targetX = (viewportWidth - targetWidth) / 2;
    const targetY = (viewportHeight - targetHeight) / 2;

    const scaleX = sourceRect.width / targetWidth;
    const scaleY = sourceRect.height / targetHeight;
    const scale = Math.max(scaleX, scaleY);

    const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2);
    const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2);

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    };
  };

  const getFinalStyles = (): React.CSSProperties => {
    return {
      transform: "translate(0, 0) scale(1)",
      opacity: 1,
    };
  };

  const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-400",
          animationPhase !== "initial" && !isClosing ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className={cn(
          "absolute top-5 right-5 z-50",
          "w-10 h-10 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-105 active:scale-95"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigatePrev();
        }}
        disabled={!hasPrev || isSliding}
        className={cn(
          "absolute left-4 md:left-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateNext();
        }}
        disabled={!hasNext || isSliding}
        className={cn(
          "absolute right-4 md:right-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative w-full max-w-3xl mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.95)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="relative aspect-video">
            <div className="absolute inset-0 flex">
              {projects.map((project, idx) => (
                <img
                  key={project.id}
                  src={project.image}
                  alt={project.title}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-400",
                    idx === internalIndex ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {currentProject?.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs">
                      ←
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs ml-1">
                      →
                    </span>{" "}
                    to navigate
                  </span>

                  <div className="flex gap-1.5">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          idx === internalIndex
                            ? "bg-foreground scale-110"
                            : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    // Fan out rotations and positions for 3 cards - moderate spread
    const rotations = [-12, 0, 12];
    // Wider spread for better visibility
    const translationsX = [-55, 0, 55];
    const translationsY = [-65, -80, -65]; // Cards pop up more above folder for visibility

    return (
      <div
        ref={ref}
        className={cn(
          "absolute cursor-pointer overflow-hidden rounded-lg",
          "shadow-xl hover:shadow-2xl",
          "transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "group/card",
          isSelected ? "opacity-0" : "opacity-100",
          isVisible ? "duration-600" : "duration-300",
          // Responsive card sizes - larger on desktop for visibility
          "h-14 w-20 sm:h-18 sm:w-26 md:h-24 md:w-36 lg:h-28 lg:w-44"
        )}
        style={{
          transform: isVisible
            ? `translateX(${translationsX[index]}px) translateY(${translationsY[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateX(0) translateY(20px) rotate(0deg) scale(0.5)",
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
          zIndex: index === 1 ? 5 : 3 - index, // Middle card on top
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover/card:opacity-100 transition-opacity duration-300" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 md:p-3">
          <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-white truncate drop-shadow-lg">{title}</p>
        </div>
        
        {/* Hover ring effect */}
        <div className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover/card:ring-primary/50 transition-all duration-300" />
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
