import { sumBy } from "lodash";
export function getDate({ start, end }) {
  let str = "";
  if (start !== end) {
    str += start + "-";
  }
  str += end;
  return str;
}

export function getWordCount(nodes) {
  return sumBy(nodes, (n) => n.fields.wordCount);
}

export function getWordCountOfBooks(nodes, books) {
  const result = {
  }

  nodes.forEach(node => {
    const { book, wordCount } = node.fields;
    if (!book) {
      return;
    }

    if (!result[book]) {
      result[book] = 0;
    }

    result[book] += wordCount;
  });

  return result;
}

export function getAllCategories(books) {
  let categories = ["全部"];
  books.forEach(book => {
    const category = book.summary.category;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
  return categories;
}

export function formatNum(num, precision = 0) {
  const numToWord = {
    0: '〇',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九'
  };

  const units = ['', '十', '百', '千', '万', '十', '百'];

  let result = [];
  let i = precision;

  let _num = Math.floor(num / Math.pow(10, i));

  while( _num >= 1 ) {
    let rem = _num % 10;
    _num = Math.floor(_num / 10);

    if (rem != 0) {
      result.push(numToWord[rem] + units[i]);
    }
    i++;
  }

  return result.reverse().join('');
}

