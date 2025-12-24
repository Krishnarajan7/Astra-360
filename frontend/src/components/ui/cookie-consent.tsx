import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  isEssential?: boolean;
}

const DEFAULT_COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential Cookies",
    description: "Required for core website functionality, such as navigation and security.",
    isEssential: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description: "Track anonymous usage to improve our services.",
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    description: "Enable personalized ads across websites.",
  },
];

const STORAGE_KEY = "cookie_preferences";
const CONSENT_KEY = "cookie_consent_given";

interface CookieConsentProps {
  className?: string;
  categories?: CookieCategory[];
  cookiePolicyUrl?: string;
  onAccept?: (preferences: boolean[]) => void;
  onDecline?: () => void;
  showDelay?: number;
  autoHideDelay?: number;
}

function CookieConsent({
  className,
  categories = DEFAULT_COOKIE_CATEGORIES,
  cookiePolicyUrl = "/privacy",
  onAccept,
  onDecline,
  showDelay = 3000,
  autoHideDelay = 15000,
}: CookieConsentProps) {
  const [mounted, setMounted] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [showCustomizeDialog, setShowCustomizeDialog] = React.useState(false);
  const autoHideTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [preferences, setPreferences] = React.useState(() =>
    categories.map((cat) => !!cat.isEssential)
  );

  const clearAutoHideTimer = React.useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
  }, []);

  const startAutoHideTimer = React.useCallback(() => {
    clearAutoHideTimer();
    autoHideTimerRef.current = setTimeout(() => {
      setShowBanner(false);
    }, autoHideDelay);
  }, [autoHideDelay, clearAutoHideTimer]);

  React.useEffect(() => {
    setMounted(true);

    try {
      const consentGiven = localStorage.getItem(CONSENT_KEY) === "true";
      const storedPrefs = localStorage.getItem(STORAGE_KEY);

      if (consentGiven && storedPrefs) {
        const parsedPrefs = JSON.parse(storedPrefs) as boolean[];
        if (Array.isArray(parsedPrefs) && parsedPrefs.length === categories.length) {
          setPreferences(parsedPrefs);
          onAccept?.(parsedPrefs);
          return;
        }
      }

      // Show banner after delay
      const showTimer = setTimeout(() => {
        setShowBanner(true);
      }, showDelay);

      return () => clearTimeout(showTimer);
    } catch (error) {
      console.error("Error reading cookie preferences:", error);
      const showTimer = setTimeout(() => {
        setShowBanner(true);
      }, showDelay);
      return () => clearTimeout(showTimer);
    }
  }, [categories.length, onAccept, showDelay]);

  // Start auto-hide timer when banner becomes visible
  React.useEffect(() => {
    if (showBanner && !showCustomizeDialog) {
      startAutoHideTimer();
    } else {
      clearAutoHideTimer();
    }

    return () => clearAutoHideTimer();
  }, [showBanner, showCustomizeDialog, startAutoHideTimer, clearAutoHideTimer]);

  const savePreferences = React.useCallback(
    (prefs: boolean[]) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        localStorage.setItem(CONSENT_KEY, "true");
      } catch (error) {
        console.error("Error saving cookie preferences:", error);
      }

      clearAutoHideTimer();
      setShowBanner(false);
      setShowCustomizeDialog(false);
      onAccept?.(prefs);
    },
    [onAccept, clearAutoHideTimer]
  );

  const handleAcceptAll = React.useCallback(() => {
    const allTrue = categories.map(() => true);
    setPreferences(allTrue);
    savePreferences(allTrue);
  }, [categories, savePreferences]);

  const handleRejectAll = React.useCallback(() => {
    const essentialOnly = categories.map((cat) => !!cat.isEssential);
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
    onDecline?.();
  }, [categories, savePreferences, onDecline]);

  const handleSaveCustom = React.useCallback(() => {
    savePreferences(preferences);
  }, [preferences, savePreferences]);

  const handleToggle = React.useCallback(
    (index: number, checked: boolean) => {
      if (categories[index]?.isEssential) return;

      setPreferences((prev) => {
        const newPrefs = [...prev];
        newPrefs[index] = checked;
        return newPrefs;
      });
    },
    [categories]
  );

  const handleBannerInteraction = React.useCallback(() => {
    clearAutoHideTimer();
  }, [clearAutoHideTimer]);

  if (!mounted) return null;

  return (
    <>
      <CookieBanner
        isVisible={showBanner && !showCustomizeDialog}
        onAcceptAll={handleAcceptAll}
        onCustomize={() => {
          clearAutoHideTimer();
          setShowCustomizeDialog(true);
        }}
        onClose={() => setShowBanner(false)}
        cookiePolicyUrl={cookiePolicyUrl}
        className={className}
        onInteraction={handleBannerInteraction}
      />

      <CookieCustomizeDialog
        open={showCustomizeDialog}
        onOpenChange={setShowCustomizeDialog}
        categories={categories}
        preferences={preferences}
        onToggle={handleToggle}
        onSave={handleSaveCustom}
        onRejectAll={handleRejectAll}
      />
    </>
  );
}

interface CookieBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onCustomize: () => void;
  onClose: () => void;
  cookiePolicyUrl: string;
  className?: string;
  onInteraction?: () => void;
}

function CookieBanner({
  isVisible,
  onAcceptAll,
  onCustomize,
  onClose,
  cookiePolicyUrl,
  className,
  onInteraction,
}: CookieBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm",
            "sm:bottom-6 sm:right-6",
            className
          )}
          onMouseEnter={onInteraction}
          onTouchStart={onInteraction}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-secondary transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>

                <div className="pr-6">
                  <h3 className="font-semibold text-foreground text-sm">
                    Cookie Preferences
                  </h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your experience, personalize content, and analyze traffic.
                </p>
                <Link
                  to={cookiePolicyUrl}
                  className="inline-flex items-center text-sm text-primary hover:underline mt-2 group"
                >
                  Cookie Policy
                  <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={onAcceptAll}
                  size="sm"
                  className="flex-1"
                >
                  Accept All
                </Button>
                <Button
                  onClick={onCustomize}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CookieCustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CookieCategory[];
  preferences: boolean[];
  onToggle: (index: number, checked: boolean) => void;
  onSave: () => void;
  onRejectAll: () => void;
}

function CookieCustomizeDialog({
  open,
  onOpenChange,
  categories,
  preferences,
  onToggle,
  onSave,
  onRejectAll,
}: CookieCustomizeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Cookies</DialogTitle>
          <DialogDescription>
            Customize your cookie preferences below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {categories.map((category, index) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                    {category.icon || <Cookie className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={category.id} className="font-medium text-sm">
                      {category.name}
                    </Label>
                    {category.isEssential && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">These cookies cannot be disabled.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>

                <Switch
                  id={category.id}
                  checked={preferences[index]}
                  onCheckedChange={(checked) => onToggle(index, checked)}
                  disabled={category.isEssential}
                />
              </div>

              <p className="text-xs text-muted-foreground pl-11">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={onRejectAll} className="flex-1">
              Reject All
            </Button>
            <Button onClick={onSave} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CookieConsent };
export type { CookieCategory, CookieConsentProps };
