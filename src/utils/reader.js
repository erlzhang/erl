const STORE_PREFIX = 'ERL_';

const PROGRESS_PREFIX = STORE_PREFIX + "PROGRESS_";

// 达到一定数值，近似完成
const COMPLETE_PER = 0.9;

export function setReadProgress(book, slug, val) {
  const bookKey = STORE_PREFIX + "PROGRESS_" + book;

  let obj = getReadProgress(book);
  let current = obj[slug] || 0;
  obj[slug] = Math.max(val, current);

  localStorage.setItem(PROGRESS_PREFIX + book, JSON.stringify(obj));
}

export function getReadProgress(book) {
  let obj = localStorage.getItem(PROGRESS_PREFIX + book);
  if (!obj) {
    return {};
  }
  return JSON.parse(obj);
}

export function getLastReadChapter(book, chapters) {
  const progress = getReadProgress(book);

  for (let chapter of chapters) {
    if (!progress[chapter.slug] || progress[chapter.slug] < COMPLETE_PER) {
      console.warn('chapter', chapter.slug, progress[chapter.slug]);
      return chapter;
    }

    if (chapter.children) {
      for (let child of chapter.children) {
        if (!progress[child.slug] || progress[child.slug] < COMPLETE_PER) {
          return child;
        }
      }
    }
  }

  // 如果都阅读完，还是默认返回第一章吧
  return chapters[0];
}
