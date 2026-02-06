const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
];

export const TrustedBadge = () => {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Overlapping avatars */}
      <div className="flex -space-x-1.5">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`User ${index + 1}`}
            className="w-6 h-6 rounded-full border-[1.5px] border-background object-cover ring-1 ring-border/20"
            style={{ zIndex: avatars.length - index }}
          />
        ))}
      </div>
      
      {/* Text */}
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        Trusted by 1k+ people
      </span>
    </div>
  );
};
