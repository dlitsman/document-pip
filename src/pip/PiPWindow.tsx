import { createPortal } from "react-dom";

import "./PiPWindow.css";

type PiPWindowProps = {
  pipWindow: Window;
  children: React.ReactNode;
};

const PiPWindow = ({ pipWindow, children }: PiPWindowProps) => {
  return createPortal(
    <div className="pipRoot">{children}</div>,
    pipWindow.document.body
  );
};

export default PiPWindow;
