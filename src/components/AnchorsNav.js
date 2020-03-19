import React, { useState, useLayoutEffect } from 'react'
import '../styles/Navigation.css'

// treba imat i data i children
// data je array, znaci flat lista, objekt je flat sa keyem za parent
// prop za poziciju childrena, gore ili dole 
// class za nav  

const AnchorsNav = ({
  data = [],
  navClass = 'anchor-nav',
  listClass = 'list-unstyled',
  linkClass = 'anchor-link',
  activeLinkClass = 'anchor-link-active',
  childrenPosition = 'top',
  children,
  ...props
}) => {
  const [active, setActive] = useState(window.location)

  return (
    <section>
      <nav className={props.navClass}>
        <ul>
          {props.children
            ? props.children.map(child => <li>{child}</li>)
            : props.anchors.map(anchor => (
                <li>
                  <a href={'#' + anchor}>{anchor}</a>
                </li>
              ))}
        </ul>
      </nav>
      {children}
    </section>
  )
}

// automatsko stvaranje anchor navigacije
wrapamo sve u anchor, pretrazimo djecu gdje su heading tagovi
indentamo prema headingu, dodamo prop od kojeg broja zelimo raditi indent
dodamo data atribute da mozemo pratiti 
observable?https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observer = new IntersectionObserver(showClient, {
  root: null,
  rootMargin: '64px 0px 64px 0px',
  threshold: [0, 1],
})
const clients = [...clientsRoot.querySelectorAll('[rel="client-box"]')]
for (const client of clients) {
  observer.observe(client)
}

function showClient(entries, observer) {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      requestIdleCallback(
        () => entry.target.classList.replace('hidden', 'fade-in'),
        {
          timeout: 250,
        }
      )
      const logo = entry.target.querySelector('img[data-replace-src]')
      if (!!logo.dataset.replaceSrc) {
        setTimeout(() => (logo.src = logo.dataset.replaceSrc), 250)
      }
      observer.unobserve(entry.target)
    }
  }
}
