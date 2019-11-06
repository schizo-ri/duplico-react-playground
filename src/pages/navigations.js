import React, { useState } from "react";
import { Button } from "../components/Button";

const Navigations = () => {
  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Navigations</h1>
      <section>
        <h2>Main menu</h2>
        <p>
          Example above. Menu should expand when all of the items can fit to
          screen. It's quite lacking for now as the collapse point is just a
          estimate.
        </p>
      </section>
      <section>
        <h2>Tabs</h2>
        <p>No standard component for now. It's fairly easy to implement.</p>
        <Tabs />
      </section>
    </div>
  );
};

const Tabs = props => {
  const [idx, setIdx] = useState(1)

  const handleTabSwitch = e => {
    const idx = e.target.dataset.idx
    setIdx(Number(idx))
  }

  return (
    <>
      <div className="tab-links">
        <Button addClass={[idx === 1 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="1" onClick={handleTabSwitch}>Red</Button>
        <Button addClass={[idx === 2 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="2" onClick={handleTabSwitch}>Green</Button>
        <Button addClass={[idx === 3 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="3" onClick={handleTabSwitch}>Blue</Button>
      </div>
      <div className="bdt-gray">
        <div className={idx !== 1 && 'd-none'}><span className="c-red">Red</span></div>
        <div className={idx !== 2 && 'd-none'}><span className="c-green">Green</span></div>
        <div className={idx !== 3 && 'd-none'}><span className="c-blue">Blue</span></div>
      </div>
    </>
  )
}
export default Navigations;
