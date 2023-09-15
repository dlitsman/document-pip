import "./App.css";
import { PiPProvider, usePictureInPicture } from "./pip/PiPProvider";
import PiPWindow from "./pip/PiPWindow";
import { useCallback, useState } from "react";
import Counter from "./Counter";

function App() {
  return (
    <>
      <h1>Document Picture-in-Picture</h1>
      <PiPProvider>
        <Example />
      </PiPProvider>
    </>
  );
}

function Example() {
  const { isSupported, requestPipWindow, pipWindow, closePipWindow } =
    usePictureInPicture();
  const startPiP = useCallback(() => {
    requestPipWindow(500, 500);
  }, [requestPipWindow]);
  const [count, setCount] = useState(0);

  const counterComponent = <Counter count={count} setCount={setCount} />;

  return (
    <div>
      <div className="card">{counterComponent}</div>
      {/* Make sure to have some fallback in case if API is not supported */}
      {isSupported ? (
        <>
          <button onClick={pipWindow ? closePipWindow : startPiP}>
            {pipWindow ? "Close PiP" : "Open PiP"}
          </button>
          {pipWindow && (
            <PiPWindow pipWindow={pipWindow}>{counterComponent}</PiPWindow>
          )}
        </>
      ) : (
        <div className="error">
          Document Picture-in-Picture is not supported in this browser
        </div>
      )}
    </div>
  );
}

export default App;
