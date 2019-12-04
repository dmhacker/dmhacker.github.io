import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo.js"

import '../styles/skeleton.min.css'
import '../styles/home.css'

import 'katex/dist/katex.min.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <div>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="container">
          <div className="row medium-separation">
            <div className="twelve columns">
              <h2 className="profile-heading">David's Musings</h2>
              <Link to="/blog">← Look at more posts</Link>
              <hr/>
            </div>
          </div>
          <div className="row small-separation">
            <div className="twelve columns">
              <article>
                <header>
                  <div className="row">
                    <div className="six columns">
                      <h3>
                        {post.frontmatter.title}
                      </h3>
                    </div>
                    <div className="six columns">
                      <p className="grey right-on-large">
                        {post.frontmatter.date}
                      </p>
                    </div>
                  </div>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
              </article>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
