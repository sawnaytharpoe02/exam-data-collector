import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useLocation, Link } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string;
    title: string;
  }[];
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = useLocation().pathname;

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={`${item.href}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
            "ml-4 lg:ml-0"
          )}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
