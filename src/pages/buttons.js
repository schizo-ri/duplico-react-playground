import React from "react";
import { Button, Dropdown } from "../components/Button";

const Buttons = () => {
  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Buttons</h1>
      <section>
        <h2>Standard</h2>
        <p />
        <Button>default</Button>
        <Button addClass="ml-2 brand">brand</Button>
        <Button addClass="ml-2 danger">danger</Button>
        <Button addClass="ml-2 success">success</Button>
        <Button addClass="ml-2 info">info</Button>
        <Button addClass="ml-2 warning">warning</Button>
        <Button addClass="ml-2" disabled>
          disabled
        </Button>
        <Button addClass="ml-2 menu-dots" />
      </section>
      <section className="mt-3">
        <h2>Empty buttons</h2>
        <p>
          Same properties as standard buttons only no fill. You should be more
          descriptive when using these.
        </p>
        <Button addClass="btn-empty">default</Button>
        <Button addClass="btn-empty ml-2 brand">brand</Button>
        <Button addClass="btn-empty ml-2 danger">danger</Button>
        <Button addClass="btn-empty ml-2 success">success</Button>
        <Button addClass="btn-empty ml-2 info">info</Button>
        <Button addClass="btn-empty ml-2 warning">warning</Button>
        <Button addClass="btn-empty ml-2" disabled>
          disabled
        </Button>
        <Button addClass="btn-empty ml-2 menu-dots" />
        <span className="bg-dark ml-2">
          <Button addClass="btn-empty white">white</Button>
        </span>
      </section>
      <section className="mt-3">
        <h2>Text buttons</h2>
        <p>
          Same properties as empty buttons but created to blend into text
          seamlessly. Although I'm not sure about the use case and a11y.
        </p>
        <Button addClass="btn-text">default</Button>
        <Button addClass="btn-text ml-2 brand">brand</Button>
        <Button addClass="btn-text ml-2 danger">danger</Button>
        <Button addClass="btn-text ml-2" disabled>
          disabled
        </Button>
        <span className="bg-dark ml-2">
          <Button addClass="btn-text white">white</Button>
        </span>
      </section>
      <section className="mt-3">
        <h2>Dropdown</h2>
        <p>
          Dropdown list position should be automatically calculated. Test with
          the one on the right. Children can be anything I think but for
          positioning to work children should be 1 or 2 levels deep.
        </p>
        <div className="flex jcb">
          <Dropdown id="dd-demo" className="btn" text="Pick a color">
            <Button addClass="btn-empty">Red</Button>
            <Button addClass="btn-empty">Green</Button>
            <Button addClass="btn-empty">Blue</Button>
            <Button addClass="btn-empty">Alpha</Button>
            <Button addClass="btn-empty">Red Green Blue Alpha</Button>
          </Dropdown>
          <Dropdown id="dd-demo" className="btn info" text="Positioning">
            <ul className="list-unstyled p-2">
              <li>Red</li>
              <li>Green</li>
              <li>Blue</li>
              <li>Alpha</li>
              <li>Red Green Blue Alpha</li>
            </ul>
          </Dropdown>
        </div>
      </section>
    </div>
  );
};

export default Buttons;
