"use client";

import { useRef } from "react";
import "./RecommendedCars.css";

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  kilometers: number;
  fuel: string;
  main_image: string | null;
};

function format(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function RecommendedCars({ car }: { car: Car[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const move = (direction: "left" | "right") => {
    const element = carouselRef.current;
    if (!element) return;
    const width = element.clientWidth * 0.85;
    const maxScroll = element.scrollWidth - element.clientWidth;

    if(direction == "right"){
        if(element.scrollLeft >= maxScroll - 10){
            element.scrollTo({left: 0, behavior: "smooth"});
        }else{
            element.scrollBy({left: width, behavior: "smooth"});
        }
    }else{
        if(element.scrollLeft <= 10){
            element.scrollTo({left: maxScroll, behavior: "smooth"});
        }else{
            element.scrollBy({left: -width, behavior: "smooth"});
        }
    }
    
    element.scrollBy({
      left: direction == "right" ? width : -width,
      behavior: "smooth",
    });
  };

  if (car.length == 0) {
    return null;
  }

  return (
    <section className="recommended">
      <h2 className="recommended-title">Препорачано за вас</h2>

      <div className="recommended-wrapper">
        <button
          type="button"
          aria-label="Претходно возило"
          className="carousel-arrow carousel-arrow-left"
          onClick={() => move("left")}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="recommended-carousel" ref={carouselRef}>
          {car.map((c) => (
            <a href={`/cars/${c.id}`} key={c.id} className="car-card">
              <div className="car-card-image">
                <img
                  src={c.main_image ?? "/cars/placeholder.jpg"}
                  alt={`${c.brand} ${c.model}`}
                />
              </div>
              <div className="car-card-body">
                <h3>
                  {c.brand} {c.model}
                </h3>
                <p className="car-card-meta">
                  {c.year} · {format(c.kilometers)} km · {c.fuel}
                </p>
                <p className="car-card-price">{format(c.price)} €</p>
              </div>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Следно возило"
          className="carousel-arrow carousel-arrow-right"
          onClick={() => move("right")}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}