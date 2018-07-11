import React from 'react'
import Helmet from 'react-helmet'

const getSchemaOrgJSONLD = ({
  url, seotitle, getImage, description
}) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: seotitle,
    alternateName: seotitle,
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
          name: seotitle,
          getImage,
        },
      },
    ],
  },
]

export const SEO = ({ seo: { data: {
  uid, seotitle, seodescription,
  seokeywords, seoimage
}}}) => {
  const siteUrl = 'https://www.orchestra-design.com/'
  const fbAppID = ''
  const url = uid !== null ? `${siteUrl}${uid.replace('.', '/')}` : siteUrl
  const getImage = seoimage.localFile.childImageSharp.resolutions.src
  const schemaOrgJSONLD = getSchemaOrgJSONLD({    
    url, seotitle, getImage, seodescription
  })  

  return (
    <Helmet      
      defaultTitle="Orchestra Design"
      titleTemplate={`%s | Orchestra Design`}
      title={seotitle} 
    >
      {/* General tags */}      
      <meta name="description" content={seodescription} />
      <meta name="keywords" content={seokeywords} />
      <meta name="image" content={getImage} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seotitle} />
      <meta property="og:description" content={seodescription} />
      <meta property="og:image" content={getImage} />
      <meta property="fb:app_id" content={fbAppID} />
    </Helmet>
  )
}
