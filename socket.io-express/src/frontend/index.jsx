import { useEffect } from 'react'
import io from 'socket.io-client'
import { createRoot } from 'react-dom/client'

const socket = io('http://localhost:1235')

const App = () => {
  useEffect(() => {
    socket.on('event2', comingData => {
      console.log('coming data from server to client:', comingData)
    })
  }, [])

  const sendDataToServer = () => {
    socket.emit('event1', 'sending data from client to server')
  }

  return (
    <button onClick={sendDataToServer}>
      send data to server
    </button>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
