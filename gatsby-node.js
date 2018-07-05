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
      path: `${node.lang.replace('-us', '')}/projects/${path.replace(/.{3}$/i, '')}`,
      component: workTemplate,
      context: {
        slug: path,
        lang: node.lang
      },
    })
  })
}

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
}
