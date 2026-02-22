"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectPreview {
  image?: string;
  videoUrl?: string;
  title: string;
  route: string;
}

interface ClickableFolderProps {
  title: string;
  projectCount: number;
  route: string;
  previews?: ProjectPreview[];
  className?: string;
}

export function ClickableFolder({ title, projectCount, route, previews = [], className }: ClickableFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleFolderClick = () => {
    navigate(route);
  };

  const handleProjectClick = (e: React.MouseEvent, projectRoute: string) => {
    e.stopPropagation();
    navigate(projectRoute);
  };

  return (
    <motion.div
      className={cn(
        "relative w-36 sm:w-44 md:w-52 lg:w-56 cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFolderClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle background glow on hover */}
      <motion.div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-folder-front/20 via-transparent to-folder-front/20 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Folder container */}
      <div className="relative aspect-[4/3]">
        {/* Folder back layer */}
        <motion.div
          className="absolute inset-0 z-10 rounded-lg bg-folder-back shadow-lg"
          animate={{
            translateY: isHovered ? -4 : 0,
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Folder tab */}
        <motion.div
          className="absolute left-2 sm:left-3 top-0 z-10 h-4 sm:h-5 w-12 sm:w-16 -translate-y-3 sm:-translate-y-4 rounded-t-md bg-folder-tab"
          animate={{
            translateY: isHovered ? -10 : -12,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Preview cards that peek out on hover */}
        <div className="absolute inset-0 z-20 flex items-center justify-center overflow-visible">
          {previews.slice(0, 3).map((preview, index) => {
            const rotations = [-12, 0, 12];
            const translationsX = [-55, 0, 55];
            const translationsY = [-65, -80, -65];

            return (
              <motion.div
                key={index}
                className="absolute w-16 sm:w-20 md:w-24 aspect-[4/3] rounded-lg shadow-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 hover:shadow-2xl transition-shadow"
                onClick={(e) => handleProjectClick(e, preview.route)}
                initial={{
                  opacity: 0,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? translationsY[index] : 0,
                  x: isHovered ? translationsX[index] : 0,
                  rotate: isHovered ? rotations[index] : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                whileHover={{
                  scale: 1.1,
                  zIndex: 50,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <div className="w-3/4 h-1/2 rounded bg-muted-foreground/20" />
                  </div>
                )}
                {/* Hover overlay with title */}
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-end p-1.5">
                  <span className="text-[8px] sm:text-[10px] text-white font-medium truncate w-full">
                    {preview.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Folder front layer */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 h-[85%] rounded-lg bg-folder-front shadow-xl"
          animate={{
            translateY: isHovered ? 2 : 0,
            scale: isHovered ? 0.98 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Folder shine effect */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[31] h-[85%] overflow-hidden rounded-lg pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
        </motion.div>
      </div>

      {/* Folder title */}
      <motion.div
        className="mt-3 text-center"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </motion.div>

      {/* Project count */}
      <div className="mt-0.5 text-center text-xs text-muted-foreground">
        {projectCount} projects
      </div>

      {/* Click hint */}
      <motion.div
        className="mt-1.5 text-center text-[10px] text-muted-foreground/60"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Click to explore
      </motion.div>
    </motion.div>
  );
}