import React from "react";

const Typography = () => {
  return (
    <div style={{ width: "600px", padding: "0 1rem" }}>
      <h1>Typography, also a {'<h1>'} element</h1>
      <h2>Headings, also a {'<h2>'} element</h2>
      <h3>3rd level headings</h3>
      <h4>4th level headings</h4>
      <h5>5th level headings</h5>
      <h6>6th level headings</h6>
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
      <h3>Ordered list</h3>
      <ol>
        <li>Red</li>
        <li>Green</li>
        <li>Blue</li>
        <li>Alpha</li>
      </ol>
      <h3>Unstyled list</h3>
      <p><small>Is there any meaningful use case for this? BTW this is a {'<small>'} text</small></p>
      <h3>Definition list</h3>
      <p>tba</p>
    </div>
  );
};

export default Typography;
