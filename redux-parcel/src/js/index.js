import store from './store/index'

store.subscribe(() => {
  console.log('store changed:', store.getState())
})

store.dispatch({ type: 'CHANGE_NAME', payload: 'Jack' })

window.setTimeout(() => {
  store.dispatch({ type: 'CHANGE_NAME', payload: 'John' })
}, 1000)

window.setTimeout(() => {
  store.dispatch({ type: 'CHANGE_AGE', payload: 25 })
}, 2000)
