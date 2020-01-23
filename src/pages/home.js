import React, { useState } from 'react'
import { Button } from '../components/Button'
import { pickRandomFromArray } from '../utils'

const Home = () => (
  <div className="p-3">
    <h1>Home</h1>
    <p>
      Some basic components with styles. Or other way around. Intended for
      future projects.
    </p>
    <p>
      General stuff like cards and tables are here, more specific ones are on a
      separate pages. Only drafts. Things will change. Responsivness is not the
      goal for this pages. I don't even like general solutions for grids and
      responsivness, they are never enough. Just KISS people!
    </p>
    <div className="shadow-lg bg-white mb-3 rounded p-2 mw-mobile">
      <h3>Things to do</h3>
      <ul>
        <li>a11Y</li>
        <li>Trim unused CSS and add more utility classes</li>
        <li>Integrated Input warnings (like notes)</li>
        <li>Elements inside Inputs like 'show password'</li>
        <li>Switches alongside toggles maybe</li>
        <li>Light/dark theme detect and switch</li>
      </ul>
    </div>
    <h3>Cards</h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, var(--width-mobile))',
        gridGap: 'var(--gap)',
        alignItems: 'start',
      }}
    >
      <div className="shadow-lg bg-white mb-3">
        <div className="p-3">
          <h3>This is a card</h3>
          <section>
            Card styling can be done with utility classes. No need to bloat your
            custom css. Although you can then say that we are bloating HTML
            instead.
          </section>
        </div>
        <div className="bg-light rounded-bottom flex py-2">
          <Button className="btn-empty info ml-auto">Card action</Button>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <img
          className="block w-100 rounded-top"
          src="images/corny_sauna.jpg"
          alt="Profile."
        />
        <div className="bd-cold p-3">
          <h3>With top pic</h3>
          <section>
            Also done with utility classes. Image can be profile pic, featured
            image or something else. I'm just rambling to fill with text.
          </section>
        </div>
        <div className="rounded-bottom flex py-2">
          <Button className="btn-empty danger ml-auto">Card action</Button>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <div className="p-3">
          <header className="flex aic">
            <div className="crop crop-sm">
              <img
                className="profile-pic"
                src="images/corny_sauna.jpg"
                alt="Profile."
              />
            </div>
            <h3 className="ml-3">Person Left</h3>
            <Button addClass="btn-empty ml-auto menu-dots" />
          </header>
          <section className="mt-2">
            Profile pic is croped and rounded with CSS since it's not square.
            Maybe this button on the right should be more obvious. It's ok if
            menu actions are not that important.
          </section>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <header className="flex aic bg-light rounded-top">
          <ProfilePicUpload pic={false} id="user-1" />
          <h3 className="ml-3">Person Left</h3>
          <Button addClass="btn-empty ml-auto menu-dots" />
        </header>
        <section className="mt-2 p-3">
          This is a card with the profile pic upload option. This is just for
          demonstartion, usally you don't put it directly on a card like this.
        </section>
      </div>
    </div>
    <section className="my-3">
      <h3>Table</h3>
      <div className="mb-3 rounded">
        <table className="table shadow-lg bg-white">
          <thead className="bg-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section className="my-3">
      <h3>Colors</h3>
      <div className="flex wrap">
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--cold-white)',
              color: 'var(--cold-gray4)',
            }}
            className="p-3 m-0"
          >
            bg cold-white, c cold-gray4
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-gray1)',
              color: 'var(--cold-gray4)',
            }}
            className="p-3 m-0"
          >
            bg cold-gray1, c cold-gray4
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-gray2)',
              color: 'var(--cold-black)',
            }}
            className="p-3 m-0"
          >
            bg cold-gray2, c cold-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-gray)',
              color: 'var(--cold-black)',
            }}
            className="p-3 m-0"
          >
            bg cold-gray, c cold-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-gray3)',
              color: 'var(--cold-white)',
            }}
            className="p-3 m-0"
          >
            bg cold-gray3, c cold-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-gray4)',
              color: 'var(--cold-white)',
            }}
            className="p-3 m-0"
          >
            bg cold-gray4, c cold-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--cold-black)',
              color: 'var(--cold-gray1)',
            }}
            className="p-3 m-0"
          >
            bg cold-black, c cold-gray1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--warm-white)',
              color: 'var(--warm-gray4)',
            }}
            className="p-3 m-0"
          >
            bg warm-white, c warm-gray4
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-gray1)',
              color: 'var(--warm-gray4)',
            }}
            className="p-3 m-0"
          >
            bg warm-gray1, c warm-gray4
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-gray2)',
              color: 'var(--warm-black)',
            }}
            className="p-3 m-0"
          >
            bg warm-gray2, c warm-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-gray)',
              color: 'var(--warm-black)',
            }}
            className="p-3 m-0"
          >
            bg warm-gray, c warm-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-gray3)',
              color: 'var(--warm-white)',
            }}
            className="p-3 m-0"
          >
            bg warm-gray3, c warm-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-gray4)',
              color: 'var(--warm-white)',
            }}
            className="p-3 m-0"
          >
            bg warm-gray4, c warm-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--warm-black)',
              color: 'var(--warm-gray1)',
            }}
            className="p-3 m-0"
          >
            bg warm-black, c warm-gray1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--blue-white)',
              color: 'var(--blue4)',
            }}
            className="p-3 m-0"
          >
            bg blue-white, c blue4
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue1)',
              color: 'var(--blue-black)',
            }}
            className="p-3 m-0"
          >
            bg blue1, c blue-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue2)',
              color: 'var(--blue-black)',
            }}
            className="p-3 m-0"
          >
            bg blue2, c blue-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue)',
              color: 'var(--blue-white)',
            }}
            className="p-3 m-0"
          >
            bg blue, c blue-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue3)',
              color: 'var(--blue-white)',
            }}
            className="p-3 m-0"
          >
            bg blue3, c blue-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue4)',
              color: 'var(--blue-white)',
            }}
            className="p-3 m-0"
          >
            bg blue4, c blue-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--blue-black)',
              color: 'var(--blue1)',
            }}
            className="p-3 m-0"
          >
            bg blue-black, c blue1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--cyan-white)',
              color: 'var(--cyan4)',
            }}
            className="p-3 m-0"
          >
            bg cyan-white, c cyan4
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan1)',
              color: 'var(--cyan-black)',
            }}
            className="p-3 m-0"
          >
            bg cyan1, c cyan-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan2)',
              color: 'var(--cyan-black)',
            }}
            className="p-3 m-0"
          >
            bg cyan2, c cyan-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan)',
              color: 'var(--cyan-white)',
            }}
            className="p-3 m-0"
          >
            bg cyan, c cyan-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan3)',
              color: 'var(--cyan-white)',
            }}
            className="p-3 m-0"
          >
            bg cyan3, c cyan-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan4)',
              color: 'var(--cyan-white)',
            }}
            className="p-3 m-0"
          >
            bg cyan4, c cyan-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--cyan-black)',
              color: 'var(--cyan1)',
            }}
            className="p-3 m-0"
          >
            bg cyan-black, c cyan1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--teal-white)',
              color: 'var(--teal4)',
            }}
            className="p-3 m-0"
          >
            bg teal-white, c teal4
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal1)',
              color: 'var(--teal-black)',
            }}
            className="p-3 m-0"
          >
            bg teal1, c teal-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal2)',
              color: 'var(--teal-black)',
            }}
            className="p-3 m-0"
          >
            bg teal2, c teal-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal)',
              color: 'var(--teal-white)',
            }}
            className="p-3 m-0"
          >
            bg teal, c teal-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal3)',
              color: 'var(--teal-white)',
            }}
            className="p-3 m-0"
          >
            bg teal3, c teal-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal4)',
              color: 'var(--teal1)',
            }}
            className="p-3 m-0"
          >
            bg teal4, c teal1
          </p>
          <p
            style={{
              backgroundColor: 'var(--teal-black)',
              color: 'var(--teal1)',
            }}
            className="p-3 m-0"
          >
            bg teal-black, c teal1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--yellow-white)',
              color: 'var(--yellow4)',
            }}
            className="p-3 m-0"
          >
            bg yellow-white, c yellow4
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow1)',
              color: 'var(--yellow-black)',
            }}
            className="p-3 m-0"
          >
            bg yellow1, c yellow-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow2)',
              color: 'var(--yellow-black)',
            }}
            className="p-3 m-0"
          >
            bg yellow2, c yellow-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow)',
              color: 'var(--yellow-white)',
            }}
            className="p-3 m-0"
          >
            bg yellow, c yellow-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow3)',
              color: 'var(--yellow-white)',
            }}
            className="p-3 m-0"
          >
            bg yellow3, c yellow-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow4)',
              color: 'var(--yellow-white)',
            }}
            className="p-3 m-0"
          >
            bg yellow4, c yellow-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--yellow-black)',
              color: 'var(--yellow1)',
            }}
            className="p-3 m-0"
          >
            bg yellow-black, c yellow1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--orange-white)',
              color: 'var(--orange4)',
            }}
            className="p-3 m-0"
          >
            bg orange-white, c orange4
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange1)',
              color: 'var(--orange-black)',
            }}
            className="p-3 m-0"
          >
            bg orange1, c orange-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange2)',
              color: 'var(--orange-black)',
            }}
            className="p-3 m-0"
          >
            bg orange2, c orange-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange)',
              color: 'var(--orange-white)',
            }}
            className="p-3 m-0"
          >
            bg orange, c orange-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange3)',
              color: 'var(--orange-white)',
            }}
            className="p-3 m-0"
          >
            bg orange3, c orange-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange4)',
              color: 'var(--orange1)',
            }}
            className="p-3 m-0"
          >
            bg orange4, c orange1
          </p>
          <p
            style={{
              backgroundColor: 'var(--orange-black)',
              color: 'var(--orange1)',
            }}
            className="p-3 m-0"
          >
            bg orange-black, c orange1
          </p>
        </div>
        <div className="max-w-mobile">
          <p
            style={{
              backgroundColor: 'var(--red-white)',
              color: 'var(--red4)',
            }}
            className="p-3 m-0"
          >
            bg red-white, c red4
          </p>
          <p
            style={{
              backgroundColor: 'var(--red1)',
              color: 'var(--red-black)',
            }}
            className="p-3 m-0"
          >
            bg red1, c red-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--red2)',
              color: 'var(--red-black)',
            }}
            className="p-3 m-0"
          >
            bg red2, c red-black
          </p>
          <p
            style={{
              backgroundColor: 'var(--red)',
              color: 'var(--red-white)',
            }}
            className="p-3 m-0"
          >
            bg red, c red-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--red3)',
              color: 'var(--red-white)',
            }}
            className="p-3 m-0"
          >
            bg red3, c red-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--red4)',
              color: 'var(--red-white)',
            }}
            className="p-3 m-0"
          >
            bg red4, c red-white
          </p>
          <p
            style={{
              backgroundColor: 'var(--red-black)',
              color: 'var(--red1)',
            }}
            className="p-3 m-0"
          >
            bg red-black, c red1
          </p>
        </div>
      </div>
    </section>
  </div>
)

const ProfilePicUpload = props => {
  const [pic, setPic] = useState(props.pic)
  const mixSymbols =
    pic ||
    pickRandomFromArray([
      9728,
      9734,
      9731,
      9752,
      9774,
      9786,
      9788,
      9835,
      9895,
      10047,
      10052,
      10084,
    ])
  const mixPlaceholderColor = pic
    ? ''
    : `profile-placeholder c-${pickRandomFromArray([
        'teal',
        'yellow',
        'cyan',
        'gray4',
        'purple',
        'indigo',
        'red',
      ])}`

  const handlePicChange = e => {
    setPic(window.URL.createObjectURL(e.target.files[0]))
  }

  const handlePicRemove = e => {
    setPic(false)
  }

  const handlePicRestore = e => {
    props.pic ? setPic(props.pic) : setPic(false)
  }

  return (
    <div>
      <div className="flex row ais">
        <label htmlFor={props.id} className="crop crop-sm">
          {pic ? (
            <img
              className="profile-pic image-upload-label"
              src={pic}
              alt="Click/enter to upload"
            />
          ) : (
            <span className={mixPlaceholderColor}>
              {String.fromCharCode(mixSymbols)}
            </span>
          )}
          <input
            id={props.id}
            className="hidden"
            accept="image/*"
            name="profile"
            type="file"
            onChange={handlePicChange}
          />
        </label>
        <div className={pic ? 'flex column' : 'hidden'}>
          <button
            className="btn-text danger"
            type="button"
            onClick={handlePicRemove}
            title="Remove picture."
            aria-label="Remove picture."
          >
            <span>{String.fromCharCode(10007)}</span>
          </button>
          <button
            className="btn-text warning"
            type="button"
            onClick={handlePicRestore}
            title="Restore picture."
            aria-label="Restore picture."
          >
            <span>{String.fromCharCode(8635)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
