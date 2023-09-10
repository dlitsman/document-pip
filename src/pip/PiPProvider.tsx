import { createContext, useCallback, useContext, useState } from "react";

type PiPProviderProps = {
  children: React.ReactNode;
};

type PiPContextType = {
  pipWindow: Window | null;
  requestPipWindow: (width: number, height: number) => Promise<Window>;
  closePipWindow: () => void;
};

const PiPContext = createContext<PiPContextType | undefined>(undefined);

export function PiPProvider({ children }: PiPProviderProps) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const closePipWindow = useCallback(() => {
    if (pipWindow != null) {
      pipWindow.close();
      setPipWindow(null);
    }
  }, [pipWindow]);

  const requestPipWindow = async (width: number, height: number) => {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width,
      height,
    });

    pipWindow.onpagehide = () => {
      setPipWindow(null);
    };

    const allCSS = [...document.styleSheets]
      .map((styleSheet) =>
        [...styleSheet.cssRules].map((r) => r.cssText).join("")
      )
      .filter(Boolean)
      .join("\n");
    const style = document.createElement("style");
    style.textContent = allCSS;
    pipWindow.document.head.appendChild(style);

    setPipWindow(pipWindow);

    return pipWindow;
  };

  return (
    <PiPContext.Provider
      value={{ pipWindow, requestPipWindow, closePipWindow }}
    >
      {children}
    </PiPContext.Provider>
  );
}

export const usePictureInPicture = (): PiPContextType => {
  const context = useContext(PiPContext);

  if (context === undefined) {
    throw new Error("usePictureInPicture must be used within a PiPContextType");
  }

  return context;
};
