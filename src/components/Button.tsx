import { InlineLoader } from "./InlineLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  iconPath?: string;
  isLoading?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gray-500 hover:bg-gray-600 text-white",
  secondary: "bg-black hover:bg-gray-800 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    onClick,
    isLoading,
    iconPath,
    variant = "primary",
    disabled,
    ...rest
  } = props;

  return (
    <button
 
      disabled={disabled}
      onClick={onClick}
      aria-busy={isLoading}
      className={`py-2 px-4 rounded-md min-w-18 focus:outline-gray-400 shadow transition-colors duration-300 ease-in-out ${
        disabled ? "opacity-50 cursor-not-allowed" : " cursor-pointer"
      } ${variantClasses[variant]} ${className ?? ""}`}
      {...rest}
    >
      <div className="flex flex-row items-center justify-center gap-2">
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
      </div>
    </button>
  );
};
