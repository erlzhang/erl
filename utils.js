function setPathOfChapter(chapters) {
  let parent = '';
  chapters.forEach(chapter => {
    if (!chapter.level) {
      parent = chapter.slug;
      chapter.slug = `/${chapter.book}/${chapter.slug}`;
    } else if (parent != '') {
      chapter.slug = `/${chapter.book}/${parent}/${chapter.slug}`;
    }
  });
}

function setPrevAndNextOfChapters(chapters) {
  const len = chapters.length;
  chapters.forEach((chapter, idx) => {
    if (idx > 0) {
      const prev = chapters[idx - 1];
      chapter.prev = {
        slug: prev.slug,
        title: prev.title
      }
    }
    if (idx < len - 1) {
      const next = chapters[idx + 1];
      chapter.next = {
        slug: next.slug,
        title: next.title
      }
    }
  })
}

function getSummaryOfChapters(chapters) {
  const summary = [];
  let parent;
  chapters.forEach(chapter => {
    if (!chapter.level || !parent) {
      const obj = {
        title: chapter.title,
        slug: chapter.slug,
        children: []
      };
      parent = obj;
      summary.push(obj);
    } else {
      parent.children.push({
        title: chapter.title,
        slug: chapter.slug,
      });
    }
  });
  return summary;
}


module.exports = {
  setPathOfChapter,
  setPrevAndNextOfChapters,
  getSummaryOfChapters
}
