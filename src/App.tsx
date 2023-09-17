import "./App.css";
import { PiPProvider, usePiPWindow } from "./pip/PiPProvider";
import PiPWindow from "./pip/PiPWindow";
import { useCallback, useState } from "react";
import Counter from "./Counter";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const simple = urlParams.get("simple");

  return (
    <>
      <h1>Document Picture-in-Picture</h1>
      <PiPProvider>
        {simple != null ? <Example /> : <ExampleWithState />}
      </PiPProvider>
    </>
  );
}

function ExampleWithState() {
  const { isSupported, requestPipWindow, pipWindow, closePipWindow } =
    usePiPWindow();

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
            <PiPWindow pipWindow={pipWindow}>
              <div className="pipRoot">{counterComponent}</div>
            </PiPWindow>
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

function Example() {
  const { isSupported, requestPipWindow, pipWindow, closePipWindow } =
    usePiPWindow();

  const startPiP = useCallback(() => {
    requestPipWindow(500, 500);
  }, [requestPipWindow]);

  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Make sure to have some fallback in case if API is not supported */}
      {isSupported ? (
        <>
          <button onClick={pipWindow ? closePipWindow : startPiP}>
            {pipWindow ? "Close PiP" : "Open PiP"}
          </button>
          {pipWindow && (
            <PiPWindow pipWindow={pipWindow}>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <h3>Hello in PiP!</h3>
                <button
                  onClick={() => {
                    setCount((count) => count + 1);
                  }}
                >
                  Clicks count is {count}
                </button>
              </div>
            </PiPWindow>
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
