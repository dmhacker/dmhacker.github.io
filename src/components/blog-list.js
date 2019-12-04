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
          <div class="row">
            <div class="six columns">
              <Link to={node.fields.slug} className="title-text">{node.frontmatter.title}</Link>
            </div>
            <div class="six columns">
              <span className="grey right-on-large">{node.frontmatter.date}</span>
            </div>
          </div>
          <span className="small-text">{node.excerpt}</span>
        </p>
      )
    })
  }
}

export default BlogList;
