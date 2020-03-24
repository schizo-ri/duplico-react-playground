import React, { useState, useLayoutEffect, useEffect } from "react";
import "../styles/Navigation.css";
import shortid from "shortid";

const AnchorsNav = ({
  initial,
  navClass = "anchor-nav",
  listClass = "list-unstyled",
  linkClass = "anchor",
  activeLinkClass = "anchor-active",
  childrenPosition = "top",
  ...props
}) => {
  const [active, setActive] = useState(
    initial || window.location.hash.slice(1)
  );
  const [anchors, setAnchors] = useState([])

  // useEffect(() => {
  //   const headings = props.children.reduce((agg, child) => {
  //     console.log(child)
  //     if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.type) && child.props.id) {
  //       return [...agg, child.props.id]
  //     }
  //     return agg
  //   }, []);
  //   console.log(headings)
  //   setAnchors(headings)
  // }, [props.children, setAnchors]);

  return (
    <section>
      <nav className={navClass}>
        <ul>
          {anchors.map(anchor => (
            <li key={anchor}>
              <a href={"#" + anchor} className={`${linkClass}${anchor === active ? activeLinkClass : ''}`} onClick={() => setActive(anchor)}>{anchor}</a>
            </li>
          ))}
        </ul>
      </nav>
      {props.children}
    </section>
  );
};

export { AnchorsNav };

// automatsko stvaranje anchor navigacije
// wrapamo sve u anchor, pretrazimo djecu gdje su heading tagovi
// indentamo prema headingu, dodamo prop od kojeg broja zelimo raditi indent
// dodamo data atribute da mozemo pratiti
// observable?https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// const observer = new IntersectionObserver(showClient, {
//   root: null,
//   rootMargin: '64px 0px 64px 0px',
//   threshold: [0, 1],
// })
// const clients = [...clientsRoot.querySelectorAll('[rel="client-box"]')]
// for (const client of clients) {
//   observer.observe(client)
// }

// function showClient(entries, observer) {
//   for (const entry of entries) {
//     if (entry.intersectionRatio > 0) {
//       requestIdleCallback(
//         () => entry.target.classList.replace('hidden', 'fade-in'),
//         {
//           timeout: 250,
//         }
//       )
//       const logo = entry.target.querySelector('img[data-replace-src]')
//       if (!!logo.dataset.replaceSrc) {
//         setTimeout(() => (logo.src = logo.dataset.replaceSrc), 250)
//       }
//       observer.unobserve(entry.target)
//     }
//   }
// }
