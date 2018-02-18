const initialValues = [
  {id: 0, title: 'watch movie'},
  {id: 1, title: 'play game'}
]

const todoReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      state = [...state, action.payload]
      break
  }

  return state
}

export default todoReducer
