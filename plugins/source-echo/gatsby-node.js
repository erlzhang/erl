/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const path = require(`path`)
const {
  getBooks,
  getBook,
  getChapters,
} = require('./api.js');

const {
  setPathOfChapter,
  setPrevAndNextOfChapters,
  getSummaryOfChapters
} = require('./utils.js');

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createNodeField } = actions
  // 先测试一本书
  const books = await getBooks()
  books.forEach(async book => {
    book.category = book.category === 1 ? '小说' : '随笔';
    const chapters = await getChapters(book.slug)
    setPathOfChapter(chapters)
    setPrevAndNextOfChapters(chapters)

    createNode({
      ...book,
      name: book.slug,
      summary: getSummaryOfChapters(chapters),
      id: createNodeId(`book-${book.slug}`),
      internal: {
        type: 'book',
        content: JSON.stringify(book),
        contentDigest: createContentDigest(book),
      },
    });

    chapters.forEach(async chapter => {
      // chapter.content = post;
      createNode({
        ...chapter,
        id: createNodeId(`chapter-${chapter.id}`),
        internal: {
          type: 'chapter',
          content: JSON.stringify(chapter),
          contentDigest: createContentDigest(chapter),
        }
      })
    })
  });
  // const chapters = await getChapters('window')
  // setPathOfChapter(chapters);
  // setPrevAndNextOfChapters(chapters);

  // chapters.forEach(chapter => {
  //   createNode({
  //     ...chapter,
  //     id: createNodeId(`chapter-${chapter.name}`),
  //     internal: {
  //       type: NODE_TYPE,
  //       content: JSON.stringify(chapter),
  //       contentDigest: createContentDigest(chapter),
  //     },
  //   })
  // })
}

exports.onCreateNode = ({ node, getNode, actions, getNodesByType }) => {
  const { createNodeField } = actions
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allChapter {
        nodes {
          book
          slug
        }
      }
    }
  `)

  result.data.allChapter.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/chapter.js`),
        context: {
          slug: node.slug,
          book: node.book,
          // bookSlug: node.book,
          layout: 'chapter'
        }
    })
  })
}
