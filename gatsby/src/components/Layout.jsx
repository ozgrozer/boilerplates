import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import './../styles/layout.scss'

const Layout = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <header>
        <Link to='/' activeClassName='active'>Index</Link>
        <Link to='/about' activeClassName='active'>About</Link>
        <Link to='/blog' activeClassName='active'>Blog</Link>
      </header>

      <main>{props.children}</main>

      <footer>
        Copyright @{data.site.siteMetadata.title}
      </footer>
    </div>
  )
}

export default Layout
