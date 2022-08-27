function getHref(child, book) {
  let href = child.properties.href;
  href = href.replace(/(.md)$/gm,'');
  return `/${book.slug}/${href}/`;
}

function parseA(child, obj, book) {
  obj.title = child.children[0].value;
  obj.href = getHref(child, book);
  
}

function parseLi(li, book, current) {
  let obj = {};
  li.children.forEach(child => {
    if (child.tagName === 'a') {
      parseA(child, obj, book);
      if (obj.href === current) {
        obj.active = true;
      }
    } else if (child.tagName === 'p') {
      child.children.forEach(child => {
        if (child.tagName === 'a') {
          parseA(child, obj, book);
          if (obj.href === current) {
            obj.active = true;
          }
        }
      })
    } else if (child.tagName === 'ul') {
      obj.children = [];
      child.children.forEach(l => {
        if (l.tagName === 'li') {
          const sub = parseLi(l, book, current);
          obj.children.push(sub);
        }
      })
    }
  });
  return obj;
}

export function parseSummary(summary, book, current) {
  // let current = post.fields.slug;

  console.warn('in htmlAst', summary.htmlAst);

  let result = [{
    title: book.fields.title,
    href: `/${book.slug}`,
  }];
  summary.htmlAst.children.some(ele => {
    if (ele.tagName === "ul") {
      ele.children.forEach(child => {
        if (child.tagName === 'li') {
          result.push(parseLi(child, book, current));
        }
      })
      return true;
    }
  });

  return result;
}

function flattenArray(arr, result) {
  arr.forEach(item => {
    result.push(item);

    if (item.children) {
      flattenArray(item.children, result);
    }
  })
}

export function getPrevAndNext(current, summary) {
  let flatted = [];
  flattenArray(summary, flatted);

  let index = flatted.findIndex(item => item.href === current);
  
  let prev;
  let next;

  if (index > 0) {
    prev = flatted[index - 1];
  }

  if (index < flatted.length - 1) {
    next = flatted[index + 1];
  }

  return {
    prev,
    next
  }
}