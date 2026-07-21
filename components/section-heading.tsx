import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {label ? (
        <span className={cn("section-label", centered && "justify-center")}>{label}</span>
      ) : null}
      <h2 className={cn("section-title", centered && "mx-auto")}>{title}</h2>
      {subtitle ? (
        <p className={cn("section-subtitle", centered && "mx-auto")}>{subtitle}</p>
      ) : null}
    </div>
  );
}
