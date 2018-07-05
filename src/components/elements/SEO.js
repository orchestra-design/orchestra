import React from 'react'
import Helmet from 'react-helmet'

const getSchemaOrgJSONLD = ({
  url, title, image, description
}) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: title,
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

export const SEO = ({ 
  uid, title, description, fbAppID,
  keywords, image, siteUrl
}) => {
  const url = uid !== null ? `${siteUrl}${uid.replace('.', '/')}` : siteUrl
  const getImage = image
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
      <meta property="fb:app_id" content={fbAppID} />
    </Helmet>
  )
}
