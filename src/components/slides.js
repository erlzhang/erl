import React, { useState, useEffect } from "react";
import { getDate } from "../utils/book";
import Slider from "../utils/slider";
import { Loading } from "./icons";
import { Link } from "gatsby";

function SlideImage({ site, slide }) {
  return (
    <div className="slide__img">
      <Link to={`/${slide.slug}`} className="slide__link" title={slide.fields.title}></Link>
      <div className="slide__img_placehold"></div>
      <img src={site.imgPrefix + slide.fields.img} className="slide__img_entity" alt={slide.fields.title} />
    </div>
  )
}

function Slide({ slide, side, site }) {
  return (
    <div className="slide__section">
      {
        side === 'right' &&
        <SlideImage site={site} slide={slide}></SlideImage>
      }
      <div className={`slide__text slide__text_${side}`}>
        <Link to={`/${slide.slug}`} className="slide__link" title={slide.fields.title}></Link>
        <div className="slide__title">
          <div className="slide__title_inner">
            <h2 className="slide__title_text">{ slide.fields.title }</h2>
          </div>
        </div>
        <div className="slide__time">
          <div className="slide__time_inner">
            <p className="slide__time_text">{ getDate(slide) }</p>
          </div>
        </div>
      </div>
      {
        side === 'left' &&
        <SlideImage site={site} slide={slide}></SlideImage>
      }
    </div>
  )
}

export default function({ slides, site }) {
  const items = slides.map((slide, index) => {
    return (
      <Slide site={site} slide={slide} key={slide.slug} side={index % 2 === 1 ? 'left' : 'right'}></Slide>
    )
  });

  let slider;

  useEffect(() => {
    if (!slider) {
      slider = new Slider();
    }
  })

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
        <div className="slide__control__icon slide__control_top" id="prevBtn">
          <svg width="40" height="40">
            <circle className="circle-progress" r="18" cy="20" cx="20" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
          <span className="slide__control_arrow slide__control_up"></span>
        </div>
        { controls }
        <div className="slide__control__icon slide__control_bottom" id="nextBtn">
          <svg width="40" height="40">
            <circle className="circle-progress" r="18" cy="20" cx="20" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
          <span className="slide__control_arrow slide__control_down"></span>
        </div>
      </ul>
    </>
  )
}