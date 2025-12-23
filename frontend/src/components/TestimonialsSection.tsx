import { Testimonial } from "@/components/ui/design-testimonial";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

export function TestimonialsSection() {
  return (
    <section className="bg-background py-24">
      <AnimatedSection className="text-center mb-16">
        <span className="inline-block px-6 py-2 rounded-full bg-secondary text-primary text-base font-medium mb-8">
          Client Success
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
      </AnimatedSection>
      
      <Testimonial />
    </section>
  );
}