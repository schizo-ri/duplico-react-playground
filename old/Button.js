import React from "react";

const Button = props => (
  <button className={`${props.className}`} type="button" disabled={props.disabled}>
    {props.text}
  </button>
);

export { Button };
