export function getDate({ start, end }) {
  let str = "";
  if (start !== end) {
    str += start + "-";
  }
  str += end;
  return str;
}


export function getAllCategories(books) {
  let categories = ["全部"];
  books.forEach(book => {
    const category = book.category;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
  return categories;
}

export function formatNum(num) {
  let str = num + "";
  let result = "";
  let len = str.length;
  for(let i = 1; i <= len; i++) {
    result = str[len - i] + result;
    if (i % 3 == 0 && i < len) {
      result = "," + result;
    }
  }
  return result;
}

