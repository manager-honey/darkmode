import { useEffect, useRef, useState } from "react";
import { DownIcon } from "./SVGIcons";

interface DropdownProps {
  placeholder?: string;
  variant?: DropdownVariants;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

type DropdownVariants = "primary" | "secondary";

const VARIANT_CLASSES: Record<DropdownVariants, string> = {
  primary: "bg-gray-200 hover:bg-gray-300 text-black",
  secondary: "bg-black hover:bg-gray-900 text-white",
};

export const Dropdown = (props: DropdownProps) => {
  const {
    placeholder = "Select",
    variant = "primary",
    options,
    value,
    onChange,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedOption, setInternalSelectedOption] = useState("");
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const selectedOptRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = value !== undefined ? value : internalSelectedOption;
  const selectedLabel = options.find((opt) => {
    return opt.value === selectedOption;
  })?.label;

  function handleTrigger() {
    setIsOpen((prev) => !prev);
  }

  function handleSelection(option: string) {
    if (onChange) {
      onChange(option);
    } else {
      setInternalSelectedOption(option);
    }
    setIsOpen(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      listboxRef.current &&
      !listboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  // Smooth scroll effect from top to selected option when dropdown opens
  useEffect(() => {
    const container = listboxRef.current;
    const selectedElement = selectedOptRef.current;

    if (isOpen && selectedOption && container && selectedElement) {
      // Open Dropdown content from top:
      container.scrollTo({ top: 0, behavior: "auto" });

      setTimeout(() => {
        selectedElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, selectedOption]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* +++++ Dropdown Trigger +++++ */}
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleTrigger}
        className={`w-full p-2 shadow border px-4 rounded cursor-pointer ${VARIANT_CLASSES[variant]}`}
      >
        <div className="flex flex-row justify-between items-center ">
          {selectedLabel || placeholder}
          <div className={`duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <DownIcon colorHex="currentColor" />
          </div>
        </div>
      </button>
      {/* +++++ Dropdown Content +++++ */}
      {
        <div
          role="listbox"
          ref={listboxRef}
          className={`transition-all duration-300 ease-out transform origin-top ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } border max-h-[200px] overflow-auto rounded my-1 custom-scrollbar`}
        >
          {options.map((option, i) => {
            const isSelected = selectedOption === option.value;
            return (
              <div
                role="option"
                aria-selected={selectedOption === option.value}
                tabIndex={0}
                ref={isSelected ? selectedOptRef : null}
                onClick={() => handleSelection(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelection(option.value);
                }}
                key={`${i}-${option.label}-${i}`}
                className={`p-1 px-4 ${
                  selectedOption === option.value
                    ? "border-2 border-blue-400"
                    : ""
                }  ${VARIANT_CLASSES[variant]}`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      }
    </>
  );
};
