import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const defaultImage = ''

const siteMetadata = {
  title: '',
  siteUrl: '',
  fbAppID: ''
}

const getSchemaOrgJSONLD = ({
  url, title, image, description
}) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: siteMetadata.title,
  },
  {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': url,
          name: title,
          image,
        },
      },
    ],
  },
]

const SEO = ({ 
  uid, title, description,
  keywords, image 
}) => {
  const url = uid !== null ? `${siteMetadata.siteUrl}/${uid}` : siteMetadata.siteUrl
  const getImage = image || defaultImage
  const schemaOrgJSONLD = getSchemaOrgJSONLD({    
    url, title, getImage, description
  })

  return (
    <Helmet 
      title={title} 
    >
      {/* General tags */}      
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={getImage} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getImage} />
      <meta property="fb:app_id" content={siteMetadata.fbAppID} />
    </Helmet>
  )
}

SEO.propTypes = {
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default SEO