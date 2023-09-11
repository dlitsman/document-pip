import "./App.css";
import { PiPProvider, usePictureInPicture } from "./pip/PiPProvider";
import PiPWindow from "./pip/PiPWindow";
import { useCallback, useState } from "react";
import Counter from "./Counter";

function App() {
  return (
    <>
      <h1>Picture-in-picture example</h1>
      <PiPProvider>
        <Test />
      </PiPProvider>
    </>
  );
}

function Test() {
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
      {isSupported ? (
        <>
          <button onClick={pipWindow ? closePipWindow : startPiP}>
            {pipWindow ? "Close PIP" : "Open PIP"}
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
