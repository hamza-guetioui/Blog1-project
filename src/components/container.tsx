import React, { forwardRef } from "react";

type ContainerProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const cn = (className?: string) => className ?? "";

const Container = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ContainerProps
>(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {children}
    </div>
  );
});

Container.displayName = "Container";

export default Container;
