import React from 'react'
import { graphql, Link  } from 'gatsby'
import Img from 'gatsby-image'
import GitHubButton from 'react-github-btn'

import SEO from '../components/seo.js'
import BlogList from '../components/blog-list.js'

import '../styles/skeleton.min.css'
import '../styles/home.css'

class BlogPage extends React.Component {
  render() {
    const {data} = this.props;
    return (
    <div>
      <SEO title="Blog Archive"/>
      <div className="container">
        <div className="row medium-separation">
          <div className="twelve columns">
            <h2 className="profile-heading">David's Musings</h2>
            <Link to="/">← Back to home</Link>
            <hr/>
          </div>
        </div>
        <div className="row medium-separation">
          <div className="twelve columns">
            <BlogList posts={data.allMarkdownRemark.edges}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default BlogPage;

export const FluidImage = graphql`
fragment FluidImage on File {
  childImageSharp {
    fluid(maxWidth: 1000) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
