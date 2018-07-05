const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicWork {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `)

  const workTemplate = path.resolve('./src/templates/work-template.js')
  const redirect = path.resolve('./src/templates/redirect-template.js')

  pages.data.allPrismicWork.edges.forEach(({ node }) => {
    const path = node.uid
    createPage({
      path: `projects/${path.replace('.', '/')}`,
      component: workTemplate,
      context: {
        slug: path,
        lang: node.lang
      },
    })
    createPage({
      path: `projects/${path.replace(/.{3}$/i, '')}`,
      component: redirect,
    })
  })
}

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
}
