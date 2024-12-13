// Import necessary libraries and hooks
import React, { useEffect, useRef, useState } from "react";
import Button from "../blocks/Button"; // Importing a reusable Button component
import { TiLocationArrow } from "react-icons/ti"; // Importing an icon from react-icons library
import { gsap } from "gsap"; // Importing GSAP for animations
import { ScrollTrigger } from "gsap/all"; // Importing ScrollTrigger plugin for scroll-based animations
import { useWindowScroll } from "react-use"; // Custom hook to track scroll position

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Navbar Component
const Navbar = () => {
  // List of navigation items
  const navItems = ["Nexus", "Vault", "Prologue", "About"];

  // References for DOM elements
  const navContainerRef = useRef(null); // Ref for the navigation container
  const audioElementRef = useRef(null); // Ref for the audio element

  // States to manage audio play status and visual indicators
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // State to manage visibility of the navigation bar
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Track the current scroll position
  const { y: currentScrollY } = useWindowScroll();

  // Function to toggle the audio indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Effect to toggle navbar visibility based on scroll direction
  useEffect(() => {
    if (currentScrollY === 0) {
      // Reset navbar to visible at the top of the page
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Hide navbar on scrolling down
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Show navbar on scrolling up
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Effect to animate navbar based on visibility state
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // Move navbar up or down
      opacity: isNavVisible ? 1 : 0, // Adjust opacity
      duration: 0.2, // Animation duration
    });
  }, [isNavVisible]);

  // Effect to handle play/pause of the audio element
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play(); // Play audio
    } else {
      audioElementRef.current.pause(); // Pause audio
    }
  }, [isAudioPlaying]);

  return (
    // Main container for the navigation bar
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      {/* Adding a comment to mention the developer */}
      {/* Created by Onkar Dheemate */}
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              tittle="Products"
              rightIcon={<TiLocationArrow />}
              containerClass=" bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation links and audio toggle button */}
          <div className="flex h-full items-center">
            {/* Navigation links (visible on medium and larger screens) */}
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  className="nav-hover-btn"
                  href={`#${item.toLowerCase()}`} // Linking to respective sections
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio toggle button */}
            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              {/* Hidden audio element */}
              <audio
                src="/audio/loop.mp3"
                ref={audioElementRef}
                className="hidden"
                loop
              />

              {/* Indicator bars for audio visualization */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

// Exporting the Navbar component
// Created and maintained by Onkar Dheemate
export default Navbar;
