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
  getVolumes,
} = require('./api.js');

const {
  setPathOfChapter,
  setPrevAndNextOfChapters,
  getSummaryOfChapters,
  setPathOfVolumeChapter,
  setPrevAndNextOfVolumes
} = require('./utils.js');

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createNodeField } = actions
  const books = await getBooks()
  console.log('books', books);
  return Promise.allSettled(books.map(book => {
    if (!book.published) return;
    book.category = book.category === 1 ? '小说' : '随笔';

    if (book.structureType === 1) {
      // todo 连载单独处理
      return getVolumes(book.slug)
        .then(({volumes, parts}) => {
          console.log('volumes', volumes, parts);
          volumes.forEach(volume => {
            if (!volume.published) {
              return;
            }
            setPathOfVolumeChapter(volume.chapters, volume.slug);
            setPrevAndNextOfChapters(volume.chapters);
          });

          setPrevAndNextOfVolumes(volumes);

          // parts.forEach(part => {
          //   createNode({
          //     ...part,
          //     id: createNodeId(`part-${part.id}`),
          //     internal: {
          //       type: 'part',
          //       content: JSON.stringify(part),
          //       contentDigest: createContentDigest(part),
          //     },
          //   });
          // });

          volumes.forEach(volume => {
            if (!volume.published) {
              return;
            }

            const volumeInfo = {
                title: volume.title,
                slug: volume.slug,
                content: volume.content,
                wordCount: volume.wordCount,
                indexPath: volume.indexPath,
                part: volume.partId,
                prev: volume.prev,
                next: volume.next,
            };

            createNode({
              ...volumeInfo,
              name: volume.slug,
              summary: volume.chapters.map(chapter => {
                return {
                  title: chapter.title,
                  slug: chapter.slug
                }
              }),
              id: createNodeId(`volume-${volume.slug}`),
              internal: {
                type: 'volume',
                content: JSON.stringify(volumeInfo),
                contentDigest: createContentDigest(volumeInfo),
              },
            });
            volume.chapters.forEach(chapter => {
              createNode({
                ...chapter,
                volume: volume.slug,
                id: createNodeId(`chapter-${chapter.id}`),
                internal: {
                  type: 'chapter',
                  content: JSON.stringify(chapter),
                  contentDigest: createContentDigest(chapter),
                }
              })
            });
          })
          
          createNode({
            ...book,
            name: book.slug,
            parts: parts.map(part => {
              return {
                id: part.id,
                title: part.title
              }
            }),
            summary: volumes.filter(vol => vol.published).map(vol => {
              return {
                title: vol.title,
                slug: vol.slug,
                content: vol.content,
                wordCount: vol.wordCount,
                indexPath: vol.indexPath,
                partId: vol.partId
              }
            }),
            id: createNodeId(`book-${book.slug}`),
            internal: {
              type: 'book',
              content: JSON.stringify(book),
              contentDigest: createContentDigest(book),
            },
          });
        }).catch(e => console.error(e));
    }
    return getChapters(book.slug)
      .then(chapters => {
        setPathOfChapter(chapters)
        setPrevAndNextOfChapters(chapters)

        createNode({
          ...book,
          name: book.slug,
          parts: [{
            title: ''
          }],
          summary: getSummaryOfChapters(chapters),
          id: createNodeId(`book-${book.slug}`),
          indexPath: chapters[0] && chapters[0].slug,
          internal: {
            type: 'book',
            content: JSON.stringify(book),
            contentDigest: createContentDigest(book),
          },
        });

        chapters.forEach(async chapter => {
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
      })
  }))
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allChapter {
        nodes {
          book
          slug
          volume
        }
      }
      allBook {
        nodes {
          slug
          structureType
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
          layout: 'chapter',
          volume: node.volume || ''
        }
    })
  })

  result.data.allBook.nodes.forEach(node => {
    if (node.structureType === 1) {
      createPage({
        path: '/' + node.slug,
        component: path.resolve(`./src/templates/book.js`),
          context: {
            slug: '/' + node.slug,
            book: node.slug,
            // bookSlug: node.book,
            layout: 'book'
          }
      })
    }
  })
}
