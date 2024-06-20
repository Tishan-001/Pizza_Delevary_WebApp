import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/hero1.jpg";
import ava02 from "../../../assets/images/hero2.jpg";
import ava03 from "../../../assets/images/hero3.jpg";

import "../../../styles/heroslider.css";

const HeroSlider = () => {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 3000,
      swipeToSlide: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings}>
        <div>
          <div className="hero__slider__content d-flex align-items-center gap-3 ">
            <img src={ava01} alt="avatar" className=" rounded" />
          </div>
        </div>
        <div>
          <div className="hero__slider__content d-flex align-items-center gap-3 ">
            <img src={ava02} alt="avatar" className=" rounded" />
          </div>
        </div>
        <div>
          <div className="hero__slider__content d-flex align-items-center gap-3 ">
            <img src={ava03} alt="avatar" className=" rounded" />
          </div>
        </div>
      </Slider>
    );
  };
  
  export default HeroSlider;