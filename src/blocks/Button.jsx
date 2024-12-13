import React from "react";

const Button = ({ tittle, containerClass, leftIcon, id, rightIcon }) => {
  return (
    <button
      id=""
      className={`group relative z-10 w-fit cursor-pointer bg-violet-50 overflow-hidden rounded-full  px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{tittle}   </div>
      </span>
      {rightIcon}
      </button>
  );
};

export default Button;
