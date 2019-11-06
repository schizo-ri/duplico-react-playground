import React, { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { Button } from "../components/Button";

const Alerts = () => {
  const Alert = useContext(AlertContext);

  const handleAlert = e => {
    Alert.dispatch({
      type: "set",
      payload: { msg: `This a(n) ${e.target.dataset.type} alert`, type: e.target.dataset.type }
    });
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Alert</h1>
      <p>At this time only one alert can be visible. Next alert will replace previous.</p>
      <Button onClick={handleAlert}>
        Default!
      </Button>
      <Button addClass="ml-2" data-type="success" onClick={handleAlert}>
        Success!
      </Button>
      <Button addClass="ml-2" data-type="warning" onClick={handleAlert}>
        Warning!
      </Button>
      <Button addClass="ml-2" data-type="error" onClick={handleAlert}>
        Error!
      </Button>
      <Button addClass="ml-2" data-type="info" onClick={handleAlert}>
        Info!
      </Button>
    </div>
  );
};

export default Alerts;
