import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Code, TrendingUp, Video, Palette, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with modern technologies.",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies that drive growth.",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]",
  },
  {
    icon: Zap,
    title: "Performance Ads",
    description: "High-ROI campaigns across all platforms.",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Cinematic storytelling and motion graphics.",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]",
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Strategic brand development and identity.",
    area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]",
  },
  {
    icon: Globe,
    title: "Content Creation",
    description: "Compelling content that engages audiences.",
    area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]",
  },
];

export function GlowingServicesGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2">
      {services.map((service) => (
        <GridItem
          key={service.title}
          area={service.area}
          icon={<service.icon className="h-5 w-5" />}
          title={service.title}
          description={service.description}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[12rem] list-none", area)}>
      <div className="relative h-full rounded-2xl border border-border/50 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm md:p-6">
          <div className="flex flex-col gap-4">
            <div className="w-fit rounded-lg border border-border bg-muted p-2.5">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
