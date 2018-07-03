const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicWork {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `)

  const workTemplate = path.resolve('./src/templates/work-template.js')

  pages.data.allPrismicWork.edges.forEach(({ node }) => {
    const path = node.uid
    createPage({
      path: `/${path}`,
      component: workTemplate,
      context: {
        slug: path,
      },
    })
  })
}

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
}
