import { createPortal } from "react-dom";

import { useState } from "react";

import "./PiPWindow.css";

type PiPWindowProps = {
  pipWindow: Window;
};

const PiPWindow = ({ pipWindow }: PiPWindowProps) => {
  return createPortal(<PiPContent />, pipWindow.document.body);
};

function PiPContent() {
  const [count, setCount] = useState(0);

  return (
    <div className="pipRoot">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default PiPWindow;
