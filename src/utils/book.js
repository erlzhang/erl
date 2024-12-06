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
  books.forEach((book) => {
    const category = book.category;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
  return categories;
}

export function formatNum(num) {
  return `总计${Math.floor(num / 10000)}万字，预计阅读${calculateReadingTime(
    num
  )}`;
}

/**
 * 计算中文文本的预计阅读时间
 * @param {number} wordCount - 文本的总字数
 * @param {number} readingSpeed - 每分钟的阅读速度（单位：字/分钟，默认值为 400）
 * @returns {string} - 返回预计阅读时间（格式：x 小时 x 分钟 或 x 分钟）
 */
function calculateReadingTime(wordCount, readingSpeed = 400) {
  if (wordCount <= 0 || readingSpeed <= 0) {
    return "输入的字数或阅读速度必须大于0";
  }

  // 计算总分钟数
  const totalMinutes = Math.ceil(wordCount / readingSpeed);

  // 如果时间超过60分钟，转换为小时和分钟
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes === 0 ? `${hours}小时` : `${hours}小时${minutes}分钟`;
  }

  // 如果小于60分钟，仅显示分钟
  return `${totalMinutes} 分钟`;
}
