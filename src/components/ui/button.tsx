import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-primary hover:bg-primary-glow hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-warm hover:bg-secondary-light hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom charity variants
        donate: "bg-gradient-warm text-white shadow-warm hover:shadow-lg hover:scale-105 transition-spring font-semibold",
        hero: "bg-gradient-hero text-white shadow-primary hover:shadow-xl hover:scale-105 transition-spring text-base font-semibold",
        trust: "bg-gradient-trust text-foreground border border-primary/20 hover:shadow-card transition-smooth",
        // Modern enhanced variants for Programs page
        program: "relative bg-gradient-to-r from-primary via-primary-glow to-primary text-white shadow-primary hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-semibold overflow-hidden group",
        programOutline: "relative border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary-glow/5 text-primary hover:border-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-glow hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold overflow-hidden group",
        cta: "relative bg-gradient-to-r from-secondary via-secondary-light to-secondary text-white shadow-warm hover:shadow-xl hover:shadow-secondary/25 hover:scale-105 transition-all duration-300 font-bold overflow-hidden group",
        ctaOutline: "relative border-2 border-secondary/30 bg-gradient-to-r from-secondary/5 to-secondary-light/5 text-secondary hover:border-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-secondary-light hover:text-white hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 font-semibold overflow-hidden group",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-9 w-9",
        xl: "h-14 rounded-lg px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
