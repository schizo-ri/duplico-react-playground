import React, {
  useState,
  // useCallback,
  // useLayoutEffect,
  useEffect
} from "react";
import "../styles/Navigation.css";
// import shortid from "shortid";

const AnchorsNav = ({
  initial,
  navClass = "anchor-nav",
  listClass = "unlist",
  linkClass = "anchor",
  activeLinkClass = "anchor-active",
  navPosition = "left",
  ...props
}) => {
  const [active, setActive] = useState(
    initial || window.location.hash.slice(1)
  );
  const [anchors, setAnchors] = useState([]);

  useEffect(() => {
    const headings = props.children.reduce((agg, child) => {
      if (
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(child.type) &&
        child.props.id
      ) {
        return [
          ...agg,
          {
            id: child.props.id,
            text: child.props.children,
            indent: child.type.substr(1, 1)
          }
        ];
      }
      return agg;
    }, []);
    console.log(headings);
    setAnchors(headings);
  }, []);

  // const observer = new IntersectionObserver(activeAnchor, {
//   root: null,
//   rootMargin: '64px 0px 64px 0px',
//   threshold: [0, 1],
// })
// const clients = [...clientsRoot.querySelectorAll('[rel="client-box"]')]
// for (const client of clients) {
//   observer.observe(client)
// }

// function activeAnchor(entries, observer) {
//   for (const entry of entries) {
//     if (entry.intersectionRatio > 0) {
//       requestIdleCallback(
//         () => setActive(entry.id),
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


  return (
    <section className="anchor-wrap mb-5">
      <nav className={navClass}>
        <ul className="unlist">
          {anchors.map(anchor => (
            <li key={anchor.id}>
              <a
                href={"#" + anchor.id}
                className={`${linkClass} ${
                  anchor.id === active ? activeLinkClass : ""
                }`}
                style={{ paddingLeft: `${anchor.indent / 2}rem` }}
                onClick={() => setActive(anchor.id)}
              >
                {anchor.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="anchored-content">{props.children}</div>
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
