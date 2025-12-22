"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: string;
}

interface UniqueAccordionProps {
  items?: AccordionItem[];
}

const defaultItems: AccordionItem[] = [
  {
    id: "design",
    number: "01",
    title: "Design",
    content:
      "We craft pixel-perfect interfaces that blend aesthetics with functionality, creating memorable digital experiences.",
  },
  {
    id: "development",
    number: "02",
    title: "Development",
    content:
      "Building robust, scalable solutions with modern technologies that stand the test of time and traffic.",
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy",
    content:
      "Data-driven insights and creative thinking combine to position your brand for lasting success.",
  },
  {
    id: "growth",
    number: "04",
    title: "Growth",
    content:
      "Sustainable scaling strategies that transform startups into industry leaders through measurable results.",
  },
];

export function UniqueAccordion({ items = defaultItems }: UniqueAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
                initial={false}
              >
                <div className="flex items-center gap-6 py-6">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-12 h-12">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-border"
                      animate={{
                        scale: isActive || isHovered ? 1 : 0.8,
                        borderColor:
                          isActive || isHovered
                            ? "hsl(var(--primary))"
                            : "hsl(var(--border))",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <motion.span
                    className="text-xl md:text-2xl font-semibold text-left flex-1"
                    animate={{
                      color:
                        isActive || isHovered
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.span>

                  {/* Animated indicator */}
                  <div className="flex items-center justify-center w-8 h-8">
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-muted-foreground"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-border"
                  style={{ display: isLast ? "none" : "block" }}
                />
              </motion.button>

              {/* Content */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pl-[72px] text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
