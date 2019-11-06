import React, { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { Button } from "../components/Button";

const Alerts = () => {
  const Alert = useContext(AlertContext);

  const handleAlert = e => {
    Alert.dispatch({
      type: "set",
      payload: { msg: `This is the ${e.target.dataset.type} alert`, type: e.target.dataset.type }
    });
  };

  const handleBigAlert = e => {
    Alert.dispatch({
      type: "set",
      payload: { msg: bigComponent(), type: e.target.dataset.type }
    });
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Alert</h1>
      <p>At this time only one alert can be visible. Next alert will replace previous.</p>
      <Button onClick={handleAlert}>
        Default!
      </Button>
      <Button addClass="ml-2 success" data-type="success" onClick={handleAlert}>
        Success!
      </Button>
      <Button addClass="ml-2 warning" data-type="warning" onClick={handleAlert}>
        Warning!
      </Button>
      <Button addClass="ml-2 danger" data-type="error" onClick={handleAlert}>
        Error!
      </Button>
      <Button addClass="ml-2 info" data-type="info" onClick={handleAlert}>
        Info!
      </Button>
      <h3 className="mt-3">Any payload</h3>
      <p>Components inside alerts are also supported. I should tweak CSS for it.</p>
      <Button addClass="info" data-type="info" onClick={handleBigAlert}>
        Long!
      </Button>
    </div>
  );
};

function bigComponent() {
  return (
    <div>
      <h2>Paragraph</h2>
      <p>This is a pragraph with standard lorem ipsum fill. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>Lists</h2>
      <h3>Unordered list</h3>
      <ul>
        <li>Red</li>
        <li>Green</li>
        <li>Blue</li>
        <li>Alpha</li>
      </ul>
    </div>
  )
}

export default Alerts;
