import { useRef, useEffect, useState } from "react";
import logo from "./assets/gh2.png";

function Card() {
  const [halfWidth, setHalfWidth] = useState();
  const [halfHeight, setHalfHeight] = useState();
  const wrapper = useRef();
  const card = useRef();
  const text = useRef();

  const getWrapperSizes = () => {
    const { width, height } = wrapper.current.getBoundingClientRect();
    setHalfWidth(width / 2);
    setHalfHeight(height / 2);
  };

  const handleCardHover = ({ offsetX, offsetY }) => {
    const rotationX = ((offsetY - halfHeight) / halfHeight) * -20;
    const rotationY = ((offsetX - halfWidth) / halfWidth) * 20;
    card.current.style.transition = "0.1s";
    card.current.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    text.current.style.transition = "0.1s";
    text.current.style.transform = `translate3d(${rotationY / 4}%, ${
      -rotationX / 4
    }%,0)`;
  };

  const handleMouseLeave = () => {
    card.current.style.transition = "transform 0.3s ease-in-out 0.2s";
    card.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    text.current.style.transition = "transform 0.1s ease-in-out";
    text.current.style.transform = `translate3d(0, 0, 0)`;
  };

  useEffect(() => {
    getWrapperSizes();
  }, []);

  return (
    <div
      id="wrapper"
      ref={wrapper}
      className="z-1 p-4 m-20 transition [perspective:1200px]
      hover:scale-110 [transform-style:preserve-3d] [transform:translateZ(0)]"
      onMouseLeave={() => handleMouseLeave()}
      onMouseMove={(e) => handleCardHover(e.nativeEvent)}
    >
      <div
        id="card"
        ref={card}
        className="bg-isometric w-[340px] h-56 rounded-xl shadow-2xl shadow-purple-800 border-4 border-purple-900"
      >
        <div
          ref={text}
          className="text-center font-bold text-lg pt-10 select-none text-black"
        >
          WELCOME TO THE INTERNET
          <img
            alt="logo"
            src={logo}
            className="h-24 w-24 m-5 mx-auto pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
