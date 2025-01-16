import React, { forwardRef } from "react";

type SidebarProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const cn = (className?: string) => className || "";

const Sidebar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SidebarProps
>(({ className, children, ...rest }, ref) => {
  return (
    <aside ref={ref} className={cn(className)} {...rest}>
      {children}
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
