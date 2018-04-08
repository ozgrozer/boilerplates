import React from 'react'
import { connect } from 'react-redux'

import { addItem } from './../actions/index'

@connect((store) => {
  return {
    todo: store.todo
  }
})

class Add extends React.Component {
  constructor () {
    super()
    this.state = {
      title: ''
    }
  }

  handleChange (e) {
    this.setState({ title: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const newId = this.props.todo.length
    const title = this.state.title
    this.props.dispatch(addItem(newId, title))
    this.setState({ title: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type='text'
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
        />
        <input type='submit' value='add' />
      </form>
    )
  }
}

export default Add
