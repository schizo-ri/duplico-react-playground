import React from "react";
import { ToggleToken, Input, Select } from "../components/Form";

const Forms = () => (
  <div style={{ width: "600px", padding: "0 1rem" }}>
    <h1>Forms</h1>
    <section>
      <h2>Inputs</h2>
      <h3>Standard</h3>
      <Input id="text-input" label="Text input" placeholder="Some text" />
      <Input
        id="number-input"
        type="number"
        value="42"
        label="Number input"
        placeholder="Some number"
      />
      <Input
        id="email-input"
        type="email"
        label="Email input"
        placeholder="Expecting email"
        note="What is a difference between text and email input?"
      />
      <Input
        id="password-input"
        type="password"
        label="Password input"
        placeholder="Wachit!"
      />
      <Input id="date-input" type="date" label="Date input" note="Only date" />
      <Input id="time-input" type="time" label="Time input" />
      <Input id="datetime-input" type="datetime-local" label="Datetime input" />
      <Select id="select-input" label="Select">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
      <h3>Radios and Checkboxes</h3>
    </section>
    <section className="mt-3">
      <h2>Toggle tokens</h2>
      <h3 className="mt-2">Checkboxes</h3>
      <div className="flex">
        <ToggleToken id="ttc-red">Red</ToggleToken>
        <ToggleToken id="ttc-green">Green</ToggleToken>
        <ToggleToken id="ttc-blue">Blue</ToggleToken>
      </div>
      <h3 className="mt-2">Radios</h3>
      <div className="flex">
        <ToggleToken id="ttr-red" type="radio" name="colors">
          Red
        </ToggleToken>
        <ToggleToken id="ttr-green" type="radio" name="colors">
          Green
        </ToggleToken>
        <ToggleToken id="ttr-blue" type="radio" name="colors">
          Blue
        </ToggleToken>
      </div>
    </section>
  </div>
);

export default Forms;
