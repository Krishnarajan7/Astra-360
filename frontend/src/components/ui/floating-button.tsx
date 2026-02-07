'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

type FloatingButtonProps = {
  className?: string;
  children: ReactNode;
  triggerContent: ReactNode;
};

type FloatingButtonItemProps = {
  children: ReactNode;
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 5 },
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 },
};

function FloatingButton({
  className,
  children,
  triggerContent,
}: FloatingButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              role="menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={list}
              className="flex flex-col gap-2"
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Trigger Button */}
        <motion.button
          type="button"
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={btn}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
        >
          {triggerContent}
        </motion.button>
      </div>
    </div>
  );
}

function FloatingButtonItem({ children }: FloatingButtonItemProps) {
  return (
    <motion.li variants={item} role="menuitem">
      {children}
    </motion.li>
  );
}

export { FloatingButton, FloatingButtonItem };
