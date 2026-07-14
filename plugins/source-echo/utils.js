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

function setPathOfVolumeChapter(chapters, volumeSlug) {
  chapters.forEach(chapter => {
    chapter.slug = `/${chapter.book}/${volumeSlug}/${chapter.slug}`;
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

function setPrevAndNextOfVolumes(volumes) {
  let len = volumes.length;
  volumes.forEach((volume, idx) => {
    volume.indexPath = volume.chapters[0] && volume.chapters[0].slug
    if (idx > 0) {
      const prev = volumes[idx - 1];
      volume.prev = {
        indexPath: prev.indexPath,
        title: prev.title
      }
      const firstPrev = prev.chapters[prev.chapters.length - 1];
      volume.chapters[0].prev = {
        slug: firstPrev.slug,
        title: firstPrev.title
      }
    }
    if (idx < len - 1) {
      const next = volumes[idx + 1];
      volume.next = {
        indexPath: next.chapters[0] && next.chapters[0].slug,
        title: next.title
      }

      const lastNext = next.chapters[0];
      volume.chapters[volume.chapters.length - 1].next = {
        slug: lastNext.slug,
        title: lastNext.title
      }
    }
  });
}


module.exports = {
  setPathOfChapter,
  setPrevAndNextOfChapters,
  getSummaryOfChapters,
  setPathOfVolumeChapter,
  setPrevAndNextOfVolumes
}
