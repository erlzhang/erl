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

const fs = require(`fs`)
const path = require(`path`)

const books_path = "./src/_books"
const NODE_TYPE = "Book"

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  if (!fs.existsSync(books_path)) {
    console.error("No books at path:", books_path);
    return;
  }

  // 遍历文件夹
  fs.readdirSync(books_path, { withFileTypes: true }).forEach(function(dirent) {
    // var filePath = path.join(books_path, dirent.name);
    if (dirent.isFile()) {
      return;
    }

    const book = {
      slug: dirent.name,
      path: path.join(books_path, dirent.name),
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