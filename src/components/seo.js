import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ title, description, keywords, meta, lang }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`%s — ${data.site.siteMetadata.title}`}
            meta={
              [
                {
                  name: `description`,
                  content: metaDescription,
                }
              ]
                .concat(
                  keywords.length > 0
                    ? {
                        name: `keywords`,
                        content: keywords.join(`, `),
                      }
                    : []
                )
                .concat(meta)
            }
          >
            <link rel="shortcut icon" href="/favicon.ico"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type='text/css'/>
            <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,600" rel="stylesheet" type='text/css'/>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
