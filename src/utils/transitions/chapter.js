import gsap from "gsap";

export const fadeOut = ({ node, entity }) => {
  let ele = node.querySelector(".chapter__content");
  gsap.to(ele, {
    transform: "translateX(50%)",
    //transform: "rotateY(180deg)",
    //width: "50%",
    opacity: 0,
    during: 0.8,
    ease: "sine"
  });
  node.querySelector(".revealer").style.display = "block";

  const reveals = node.querySelectorAll(".revealer__item-inner");
  reveals.forEach((ele, index) => {
    if (index > 0) {
      return;
    }
    gsap.fromTo(
      ele,
      {
        transform: "translate(-100%, 0%)"
      },
      {
        transform: "translate(100%, 0%)",
        during: 1.6,
        delay: 0.15 * index
      }
    )
  });


}

export const fadeIn = ({ node }) => {
  let container = document.querySelector(".book__body");
  container.scrollTop = 0;
  let ele = node.querySelector(".chapter__content");
  gsap.fromTo(
    ele,
    {
      opacity: 0,
      transform: "translateX(-100px)",
    },
    {
      transform: "translateX(0)",
      opacity: 1,
      during: 0.5,
      ease: "sine"
    }
  );
}

export const onEnterChapter = {
  trigger: ({ node }) => {
    let container = document.querySelector(".book__body");
    if (!container) return;

    container.scrollTop = 0;
  }
}
