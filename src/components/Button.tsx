import { InlineLoader } from "./InlineLoader";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  iconPath?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, className, onClick, isLoading, iconPath } = props;

  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 py-2 px-4  rounded-md min-w-18 cursor-pointer hover:brightness-90 focus:outline-gray-400 focus:shadow ${className}`}
    >
      <span className="flex flex-row items-center  justify-center gap-2">
        {isLoading ? (
          <InlineLoader />
        ) : (
          iconPath && (
            <div className="w-5 aspect-square">
              <img
                src={iconPath}
                alt="Button icon."
                className="object-contain object-center h-full w-full"
              />
            </div>
          )
        )}
        {children}
      </span>
    </button>
  );
};
