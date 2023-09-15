import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type PiPContextType = {
  isSupported: boolean;
  pipWindow: Window | null;
  requestPipWindow: (width: number, height: number) => Promise<void>;
  closePipWindow: () => void;
};

const PiPContext = createContext<PiPContextType | undefined>(undefined);

type PiPProviderProps = {
  children: React.ReactNode;
};

export function PiPProvider({ children }: PiPProviderProps) {
  // Detect if feature is available
  const isSupported = "documentPictureInPicture" in window;

  // Expose pipWindow that is currently active
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const closePipWindow = useCallback(() => {
    if (pipWindow != null) {
      pipWindow.close();
      setPipWindow(null);
    }
  }, [pipWindow]);

  const requestPipWindow = useCallback(
    async (width: number, height: number) => {
      // We don't want to allow multiple requests.
      if (pipWindow != null) {
        return;
      }

      const pip = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      });

      pip.onpagehide = () => {
        setPipWindow(null);
      };

      // It is important to copy all parent widnow styles. Otherwise, there would be no CSS available at all
      const allCSS = [...document.styleSheets]
        .map((styleSheet) =>
          [...styleSheet.cssRules].map((r) => r.cssText).join("")
        )
        .filter(Boolean)
        .join("\n");
      const style = document.createElement("style");
      style.textContent = allCSS;
      pip.document.head.appendChild(style);

      setPipWindow(pip);
    },
    [pipWindow]
  );

  const value = useMemo(() => {
    {
      return {
        isSupported,
        pipWindow,
        requestPipWindow,
        closePipWindow,
      };
    }
  }, [closePipWindow, isSupported, pipWindow, requestPipWindow]);

  return <PiPContext.Provider value={value}>{children}</PiPContext.Provider>;
}

export function usePictureInPicture(): PiPContextType {
  const context = useContext(PiPContext);

  if (context === undefined) {
    throw new Error("usePictureInPicture must be used within a PiPContext");
  }

  return context;
}
