import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: {
    id: string | number;
    title: string;
    subtitle?: string;
    indicator?: React.ReactNode;
  }[];
  actionLink?: {
    label: string;
    href: string;
  };
  className?: string;
  iconContainerClass?: string;
}

export function ComplianceStatusCard({
  title,
  subtitle,
  icon,
  items,
  actionLink,
  className,
  iconContainerClass
}: CardProps) {
  return (
    <div className={cn("bg-white overflow-hidden shadow rounded-lg hover:translate-y-[-4px] transition-all duration-300", className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconContainerClass)}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-neutral-700">{title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
          </div>
        </div>
        <div className="mt-4">
          {items.map((item, index) => (
            <div key={item.id} className={cn("pt-4", index > 0 && "border-t border-neutral-200 mt-4")}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {item.indicator}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-700">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-neutral-500">{item.subtitle}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {actionLink && (
          <div className="mt-5">
            <a href={actionLink.href} className="text-sm font-medium text-primary hover:text-primary-dark">
              {actionLink.label} <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
