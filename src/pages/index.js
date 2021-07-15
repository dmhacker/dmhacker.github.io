import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import GitHubButton from 'react-github-btn'

import SEO from '../components/seo.js'
import BlogList from '../components/blog-list.js'

import '../styles/skeleton.min.css'
import '../styles/home.css'
import 'katex/dist/katex.min.css'

class IndexPage extends React.Component {
  render() {
    const {data} = this.props;
    const projects = [
      {
        "key": "dmhacker/arch-linux-surface",
        "title": "Arch Linux Kernel Patcher for Surface Devices",
        "description": <span className="small-text">Autogenerates PKGBUILDs and setup scripts for <a href="https://github.com/jakeday/linux-surface">jakeday's patched kernel</a>, so that you can run Arch Linux comfortably on a Microsoft Surface device.</span>
      },
      {
        "key": "dmhacker/alexa-youtube-skill",
        "title": "Alexa YouTube Skill",
        "description": <span className="small-text">Enables Alexa to play audio from YouTube. The project wiki has detailed instructions that walk you through the setup process.</span>
      },
      {
        "key": "dmhacker/dual-ec-drbg",
        "title": "Dual_EC_DRBG Backdoor Demonstration",
        "description": <span className="small-text">Demonstrates how a <a href="http://rump2007.cr.yp.to/15-shumow.pdf">Shumlow-Ferguson attack</a> could be used to recover the internal state of any Dual_EC_DRBG pseudorandom number generator.</span>
      }
    ];

    const visualizations = [
      {
        "key": "/sim/tsp",
        "title": "TSP Approximation Algorithms",
          "description": <span className="small-text">A visual comparison of simulated annealing and hill climbing algorithms. <a href="https://www.reddit.com/r/InternetIsBeautiful/comments/5rqirw/3d_visualization_of_the_travelling_salesman/">Shared</a> on /r/InternetIsBeautiful.</span>
      },
      {
        "key": "/sim/nnet",
        "title": "2D Feedforward Neural Network",
        "description": <span className="small-text">Watch as a neural network is trained in your browser. Optionally supply your own training set.</span>
      },
      {
        "key": "/sim/lant",
        "title": "3D Adaptation of Langton's Ant",
        "description": <span className="small-text">Based off of <a href="https://pdfs.semanticscholar.org/5738/247ce6f97ab59317f7a27ef9b03781c6d79b.pdf">this research paper</a>. Configure what path it generates using your own ruleset.</span>
      },
      {
        "key": "/sim/geometric-plotter",
        "title": "3D Function Plotter & Grapher",
        "description": <span className="small-text">Calculus I tool to help with visualizing volumes of solids of revolution.</span>
      }
    ];

    return (
    <div>
      <SEO title="Home" keywords={[]}/>
      <div className="container">
        <div className="row medium-separation">
          <div className="twelve columns">
            <Img fluid={data.profile.childImageSharp.fluid} className="profile-image"></Img> 
          </div>
        </div>
        <div className="row small-separation">
          <div className="twelve columns">
            <h2 className="profile-heading">David Hacker</h2>
          </div>
        </div>
        <div className="row small-separation">
          <div className="twelve columns">
            <p>
              Hello! I'm a software engineer at Citadel | Citadel Securities. My main interests are in distributed computing,
              low-latency computing, operating systems, and software engineering, but I enjoy learning about nearly anything computing-related.
            </p>
            <p>
              I graduated from the University of California San Diego (UCSD) in 2021, where I majored in computer science
              and minored in mathematics. Prior to graduation, I worked at <a href="https://www.techatbloomberg.com/">Bloomberg</a> 
              and <a href="https://www.citadelsecurities.com/">Citadel Securities</a> as a software engineering intern, where I was
              a part of their market data infrastructure and options market making teams respectively.
            </p>
            <p>
              I'm a big fan of the Unix philosophy, *nix systems in general, vim and zsh. 
              You can find my dotfiles <a href="https://github.com/dmhacker/dotfiles">here</a>.
            </p>
          </div>
        </div>
        <hr/>
        <div className="row small-separation">
          <div className="twelve columns">
            <div className="row">
              <h4>My Blog</h4>
              <p>
                I enjoy writing about topics that interest me, covering a broad spectrum of fields but mostly focusing on issues related to 
                computer science, engineering, programming, and system design.
              </p>
              <BlogList posts={data.allMarkdownRemark.edges}/>
            </div>
          </div>
          <div className="twelve columns">
            <div className="row center">
              <Link to="/blog">View All Posts ...</Link>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row small-separation">
          <div className="six columns">
            <div className="row">
              <h4>Some Projects</h4>
              {projects.map(project =>
                <p>
                  <span className="subtitle-text">{project.title}</span><br/>
                  <GitHubButton 
                    href={`https://github.com/${project.key}`} 
                    data-icon="octicon-star" 
                    data-show-count="true" 
                    aria-label={`Star ${project.tag} on GitHub`}>Star</GitHubButton><br/>
                  {project.description}<br/>
                </p>
              )}
              <p>
                And more on GitHub ...<br/>
                <GitHubButton href="https://github.com/dmhacker" aria-label="Follow @dmhacker on GitHub">Follow @dmhacker</GitHubButton>
              </p>
            </div>
          </div>
          <div className="six columns">
            <div className="row">
              <h4>Cool Visualizations</h4>
              {visualizations.map(visualization =>
                <p>
                  <a className="subtitle-text" href={visualization.key}>{visualization.title}</a><br/>
                  {visualization.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default IndexPage;

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
    profile: file(relativePath: { eq: "profile.jpg" }) {
      ...FluidImage
    }
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
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
