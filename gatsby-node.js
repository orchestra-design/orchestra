const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageMaker = type => data => {
    data.edges.forEach(({ node: { uid, lang, data } }) => {
      lang === 'ru' &&
        createPage({
          path: `${lang.replace('-us', '')}${
            type === 'work' ? '/projects/' : '/'
          }${uid.replace(/.{3}$/i, '')}`,
          component: path.resolve(`./src/templates/${type}-template.js`),
          context: {
            slug: uid,
            lang: lang,
            color: data && data.color ? data.color : '#000000',
          },
        })
    })
  }

  const pages = await graphql(`
    {
      homepage: allPrismicHomepage {
        edges {
          node {
            uid
            lang
          }
        }
      }
      how: allPrismicHow {
        edges {
          node {
            uid
            lang
          }
        }
      }
      what: allPrismicWhat {
        edges {
          node {
            uid
            lang
          }
        }
      }
      who: allPrismicWho {
        edges {
          node {
            uid
            lang
          }
        }
      }
      manifest: allPrismicManifest {
        edges {
          node {
            uid
            lang
          }
        }
      }
      work: allPrismicWork {
        edges {
          node {
            uid
            lang
            data {
              color
            }
          }
        }
      }
      works: allPrismicWorks {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `)

  for (const key in pages.data) {
    pageMaker(key)(pages.data[key])
  }
}

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    entry: 'whatwg-fetch',
  })
}
