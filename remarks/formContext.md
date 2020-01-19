# How to do a form with useContext?

Can't figure out how to create a form with it's children using Context for sharing state. Every dispatch from a child re-renders child so no input is possible. I have given up for now. I'm putting it all in one component and use reducer for state management.

UPDATE: It looks like it's not because of context, at least not form context.

- And it's not because of redurer!
- It's happening even with useState!!!
- Stepper component could be the faulty one.
- It works as expected without useEffect hook!
- Specifically setting `ids` array for showing steps. Setting keys in useState hook to `['a', 'b', 'c']` works ok, but setting variable iterating over children to `ids` variable causes same problems
- Why first line causes no problem, but the second one does?

```js
const [ids, setIds] = useState(Array.from(Array(children.length), _ => shortid.generate()))
const ids = Array.from(Array(children.length), _ => shortid.generate())
```

Semi-working example: https://codesandbox.io/s/7j5pjw51pj
