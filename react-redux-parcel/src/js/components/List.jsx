import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    todo: store.todo
  }
})

class List extends React.Component {
  render () {
    const todoItems = this.props.todo.map((item) => {
      return (
        <li key={item['id']}>
          {item['title']}
        </li>
      )
    })

    return (
      <ul>
        {todoItems}
      </ul>
    )
  }
}

export default List
