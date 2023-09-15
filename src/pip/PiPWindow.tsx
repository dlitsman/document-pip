import { createPortal } from "react-dom";

import "./PiPWindow.css";

type PiPWindowProps = {
  pipWindow: Window;
  children: React.ReactNode;
};

export default function PiPWindow({ pipWindow, children }: PiPWindowProps) {
  return createPortal(
    <div className="pipRoot">{children}</div>,
    pipWindow.document.body
  );
}
