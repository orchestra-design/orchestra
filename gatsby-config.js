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
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          `IBM+Plex+Sans\:700&amp;subset=cyrillic`,
          `Source+Sans+Pro\:600&amp;subset=cyrillic`
        ]
      }
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
};
