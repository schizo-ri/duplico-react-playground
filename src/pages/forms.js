import React, { useState } from "react";
import {
  ToggleToken,
  ToggleTokens,
  Input,
  Select,
  Switch
} from "../components/Form";
import { Button } from "../components/Button";

const Forms = () => {
  const [inp, setInp] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inp);
  };

  return (
    <div style={{ width: "600px", padding: "0 1rem" }}>
      <h1>Forms</h1>
      <form action="" onSubmit={handleSubmit}>
        <h2>Inputs</h2>
        <h3>Standard</h3>
        <Input
          id="text-input"
          label="Text input"
          placeholder="Some text"
          onChange={e => setInp(e.target.value)}
        />
        <Input
          id="datalist-input"
          label="Datalist"
          list="ice-cream-flavors"
          placeholder="Input new or select option"
        />
        <datalist id="ice-cream-flavors">
          <option value="Chocolate" />
          <option value="Coconut" />
          <option value="Mint" />
          <option value="Strawberry" />
          <option value="Vanilla" />
        </datalist>
        <Input
          id="number-input"
          type="number"
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
        <Input
          id="date-input"
          type="date"
          label="Date input"
          note="Date in month/day/year format"
        />
        <Input
          id="time-input"
          type="time"
          label="Time input"
          note="12-houre time format"
        />
        <Input
          id="datetime-input"
          type="datetime-local"
          label="Datetime input"
        />
        <Select id="select-input" label="Select">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
        <h3>File upload</h3>
        <Input id="file-input" type="file" label="Not really styled" />
        <Button type="submit" addClass=" ml-auto success">
          Submit
        </Button>
      </form>
      <section className="mt-3">
        <h2>Toggle tokens</h2>
        <h3 className="mt-2">Checkboxes</h3>
        <div className="flex">
          <ToggleToken id="ttc-red">Red</ToggleToken>
          <ToggleToken id="ttc-green">Green</ToggleToken>
          <ToggleToken id="ttc-blue">Blue</ToggleToken>
        </div>
        <div className="flex">
          <ToggleTokens
            className="flex mt-2"
            type="checkbox"
            name="maybe-simpler"
          >
            {[
              ["maybe-simpler-red", "Red"],
              ["maybe-simpler-green", "Green"],
              ["maybe-simpler-blue", "Blue"]
            ]}
          </ToggleTokens>
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
        <h3 className="mt-2">Switches</h3>
        <div className="flex column">
          <div class="switch mb-3">
            <input type="checkbox" id="ex-form-switch" class="switch-input" />
            <label for="ex-form-switch" class="switch-label">
              Toggle
            </label>
          </div>
          <Switch id="switch-component">From component</Switch>
        </div>
      </section>
      <section className="my-3">
        <h3>Fields and legends</h3>
        <form action="" className="flex column">
          <fieldset className="field">
            <legend>
              <em>this part of form is emphasized for some reason</em>
            </legend>
            <div className="flex column">
              <Input
                id="text-input-2"
                label="Text input"
                placeholder="Some text"
              />
              <Select id="select-input-2" label="Select">
                <option>Red</option>
                <option>Green</option>
                <option>Blue</option>
              </Select>
              <div className="flex">
                <ToggleToken id="ttr-red-2" type="radio" name="colors">
                  Red
                </ToggleToken>
                <ToggleToken id="ttr-green-2" type="radio" name="colors">
                  Green
                </ToggleToken>
                <ToggleToken id="ttr-blue-2" type="radio" name="colors">
                  Blue
                </ToggleToken>
              </div>
            </div>
          </fieldset>
          <Button addClass=" ml-auto success">Submit</Button>
        </form>
      </section>
    </div>
  );
};

export default Forms;
