import HoverImg from "./hoverImg";

function isImageLink(link) {
  const regex = new RegExp("\.jpg|\.png|\.JPG|\.PNG");
  return regex.test(link);
}

function parseImagesLinks() {
  const links = document.querySelectorAll('.content a');
  let result = [];
  links.forEach(link => {
    if (isImageLink(link.href)) {
      result.push(link);
    }
  });
  return result;
}

export default function() {
  const links = parseImagesLinks();
  links.forEach(link => {
    let href = link.href;
    link.classList.add('hover-img-link');
    link.onclick = (e) => {
      e.preventDefault();
    }

    link.setAttribute('data-img', href);
    new HoverImg( link );
  });
}