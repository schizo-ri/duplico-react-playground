import React, { useState } from 'react'
import { Button } from '../components/Button'
import { pickRandomFromArray } from '../utils'

const Home = () => (
  <div className="p-3">
    <h1>Home</h1>
    <p>Some basic components with styles. Or other way around. Intended for future projects.</p>
    <p>
      General stuff like cards and tables are here, more specific ones are on a separate pages. Only drafts. Things will
      change. Responsivness is not the goal for this pages. I don't even like general solutions for grids and
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
        <div className="bd-cold p-3">
          <h3>This is a card</h3>
          <section>
            Card styling can be done with utility classes. No need to bloat your custom css. Although you can then say
            that we are bloating HTML instead.
          </section>
        </div>
        <div className="bg-cold flex py-2">
          <Button className="btn-empty info ml-auto">Card action</Button>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <img className="block w-100" src="images/corny_sauna.jpg" alt="Profile." />
        <div className="bd-cold p-3">
          <h3>With top pic</h3>
          <section>
            Also done with utility classes. Image can be profile pic, featured image or something else. I'm just
            rambling to fill with text.
          </section>
        </div>
        <div className="bg-cold flex py-2">
          <Button className="btn-empty danger ml-auto">Card action</Button>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <div className="bd-cold p-3">
          <header className="flex aic">
            <div className="crop crop-sm">
              <img className="profile-pic" src="images/corny_sauna.jpg" alt="Profile." />
            </div>
            <h3 className="ml-3">Person Left</h3>
            <Button addClass="btn-empty ml-auto menu-dots" />
          </header>
          <section className="mt-2">
            Profile pic is croped and rounded with CSS since it's not square. Maybe this button on the right should be
            more obvious. It's ok if menu actions are not that important.
          </section>
        </div>
      </div>
      <div className="shadow-lg bg-white mb-3">
        <div className="bd-cold p-3">
          <header className="flex aic">
            <ProfilePicUpload pic={false} id="user-1" />
            <h3 className="ml-3">Person Left</h3>
            <Button addClass="btn-empty ml-auto menu-dots" />
          </header>
          <section className="mt-2">
            This is a card with the profile pic upload option. This is just for demonstartion, usally you don't put it
            directly on a card like this.
          </section>
        </div>
      </div>
    </div>
    <section className="my-3">
      <h3>Table</h3>
      <div className="shadow-lg bg-white mb-3 rounded">
        <table className="table">
          <thead className="bg-cold">
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
  </div>
)

const ProfilePicUpload = props => {
  const [pic, setPic] = useState(props.pic)
  const mixSymbols =
    pic || pickRandomFromArray([9728, 9734, 9731, 9752, 9774, 9786, 9788, 9835, 9895, 10047, 10052, 10084])
  const mixPlaceholderColor = pic
    ? ''
    : `profile-placeholder c-${pickRandomFromArray(['teal', 'yellow', 'cyan', 'gray4', 'purple', 'indigo', 'red'])}`

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
            <img className="profile-pic image-upload-label" src={pic} alt="Click/enter to upload" />
          ) : (
            <span className={mixPlaceholderColor}>{String.fromCharCode(mixSymbols)}</span>
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
