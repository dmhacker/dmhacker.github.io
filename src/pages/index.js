import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import GitHubButton from 'react-github-btn'

import SEO from '../components/seo.js'

import '../styles/skeleton.min.css'
import '../styles/home.css'

import 'katex/dist/katex.min.css'

class IndexPage extends React.Component {
  render() {
    const {data} = this.props;
    const posts = data.allMarkdownRemark.edges

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
        "key": "dmhacker/horcrux",
        "title": "Shamir's Secret Sharing Scheme",
        "description": <span className="small-text">Provides a fast & practical implementation of <a href="https://dl.acm.org/citation.cfm?doid=359168.359176">Shamir's secret-sharing scheme</a> for Unix devices. The project extends the scheme so that it can split messages of any length while maintaining a 512-bit security level.</span>
      },
      {
        "key": "dmhacker/rlwe",
        "title": "Ring Learning with Errors Cryptography",
        "description": <span className="small-text">Implements several cryptographic schemes that are based off of the security of the RLWE problem: the <a href="https://eprint.iacr.org/2012/144.pdf">Fan-Vercauteren homomorphic cryptosystem</a>, the <a href="https://eprint.iacr.org/2016/030.pdf">Ring-TESLA digital signature</a> algorithm, etc.</span>
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
        "title": "Travelling Salesman Problem: Hill Climbing v.s Simulated Annealing",
        "description": <span className="small-text">Over 2900 upvotes on /r/InternetIsBeautiful. <a href="https://www.reddit.com/r/InternetIsBeautiful/comments/5rqirw/3d_visualization_of_the_travelling_salesman/">Link to the post.</a></span>
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
        "description": <span className="small-text">Useful tool to help with visualizing volumes of solids of revolution (calculus I).</span>
      }
    ];

    return (
    <div>
      <SEO title="Home" keywords={["dmhacker", "computers", "student", "programming", "coding", "personal"]}/>
      <div className="container">
        <div className="row medium-separation">
          <div className="twelve columns">
            <Img fluid={data.profile.childImageSharp.fluid} className="profile-image"></Img> 
          </div>
        </div>
        <div className="row small-separation">
          <div className="twelve columns">
            <h1 className="profile-heading">David Hacker</h1>
          </div>
        </div>
        <div className="row medium-separation">
          <div className="twelve columns">
            <p>
              Hello! I'm an undergraduate at the University of California San Diego (UCSD), and I am pursuing a B.S in computer science 
              with a minor in mathematics. I am particularly interested in cryptography, distributed computing and natural language processing. 
              I also enjoy learning about and working with graphics & data visualization techniques.
            </p>
            <p>
              I'm a big fan of the Unix philosophy, *nix systems in general, vim and zsh. 
              You can find my dotfiles <a href="https://github.com/dmhacker/dotfiles">here</a>.
            </p>
            <p>
              You can usually reach me at <b>dmhacker (at) protonmail (dot) com</b>.
            </p>
          </div>
        </div>
        {/* <hr/> */}
        {/* <div className="row medium-separation"> */}
        {/*   <div className="twelve columns"> */}
        {/*     <div className="row"> */}
        {/*       <h3>My Blog</h3> */}
        {/*       <ul> */}
        {/*         {posts.map(({node}) => { */}
        {/*           return ( */}
        {/*             <li> */}
        {/*               <a href={node.fields.slug}>{node.frontmatter.title}</a> */}
        {/*             </li> */}
        {/*           ) */}
        {/*         })} */}
        {/*       </ul> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <hr/> */}
        <div className="row medium-separation">
          <div className="six columns">
            <div className="row">
              <h3>Some Projects</h3>
              {projects.map(project =>
                <p>
                  {project.title}<br/>
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
              <h3>Cool Visualizations</h3>
              {visualizations.map(visualization =>
                <p>
                  <a href={visualization.key}>{visualization.title}</a><br/>
                  {visualization.description}
                </p>
              )}
            </div>
            <div className="row">
              <h3>My PGP Key</h3>
              <p>You can acquire my PGP key by running:</p>
              <pre><code>gpg --recv-keys 377FDEEC2D355771</code></pre>
              <p>You can also <a href="dmhacker.asc">download</a> it manually and then import it using:</p>
              <pre><code>gpg --armor --import dmhacker.asc</code></pre>
              <p>If you don't trust the key, shoot me an email and I'll send you the key's fingerprint for verification.</p>
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
    site {
      siteMetadata {
        title
        description
      }
    }
    profile: file(relativePath: { eq: "profile.jpg" }) {
      ...FluidImage
    }
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
            description
          }
        }
      }
    }
  }
`
