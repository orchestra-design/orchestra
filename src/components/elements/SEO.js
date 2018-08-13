import React from "react";
import Helmet from "react-helmet";

import defaultImage from "../../assets/default.jpg";
import favicon from "../../assets/favicon.png";

const getSchemaOrgJSONLD = ({ url, seotitle, getImage, description }) => [
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url,
    name: seotitle,
    alternateName: seotitle
  },
  {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": url,
          name: seotitle,
          getImage
        }
      }
    ]
  }
];

export const SEO = ({
  seo: {
    uid,
    lang,
    data: { seotitle, seodescription, seokeywords, seoimage }
  }
}) => {
  const siteUrl = "https://www.orchestra-design.com/";
  const fbAppID = "";
  const url =
    uid !== null
      ? `${siteUrl}${lang.replace("-us", "")}/${uid.replace(/.{3}$/i, "")}`
      : siteUrl;
  const getImage =
    seoimage && seoimage.localFile
      ? seoimage.localFile.childImageSharp.resolutions.src
      : defaultImage;
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    seotitle,
    getImage,
    seodescription
  });

  return (
    <Helmet
      defaultTitle="Orchestra Design"
      titleTemplate={`%s | Orchestra Design`}
      title={seotitle}
    >
      <link rel="icon" type="image/png" href={favicon} />
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
  );
};
