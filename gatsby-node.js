const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const _ = require('lodash')

function findFileNode({ node, getNode }) {
  // Find the file node.
  let fileNode = node

  let whileCount = 0
  while (
    fileNode.internal.type !== `File` &&
    fileNode.parent &&
    getNode(fileNode.parent) !== undefined &&
    whileCount < 101
  ) {
    fileNode = getNode(fileNode.parent)

    whileCount += 1
    if (whileCount > 100) {
      console.log(
        `It looks like you have a node that's set its parent as itself`,
        fileNode
      )
    }
  }

  return fileNode
}
exports.onCreateNode = ({ node, getNode, actions, getNodesByType }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({
      node,
      getNode
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `${relativeFilePath}`,
    })

    createNodeField({
      node,
      name: "wordCount",
      value: _.words(node.rawMarkdownBody, /[\s\p{sc=Han}]/gu).length
    })

    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const file = findFileNode({node, getNode});

    const bookPath = file.relativeDirectory;

    const books = getNodesByType(`Book`)
    const book = books.find(book => book.slug === bookPath);
    if (!book) {
      return;
    }

    createNodeField({
      node,
      name: "book",
      value: book.slug
    })

    // parse Summary
    if (file.name === 'SUMMARY') {
      createNodeField({
        node,
        name: 'summary',
        value: true
      })
    } else if (file.name === 'index') {
      for (let key in node.frontmatter) {
        createNodeField({
          node: book,
          name: key,
          value: node.frontmatter[key]
        })
      }
      createNodeField({
        node,
        name: 'index',
        value: true
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug,
              book,
              index,
              summary
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.fields) return;
    if (node.fields.summary || !node.fields.book) {
      return;
    }

    if (node.fields.index) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/book.js`),
        context: {
          slug: node.fields.slug,
          book: node.fields.book
        },
      })
      return;
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/chapter.js`),
      context: {
        slug: node.fields.slug,
        book: node.fields.book,
        layout: 'chapter'
      },
    })
  })
}
