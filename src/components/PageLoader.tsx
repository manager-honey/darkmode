import { useContext, useEffect, useRef } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

export const PageLoader = () => {
  const { isLoading } = useContext(LoadingContext);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading) return;
    overlayRef.current?.focus();

    const previouslyFocusedElement = document.activeElement as HTMLElement;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        overlayRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);

      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isLoading]);

  return (
    isLoading && (
      <div
        tabIndex={0}
        role="dialog"
        ref={overlayRef}
        className="h-screen w-screen absolute inset-0 z-[5000] bg-black/30 flex flex-row justify-center items-center gap-5"
      >
        <div className=" border-black h-10 w-10 border-5 rounded-full animate-ping grid place-content-center">
          <div className="border-black h-10 w-10 border-5 rounded-full animate-ping grid place-content-center">
            <div className="border-black h-10 w-10 border-5 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    )
  );
};
