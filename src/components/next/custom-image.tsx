import * as React from "react";
import Image, { ImageProps } from "next/image";

const CustomImage = React.forwardRef<HTMLImageElement, ImageProps>(({ ...props }, ref) => (
  <Image ref={ref} {...props} />
));
CustomImage.displayName = "CustomImage";

export { CustomImage };
