import React, { useState, useEffect, useRef } from "react";
import { getDate } from "../utils/book";
import Slider from "../utils/slider";
import { Loading } from "./icons";
// import { Link } from "gatsby";
import Link from "gatsby-plugin-transition-link";
import gsap from 'gsap';
import { getImgCover } from "../utils/style";
import { fadeIn } from "../utils/transitions/book";

function SlideImage({ site, slide, onExit }) {
  return (
    <div className="slide__img">
      <Link
        to={slide.summary.slug}
        className="slide__link"
        title={slide.summary.title}
        exit={{
          length: 1,
          trigger: onExit,
          state: { pass: 'this to the exiting page' }
        }}
        entry={{
          delay: 1,
          length: 1,
          trigger: fadeIn,
        }}
      ></Link>
      <div className="slide__img_placehold"></div>
      <div
        className="slide__img_entity"
        style={getImgCover(site.imgPrefix + slide.summary.img)}
      ></div>
      <img
        src={site.imgPrefix + slide.summary.img}
        style={{
          display: "none"
        }}
        alt={slide.summary.title}
      />
    </div>
  )
}

function Slide({ slide, side, site, onExit }) {
  return (
    <div className="slide__section">
      {
        side === 'right' &&
        <SlideImage site={site} slide={slide} onExit={onExit}></SlideImage>
      }
      <div className={`slide__text slide__text_${side}`}>
        <Link
          to={slide.summary.slug}
          className="slide__link"
          title={slide.summary.title}
          exit={{
            length: 1,
            trigger: onExit,
            state: { pass: 'this to the exiting page' }
          }}
          entry={{
            delay: 1,
            length: 1,
            trigger: fadeIn,
          }}
        ></Link>
        <div className="slide__title">
          <div className="slide__title_inner">
            <h2 className="slide__title_text">{ slide.summary.title }</h2>
          </div>
        </div>
        <div className="slide__time">
          <div className="slide__time_inner">
            <p className="slide__time_text">{ getDate(slide.summary) }</p>
          </div>
        </div>
      </div>
      {
        side === 'left' &&
        <SlideImage site={site} slide={slide} onExit={onExit}></SlideImage>
      }
    </div>
  )
}

export default function({ slides, site }) {
  const slider = useRef(null);

  useEffect(() => {
    if (slider.current == null) {
      slider.current = new Slider();
    }
  })

  const items = slides.map((slide, index) => {
    return (
      <Slide
        site={site}
        slide={slide}
        key={slide.name}
        onExit={({ node, exit }) => {
          slider.current && slider.current.focusCurrent()
        }}
        side={index % 2 === 1 ? 'left' : 'right'}
      ></Slide>
    )
  });

  // const [current, setCurrent] = useState(0);

  // const handleControlClick = () => {

  // }

  const controls = slides.map((slide, index) => {
    return (
      <li
        className={`slide__control${index === 0 ? ' current': ''}`}
      ></li>
    )
  });

  return (
    <>
      <Loading></Loading>
      <main className="slide" id="sectionContainer">
        { items }
      </main>

      <ul className="slide__controls">
        <div
          className="slide__control__icon slide__control_top"
          id="prevBtn"
        >
          <svg width="40" height="40">
            <circle className="circle-progress" r="18" cy="20" cx="20" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
          <span className="slide__control_arrow slide__control_up"></span>
        </div>
        { controls }
        <div
          className="slide__control__icon slide__control_bottom"
          id="nextBtn"
        >
          <svg width="40" height="40">
            <circle className="circle-progress" r="18" cy="20" cx="20" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
          <span className="slide__control_arrow slide__control_down"></span>
        </div>
      </ul>
    </>
  )
}
