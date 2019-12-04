import React from 'react'
import { Link, graphql } from 'gatsby'

import '../styles/skeleton.min.css'
import '../styles/home.css'

class BlogList extends React.Component {
  render() {
    const {posts} = this.props;
    return posts.map(({ node }) => {
      return (
        <p>
          <Link to={node.fields.slug} className="title-text">{node.frontmatter.title}</Link>
          <span className="grey right">{node.frontmatter.date}</span>
          <br/>
          <span className="small-text">{node.excerpt}</span>
        </p>
      )
    })
  }
}

export default BlogList;
