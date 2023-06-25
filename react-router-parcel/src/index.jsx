import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      {' - '}
      <Link to='/users/1'>User 1</Link>
      {' - '}
      <Link to='/users/2'>User 2</Link>
    </div>
  )
}

const Home = () => (
  <div>Home</div>
)

const User = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/users/${userId}`)
      setUser(await response.json())
    }

    fetchData()
  }, [userId])

  if (!user) return <div>Loading...</div>

  return <div>{user.firstName} {user.lastName}</div>
}

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:userId' element={<User />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('app'))
  .render(<App />)
