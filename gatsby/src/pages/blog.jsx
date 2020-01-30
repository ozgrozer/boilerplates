import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Head from './../components/Head'
import Layout from './../components/Layout'

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title='Blog' />
      {data.allMarkdownRemark.edges.map((edge, key) => {
        return (
          <Link
            key={key}
            to={`/blog/${edge.node.fields.slug}`}
          >
            <b>{edge.node.frontmatter.title}</b>
            <span>{edge.node.frontmatter.date}</span>
          </Link>
        )
      })}
    </Layout>
  )
}

export default Blog
