import * as React from "react";
import { useTransition } from "react";
import { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type CustomLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, className, ...props }, ref) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      startTransition(() => {
        router.push(props.href as string);
      });
    };

    // return <Link ref={ref} {...props}>
    //   {children}
    // </Link>;
    return (
      <a ref={ref} {...props} onClick={handleClick} className={clsx("relative", className)}>
        {children}
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-20">
            <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </a>
    );
  },
);
CustomLink.displayName = "CustomLink";

export { CustomLink };
