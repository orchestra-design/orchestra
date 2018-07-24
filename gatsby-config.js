var PrismicDOM = require('prismic-dom')
var Elements = PrismicDOM.RichText.Elements

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    `gatsby-transformer-sharp`,
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
        linkResolver: () => doc => (
          doc.type === 'work' 
            ? `/${doc.lang.replace('-us', '')}/projects/${doc.uid.replace(/.{3}$/i, '')}`
            : `/${doc.lang.replace('-us', '')}/${doc.uid.replace(/.{3}$/i, '')}`
        ),
        htmlSerializer: ({ node, key, value }) => (
          (type, element, content, children) => {
            switch(type) {
              case Elements.heading5: return `<p class="lead">${children.join('')}</p>`;
              default: 
                return null;
            }
          }
        )
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          `IBM+Plex+Sans\:600,700`,
          `Source+Sans+Pro\:400,600&amp;subset=cyrillic`
        ]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [`shorthands`, `cloning`, `currying`, 
        `caching`, `collections`, `exotics`, `guards`, `metadata`, 
        `deburring`, `unicode`, `chaining`, `memoizing`, `coercions`, 
        `flattening`, `paths`, `placeholders`] 
      },
    },
    /* {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: '49403653',
        webvisor: false,
        trackHash: false,
      },
    }, */
  ]
}
