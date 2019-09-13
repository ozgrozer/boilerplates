import { h, app } from 'hyperapp'

app({
  init: 0,
  view: state =>
    h('div', {}, [
      h('h1', {}, state),
      h('button', { onClick: state => state - 1 }, '-'),
      h('button', { onClick: state => state + 1 }, '+')
    ]),
  node: document.getElementById('root')
})
