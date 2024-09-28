type Props = {
  children?: React.ReactNode;
};

const Empty: React.FC<Props> = ({ children }) => (
  <div className="w-full flex flex-col items-center justify-center">
    <div className="w-[300px] h-[200px] bg-no-repeat bg-auto bg-center bg-[url('/images/empty.png')]" />
    {children}
  </div>
);
Empty.displayName = "Empty";

export { Empty };
