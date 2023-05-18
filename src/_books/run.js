const fs = require('fs');
const path = require('path');
const readline = require('readline');

//const currentDirPath = 'blue';
var currentDirPath = process.argv[2];
if (!currentDirPath) {
  return console.error('path is required!')
}

async function createNewContent(rl) {
  let str = '';
  for await (const line of rl) {
    if (line[0] === '#') {
      const { title, index } = getIndexAndTitle(line);
      str += createHeader(title, index);
    } else {
      str += line + '\n'
    }
  }
  return str;
}

function getIndexAndTitle(line) {
  const arr = line.split(' ');
  const title = arr[arr.length - 1];
  let index = null;
  if (arr.length > 2) {
    index = arr[1].replace('.', '');
  }

  return {title, index};
}

function createHeader(title, index) {
  let str = '---\n';
  str += 'title: ' + title + '\n';
  if (index != null) {
    str += 'index: ' + index + '\n'
  }
  str += '---\n'
  return str;
}

const files = fs.readdirSync(currentDirPath, { withFileTypes: true });
files.forEach(file => {
  if (!file.isFile() || file.name === 'read.md' || file.name === '') {
    return;
  }

  const filePath = path.join(currentDirPath, file.name);
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  createNewContent(rl)
    .then(content => {
      fs.writeFileSync(filePath, content);
    })
    .catch(e => console.error(e))
})

