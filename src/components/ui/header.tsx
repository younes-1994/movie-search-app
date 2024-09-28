import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Header: React.FC<Props> = ({ children, className }) => (
  <div
    className={clsx(
      "fixed top-0 left-0 right-0 w-full h-[75px] max-h-[75px] p-6 bg-white rounded-b-lg shadow-md",
      className,
    )}
  >
    {children}
  </div>
);
Header.displayName = "Header";

export { Header };
