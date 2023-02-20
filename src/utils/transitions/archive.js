import gsap from "gsap";

export const fadeOut = () => {
  gsap.to(".archive__list", {
    transform: "translateX(-100px)",
    opacity: 0,
    during: 0.4,
    ease: "sine"
  });
}
