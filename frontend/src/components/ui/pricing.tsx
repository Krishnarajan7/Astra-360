import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

export function Pricing({
  plans,
  title = "Investment Packages",
  description =
    "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);

    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container pb-32 sm:pb-32 mx-auto px-6 lg:px-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-6xl font-bold tracking-tight sm:text-5xl">
  Investment{" "}
  <span className="text-gradient">
    Packages
  </span>
</h2>

        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Billing Toggle */}
      {/* <div className="flex justify-center mb-10">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <Switch
              ref={switchRef}
              id="billing-toggle"
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative data-[state=checked]:bg-primary"
            />
          </label>
          <Label htmlFor="billing-toggle" className="text-sm font-semibold">
            Annual billing{" "}
            <span className="text-primary">(Save 20%)</span>
          </Label>
        </div>
      </div> */}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {plans.map((plan, index) => {
          const rawPrice = isMonthly
            ? plan.price
            : plan.yearlyPrice ?? plan.price;

          const isNumericPrice = !isNaN(Number(rawPrice));

          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale:
                        index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : {}
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
  "rounded-2xl p-6 bg-background text-center flex flex-col relative border",

  index === 1 && "border-primary border-2",
  (index === 0 || index === 2) && "border-[#ae2d68]",

  !plan.isPopular && "mt-5"
                ,
                index === 0 || index === 2
                  ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span className="text-primary-foreground ml-1 font-sans font-semibold">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Content */}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>

                {/* PRICE */}
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    {isNumericPrice ? (
                      <NumberFlow
                        value={Number(rawPrice)}
                        format={{
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                      />
                    ) : (
                      rawPrice
                    )}
                  </span>

                  {isNumericPrice && (
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                      only{plan.period}
                    </span>
                  )}
                </div>

                {/* {isNumericPrice && (
                  <p className="text-xs leading-5 text-muted-foreground">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>
                )} */}

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-4" />

                <Link
                  to={plan.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu transition-all duration-300 ease-out",
                    index === 1
                      ? "hover:bg-primary hover:text-primary-foreground"
                      : "hover:bg-secondary hover:text-secondary-foreground",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground"
                  )}
                >
                  {plan.buttonText}
                </Link>

                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
