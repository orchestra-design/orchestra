const PrismicDOM = require('prismic-dom')
const tp = require('./src/helpers/tp')

const Elements = PrismicDOM.RichText.Elements
const linkResolver = () => doc =>
  doc.type === 'work'
    ? `/${doc.lang.replace('-us', '')}/projects/${doc.uid.replace(
        /.{3}$/i,
        ''
      )}`
    : `/${doc.lang.replace('-us', '')}/${doc.uid.replace(/.{3}$/i, '')}`

module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `orchestra`,
        accessToken: `MC5XeklwblNBQUFOY3dwUXRL.77-9UQ7vv71r77-9K2gdX--_vUzvv70577-977-977-977-9Nu-_ve-_ve-_ve-_vS3vv73vv73vv71YORxvdA`,
        linkResolver: linkResolver,
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {
          switch (type) {
            case Elements.paragraph:
              return `<p>${tp.execute(children.join(''))}</p>`
            case Elements.hyperlink:
              const target = element.data.target
                ? `target="${element.data.target}" rel="noopener noreferrer"`
                : ''
              const linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
              return `<a class="link" ${target} href="${linkUrl}">${content}</a>`
            case Elements.heading5:
              return `<p class="lead">${children.join('')}</p>`
            case Elements.heading6:
              return `<span class="link">${children.join('')}</span>`
            default:
              return null
          }
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [
          `shorthands`,
          `cloning`,
          `currying`,
          `caching`,
          `collections`,
          `exotics`,
          `guards`,
          `metadata`,
          `deburring`,
          `unicode`,
          `chaining`,
          `memoizing`,
          `coercions`,
          `flattening`,
          `paths`,
          `placeholders`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
  ],
}
