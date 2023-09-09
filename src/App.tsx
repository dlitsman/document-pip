import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PiPProvider, usePictureInPicture } from "./PiPProvider";
import PiPWindow from "./PiPWindow";
import { useCallback, useEffect } from "react";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <PiPProvider>
        <div className="card">
          <Test />
        </div>
      </PiPProvider>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function Test() {
  const { requestPipWindow, pipWindow, closePipWindow } = usePictureInPicture();
  const startPiP = useCallback(() => {
    requestPipWindow(500, 500);
  }, [requestPipWindow]);

  return (
    <div>
      <button onClick={pipWindow ? closePipWindow : startPiP}>
        {pipWindow ? "Close PIP" : "Open PIP"}
      </button>
      {pipWindow && <PiPWindow pipWindow={pipWindow} />}
    </div>
  );
}

export default App;
