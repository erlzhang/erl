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

const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require(`fs`)
const path = require(`path`)
const _ = require('lodash')

const {
  findFileNode,
  createBookSummaries,
  getPrevAndNextOfChapters,
  flattenArray
} = require('./utils.js');


const books_path = "./src/_books"
const NODE_TYPE = "Book"

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createNodeField } = actions

  if (!fs.existsSync(books_path)) {
    return;
  }

  const nodes = getNodesByType(`MarkdownRemark`);
  const summaries = createBookSummaries(nodes);

  const prevAndNextObj = {};
  for (let key in summaries) {
    getPrevAndNextOfChapters(summaries[key], prevAndNextObj);
  }

  nodes.forEach(node => {
    const slug = node.fields.slug;
    if (!prevAndNextObj[slug]) {
      return
    }

    const { prev, next, isVolume } = prevAndNextObj[slug];
    createNodeField({
      node,
      name: "prev",
      value: prev
    });

    createNodeField({
      node,
      name: "next",
      value: next
    });

    createNodeField({
      node,
      name: "isVolume",
      value: isVolume
    })
  })


  // 遍历文件夹
  fs.readdirSync(books_path, { withFileTypes: true }).forEach(function(dirent) {
    // var filePath = path.join(books_path, dirent.name);
    if (dirent.isFile()) {
      return;
    }

    const summary = summaries[dirent.name];
    const book = {
      name: dirent.name,
      summary,
    }

    createNode({
      ...book,
      id: createNodeId(`${NODE_TYPE}-${dirent.name}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(book),
        contentDigest: createContentDigest(book),
      },
    })
  });
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

    const relativePath = file.relativeDirectory;

    const arr = relativePath.split('/');
    let level = 1;
    if (arr.length === 1 && file.name == "index") {
      level = 0;
    }
    if (arr.length > 1 && file.name != 'index') {
      level = 2;
    }

    const bookPath = arr[0];

    createNodeField({
      node,
      name: "book",
      value: bookPath
    })

    createNodeField({
      node,
      name: "level",
      value: level
    });

    if (level > 1) {
      createNodeField({
        node,
        name: "parent",
        value: arr[1]
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
      query {
        allBook {
        nodes {
          name
          summary {
            chapters {
              slug
              children {
                slug
              }
            }
            slug
          }
        }
        }
      }
    `)

  result.data.allBook.nodes.forEach(node => {
    const summary = node.summary;
    if (!summary) {
      return;
    }

    createPage({
      path: summary.slug,
      component: path.resolve(`./src/templates/book.js`),
      context: {
        slug: summary.slug,
        book: node.name
      }
    });

    const chapters = [];
    flattenArray(summary.chapters, chapters);
    chapters.forEach(chapter => {
      createPage({
        path: chapter.slug,
        component: path.resolve(`./src/templates/chapter.js`),
        context: {
          slug: chapter.slug,
          book: node.name,
          bookSlug: summary.slug,
          layout: 'chapter'
        }
      });
    })
  });
}
