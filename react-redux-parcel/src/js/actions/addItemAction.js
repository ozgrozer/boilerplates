const addItemAction = (id, title) => ({
  type: 'ADD_ITEM',
  payload: {
    id: id,
    title: title
  }
})

export default addItemAction
