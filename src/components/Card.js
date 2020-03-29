import React from "react";
import "../styles/Card.css";

const Card = ({ children, className = "", ...props }) => {
  const classes = `card ${className}`;
  return <div className={classes}>{children}</div>;
};

const CardBody = ({ children, className = "", ...props }) => {
  const classes = `card-body ${className}`;
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

const CardTitle = ({ children, className = "", ...props }) => {
  const classes = `card-title ${className}`;
  return (
    <header className={classes} {...props}>
      {children}
    </header>
  );
};

const CardFooter = ({ children, className = "", ...props }) => {
  const classes = `card-footer ${className}`;
  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  );
};

export { Card, CardBody, CardTitle, CardFooter };
