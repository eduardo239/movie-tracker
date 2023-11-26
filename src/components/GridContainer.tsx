import { PropsWithChildren } from "react";

type TContainerProps = {
  centered: boolean;
  gap?: boolean | "gap-md" | "gap-sm" | "gap-lg";
  column?: "grid-column";
};

const GridContainer = ({
  children,
  column,
  gap,
  centered,
}: PropsWithChildren<TContainerProps>) => {
  return (
    <div
      className={`
      flex 
      ${centered ? "flex-center" : ""} 
    ${
      gap === "gap-md"
        ? "gap-md"
        : gap === "gap-sm"
        ? "gap-sm"
        : gap === "gap-lg"
        ? "gap-lg"
        : "gap-md"
    } ${column ? "flex-column" : ""}
    
    `}
    >
      {children}
    </div>
  );
};

export default GridContainer;
