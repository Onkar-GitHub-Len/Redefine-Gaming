import React, { useRef, useState } from "react";
import BentoCard from "../blocks/BentoCard";
import { TiLocationArrow } from "react-icons/ti"; // Icon for visual enhancement
import { useRaf } from "react-use"; // Hook for optimized frame rendering

/**
 * Component: BentoTilt
 * Purpose: Adds interactive tilt effect to child components based on mouse movement.
 * Author: Onkar
 */
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState(""); // State to store dynamic transform styles
  const itemRef = useRef(); // Reference to track the current DOM element

  // Handles mouse movement and applies tilt effect
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect(); // Get dimensions of the component

    const relativeX = (e.clientX - left) / width; // Calculate mouse position relative to width
    const relativeY = (e.clientY - top) / height; // Calculate mouse position relative to height

    const tiltX = (relativeY - 0.5) * 10; // Calculate X-axis tilt
    const tiltY = (relativeX - 0.5) * -10; // Calculate Y-axis tilt

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;

    setTransformStyle(newTransform); // Apply new transform style
  };

  // Resets the tilt effect when the mouse leaves
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

/**
 * Component: Features
 * Purpose: Displays interactive feature cards with tilt and video support.
 * Author: Onkar
 */
const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto md:px-10">
        {/* Section Header */}
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the MetaGame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        {/* Main Feature Card */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            tittle={
              <>
                radi<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        {/* Additional Features Grid */}
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          {/* Feature 2 */}
          <BentoTilt className="bento-tilt-1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              tittle={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          {/* Feature 3 */}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              tittle={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          {/* Feature 4 */}
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              tittle={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          {/* Coming Soon Feature */}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          {/* Additional Feature Video */}
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              autoPlay
              loop
              muted
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
