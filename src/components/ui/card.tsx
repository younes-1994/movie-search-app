import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => (
  <div className={clsx("w-full max-w-lg p-6 bg-white rounded-lg shadow-md", className)}>{children}</div>
);
Card.displayName = "Card";

export { Card };
