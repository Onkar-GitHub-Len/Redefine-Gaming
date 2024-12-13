// Import required modules and components
import React from "react";
import { useGSAP } from "@gsap/react"; // GSAP animation hook
import gsap from "gsap"; // GSAP animation library
import { ScrollTrigger } from "gsap/all"; // ScrollTrigger plugin for GSAP
import AnimatedTitle from "./AnimatedTitle"; // Custom animated title component

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// About Component
const About = () => {
  // GSAP animation hook for the clipping effect
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // Element to trigger the animation
        start: "center center", // Start animation when the trigger enters the viewport
        end: "+=800 center", // Animation lasts for 800px of scrolling
        scrub: 0.5, // Smooth scrubbing effect
        pin: true, // Pin the element in place during animation
        pinSpacing: true, // Add spacing after the pinned element
      },
    });

    // Expand the masked area during the scroll
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // Expand width to full viewport
      height: "100vh", // Expand height to full viewport
      borderRadius: 0, // Remove border radius
    });
  });

  return (
    <div className="min-h-screen w-screen" id="about">
      {/* About Section */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Subtitle */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        {/* Animated Title */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* About Section Text */}
        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG.</p>
          <p>Zentry unites every player from countless games and platforms.</p>
        </div>
      </div>

      {/* Clipping Animation Section */}
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          {/* Background Image */}
          <img
            src="img/about.webp"
            alt="Background depicting an adventure"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

// Export the About component
export default About;
