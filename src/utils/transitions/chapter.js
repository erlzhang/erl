export const onEnterChapter = {
  trigger: ({ node }) => {
    let container = document.querySelector(".book__body");
    if (!container) return;

    container.scrollTop = 0;
  }
}
