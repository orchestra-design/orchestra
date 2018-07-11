const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageMaker = type => data => {
    data.edges.forEach(({ node: { uid, lang } }) => {
      createPage({
        path: `${lang.replace('-us', '')}${type === 'work' ? '/projects/' : '/'}${uid.replace(/.{3}$/i, '')}`,
        component: path.resolve(`./src/templates/${type}-template.js`),
        context: {
          slug: uid,
          lang: lang
        }
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
      work: allPrismicWork {
        edges {
          node {
            uid
            lang
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
