
import gsap from 'gsap';

export const fadeOut = ({ node, entry }) => {
}

export const fadeIn = ({ node, entry }) => {
  gsap.fromTo(
    ".book__title",
    {
      opacity: 0,
      transform: "translateY(100%)"
    },
    {
      opacity: 1,
      transform: "translateY(0)",
      duration: 0.35
    }
  );
  gsap.fromTo(
    ".book__desc",
    {
      opacity: 0,
      transform: "translateY(40px)"
    },
    {
      opacity: 1,
      transform: "translateY(0)",
      duration: 0.35,
      delay: 0.25
    }
  );
  gsap.fromTo(
    ".book__icon",
    {
      opacity: 0,
      transform: "translateX(-100%)"
    },
    {
      opacity: 1,
      transform: "translateX(0)",
      duration: 0.35,
      delay: 0.5
    }
  );
}
