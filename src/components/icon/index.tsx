import { LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, className = "", children, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return (
    <span className={className ? `icon ${className}` : `icon`}>
      <LucideIcon {...props} />
      {children}
    </span>
  );
};

export default Icon;
