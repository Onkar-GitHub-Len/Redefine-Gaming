import React from "react";
import AnimatedTitle from "./AnimatedTitle"; // Component for animated section titles
import { useRef } from "react";
import gsap from "gsap"; // Animation library for smooth interactions
import Button from "../blocks/Button"; // Button component for call-to-actions

/**
 * Component: Story
 * Purpose: Renders the "Story" section of the page with interactive 3D image effects and a descriptive title.
 * Author: Onkar
 */
const Story = () => {
  const frameRef = useRef(null); // Reference to the image container for 3D effects

  /**
   * Handles mouse leave events by resetting the rotation effect on the image.
   */
  const handleMouseLeave = (e) => {
    const element = frameRef.current; // Get the referenced element
    gsap.to(element, {
      duration: 0.3, // Animation duration
      rotateX: 0, // Reset X rotation
      rotateY: 0, // Reset Y rotation
      ease: "power1.inOut", // Smooth easing
    });
  };

  /**
   * Placeholder function for mouse enter events (currently unused).
   */
  const handleMouseEnter = () => {};

  /**
   * Placeholder function for mouse up events (currently unused).
   */
  const handleMouseUp = () => {};

  /**
   * Handles mouse move events to create a dynamic 3D tilt effect on the image.
   * Calculates rotation values based on cursor position relative to the image.
   */
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e; // Get cursor position
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect(); // Get image dimensions and position
    const xPos = clientX - rect.left; // Cursor X position relative to image
    const yPos = clientY - rect.top; // Cursor Y position relative to image

    const centerX = rect.width / 2; // Horizontal center of the image
    const centerY = rect.height / 2; // Vertical center of the image

    const rotateX = ((yPos - centerY) / centerY) * -10; // Calculate X rotation
    const rotateY = ((xPos - centerX) / centerX) * 10; // Calculate Y rotation

    gsap.to(element, {
      duration: 0.3, // Animation duration
      rotateX, // Apply calculated X rotation
      rotateY, // Apply calculated Y rotation
      transformPerspective: 500, // Perspective effect for depth
      ease: "power1.inOut", // Smooth easing
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        {/* Section subtitle */}
        <p className="font-general uppercase md:text-[10px] text-sm">
          the Multiversal IP World
        </p>

        {/* Animated title and image container */}
        <div className="relative size-full">
          <AnimatedTitle
            title="<b>the</b> <b>story</b> <b>of</b> <br /> <b>a</b> <b>hidden</b> <b>realm</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          {/* Image with interactive 3D tilt effect */}
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp" // Image source
                  ref={frameRef} // Bind ref for interaction
                  onMouseLeave={handleMouseLeave} // Reset tilt on mouse leave
                  onMouseEnter={handleMouseEnter} // (Optional) Mouse enter handler
                  onMouseUp={handleMouseUp} // (Optional) Mouse up handler
                  onMouseMove={handleMouseMove} // Apply tilt on mouse move
                  alt="entrance.webp" // Accessible alt text
                  className="object-contain" // Image styling
                />
              </div>
            </div>

            {/* Invisible SVG for additional effects (optional) */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Text and button below the image */}
          <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
            <div className="flex h-full w-fit flex-col items-center md:items-start">
              <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
                Where realms converge, lies Zentry and the boundless pillar.
                Discover its secrets and shape your fate amidst infinite
                opportunities.
              </p>

              {/* Call-to-action button */}
              <Button
                id="realm-btn"
                tittle="discover prologue"
                containerClass="mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
