"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Briefcase, FolderOpen, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const items: NavItem[] = [
  { id: 0, icon: <Home size={20} />, label: "Home", href: "/" },
  { id: 1, icon: <Users size={20} />, label: "About", href: "/about" },
  { id: 2, icon: <Briefcase size={20} />, label: "Services", href: "/services" },
  { id: 3, icon: <FolderOpen size={20} />, label: "Work", href: "/work" },
  { id: 4, icon: <Mail size={20} />, label: "Contact", href: "/contact" },
];

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveIndex = () => {
    const index = items.findIndex(item => item.href === location.pathname);
    return index >= 0 ? index : 0;
  };
  
  const [active, setActive] = useState(getActiveIndex());

  React.useEffect(() => {
    setActive(getActiveIndex());
  }, [location.pathname]);

  const handleClick = (index: number, href: string) => {
    setActive(index);
    navigate(href);
  };

  const itemWidth = 56; // w-14 = 56px
  const containerPadding = 8; // px-2 = 8px

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 md:hidden">
      <div className="relative flex items-center justify-around w-full max-w-sm rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg px-2 py-2">
        {/* Active Indicator Glow - centered on active item */}
        <motion.div
          className="absolute h-12 w-12 rounded-full bg-primary/20 blur-md pointer-events-none"
          initial={false}
          animate={{
            left: `calc(${containerPadding}px + ${active} * (100% - ${containerPadding * 2}px) / ${items.length} + (100% - ${containerPadding * 2}px) / ${items.length} / 2 - 24px)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <div key={item.id} className="relative group flex flex-col items-center flex-1">
              {/* Button */}
              <motion.button
                onClick={() => handleClick(index, item.href)}
                whileHover={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={`flex items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
              </motion.button>

              {/* Tooltip */}
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-xs bg-popover text-popover-foreground border border-border px-2 py-1 rounded-md shadow-md whitespace-nowrap z-20">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
