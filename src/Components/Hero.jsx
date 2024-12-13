// Import necessary libraries and components
import { React, useState, useRef, useEffect } from "react";
import Button from "../blocks/Button"; // Reusable button component
import { TiLocationArrow } from "react-icons/ti"; // Importing an arrow icon from react-icons
import { useGSAP } from "@gsap/react"; // Hook for GSAP animation
import gsap from "gsap"; // GSAP animation library
import { ScrollTrigger } from "gsap/all"; // ScrollTrigger plugin for scroll-based animations

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero Component
const Hero = () => {
  // State variables to manage video and UI behavior
  const [currentIdx, setCurrentIdx] = useState(1); // Index of the current video
  const [hasClicked, setHasClicked] = useState(false); // Tracks if the user has clicked on the mini video
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state for videos
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks the number of videos loaded

  const totalVideos = 4; // Total number of videos in rotation
  const upComingVideoIndex = (currentIdx % totalVideos) + 1; // Calculate the next video index

  // Refs for DOM elements
  const nextVideoRef = useRef(null); // Ref for the next video element

  // Handles click on the mini video
  const handleMiniVDClick = () => {
    setHasClicked(true); // Mark as clicked
    setCurrentIdx(upComingVideoIndex); // Update to the next video
  };

  // Effect to update loading state when all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false); // Set loading to false when all videos are loaded
    }
  }, [loadedVideos]);

  // Increment loaded videos count when a video finishes loading
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Returns the source URL for a video based on its index
  const getVideosSrc = (index) => `videos/hero-${index}.mp4`;

  // GSAP animation for when the mini video is clicked
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" }); // Make next video visible
        gsap.to("#next-video", {
          transformOrigin: "center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(), // Start playing next video
        });
        gsap.from("#current-video", {
          transformOrigin: "center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIdx], revertOnUpdate: true } // Re-run animation on currentIdx change
  );

  // GSAP animation for the video frame (clipPath and border radius effects)
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame", // Trigger animation when the video frame enters the viewport
        start: "center center",
        end: "bottom center",
        scrub: true, // Smooth scrubbing effect
      },
    });
  });

  return (
    // Main container for the Hero section
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading animation */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50 overflow-hidden">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video frame container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Mini video preview */}
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100 hover:scale-100"
              onClick={handleMiniVDClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideosSrc(upComingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Next video */}
          <video
            src={getVideosSrc(currentIdx)}
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Main autoplay video */}
          <video
            src={getVideosSrc(currentIdx === totalVideos - 1 ? 1 : currentIdx)}
            loop
            muted
            autoPlay
            className="absolute left-0 right-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Hero heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          R<b>e</b>ality
        </h1>

        {/* Hero text and button */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px:10">
            <h1 className="special-font hero-heading text-blue-100">
              Refefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br />
              Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              tittle="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        R<b>e</b>ality
      </h1>
    </div>
  );
};

// Exporting the Hero component
// Developed and maintained by Onkar Dheemate
export default Hero;
