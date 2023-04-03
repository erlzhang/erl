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

function groupNodesByBook(nodes) {
  const result = {};
  nodes.forEach(node => {
    const book = node.fields.book;
    if (!result[book]) {
      result[book] = [];
    }

    result[book].push(node)
  })
  return result;
}

function createEmpty(node) {
  return {
    slug: node.fields.slug,
    title: node.frontmatter.title,
    index: node.frontmatter.index,
    children: [],
  }
}

function createBookSummary(book, nodes) {
  let chapters = [];
  const level2 = [];
  const slug2Chapter = {};
  let indexPage;
  let wordCount = 0;
  nodes.forEach(node => {
    wordCount += node.fields.wordCount;
    const level = node.fields.level;
    const slug = node.fields.slug;
    const item = createEmpty(node);
    if (level > 1) {
      item.parent = node.fields.parent;
      level2.push(item);
    } else if (level == 1) {
      chapters.push(item);
      slug2Chapter[slug] = item;
    } else if (level === 0) {
      Object.assign(item, node.frontmatter)
      indexPage = item;
    }
  });


  // 处理level2的
  level2.forEach(item => {
    const parentSlug = `/${book}/${item.parent}/`;
    const parentNode = slug2Chapter[parentSlug];
    if (!parentNode) return;

    parentNode.children.push(item);
  });

  // 针对已有章节排序
  chapters.sort((a,b) => {
    let idx1 = a.index || 0;
    let idx2 = b.index || 0;
    return idx1 - idx2;
  });

  chapters.forEach(chapter => {
    if (chapter.children.length) {
      chapter.volume = true;
      chapter.children.sort((a,b) => {
        return a.index - b.index;
      });
    }
  });

  return {
    chapters,
    wordCount,
    ...indexPage
  }
}

function formatTitle(item) {
  if (!item.children.length && item.index > 0 && item.index < 999) {
    return `${item.index}. ${item.title}`;
  } else {
    return item.title;
  }
}

function createBookSummaries(nodes) {
  const result = groupNodesByBook(nodes);
  const summaries = {};
  for (let key in result) {
    summaries[key] = createBookSummary(key, result[key]);
  }
  return summaries;
}

function flattenArray(arr, result) {
  arr.forEach(item => {
    result.push(item);

    if (item.children) {
      flattenArray(item.children, result);
    }
  })
}

function getPrevAndNextOfChapters(summary, result) {
  let flatted = [];
  flattenArray(summary.chapters, flatted);
  flatted.forEach(item => {
    item.title = formatTitle(item);
  });
  flatted.unshift({
    slug: summary.slug,
    title: summary.title
  });

  for (let i = 0, l = flatted.length - 1; i < l; i++) {
    let current = flatted[i];
    let next = flatted[i + 1];
    if (i == 0) {
      result[current.slug] = {};
    }
    result[next.slug] = {
      isVolume: next.children.length > 0
    };

    result[current.slug].next = {
      slug: next.slug,
      title: next.title
    }

    result[next.slug].prev = {
      slug: current.slug,
      title: current.title
    }
  }
}


module.exports = {
  findFileNode,
  createBookSummaries,
  getPrevAndNextOfChapters,
  flattenArray,
  formatTitle
}
