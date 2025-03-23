import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary ring-primary/20",
        secondary:
          "bg-secondary/10 text-secondary ring-secondary/20",
        destructive:
          "bg-destructive/10 text-destructive ring-destructive/20",
        outline:
          "text-foreground ring-border",
        compliant:
          "bg-[#4caf50]/10 text-[#4caf50] ring-[#4caf50]/20",
        warning:
          "bg-[#ff9800]/10 text-[#ff9800] ring-[#ff9800]/20",
        attention:
          "bg-[#f44336]/10 text-[#f44336] ring-[#f44336]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
