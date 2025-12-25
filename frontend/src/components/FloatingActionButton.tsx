import { FloatingButton, FloatingButtonItem } from "@/components/ui/floating-button";
import { cn } from "@/lib/utils";
import { Mail, MessageCircle, Phone, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const socialItems = [
  {
    icon: <Mail className="w-5 h-5" />,
    bgColor: 'bg-astra-teal',
    href: 'mailto:hello@astra360.com',
    label: 'Email'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    bgColor: 'bg-astra-orange',
    href: 'tel:+1234567890',
    label: 'Phone'
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    bgColor: 'bg-astra-purple',
    href: '/contact',
    label: 'Contact',
    isInternal: true
  }
];

export function FloatingActionButton() {
  return (
    <FloatingButton
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40"
      triggerContent={
        <button 
          className="flex items-center justify-center h-11 w-11 md:h-14 md:w-14 rounded-full bg-primary text-primary-foreground shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
          aria-label="Quick actions"
        >
          <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      }
    >
      {socialItems.map((item, key) => (
        <FloatingButtonItem key={key}>
          {item.isInternal ? (
            <Link
              to={item.href}
              className={cn(
                'h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-primary-foreground shadow-md hover:scale-110 transition-transform',
                item.bgColor
              )}
              aria-label={item.label}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">{item.icon}</span>
            </Link>
          ) : (
            <a
              href={item.href}
              className={cn(
                'h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-primary-foreground shadow-md hover:scale-110 transition-transform',
                item.bgColor
              )}
              aria-label={item.label}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">{item.icon}</span>
            </a>
          )}
        </FloatingButtonItem>
      ))}
    </FloatingButton>
  );
}
