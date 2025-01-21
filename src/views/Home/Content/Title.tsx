import React from "react";

type TitleProps = {
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const cn = (className?: string) => className ?? "";

const Title: React.FC<TitleProps> = ({ className, children, ...rest }) => {
  return (
    <h1 className={`text-xl mb-3 font-bold max-md:ml-2 ${cn(className)}`} {...rest}>
      {children}
    </h1>
  );
};
export default Title;