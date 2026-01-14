import { useState } from 'react'

function App () {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 'bold' }}>Hello world!</div>

      <div>
        <button
          onClick={() => setCount(count => count + 1)}
          style={{
            fontSize: 16,
            marginTop: 10,
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'default',
            padding: '10px 20px',
            backgroundColor: '#007bff'
          }}
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
