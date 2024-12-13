// Importing the useState hook for managing state in functional components.
import { useState } from "react";

// Importing all the components used in the application.
import Hero from "./Components/Hero";       // Hero section component
import About from "./Components/About";     // About section component
import Navbar from "./Components/Navbar";   // Navigation bar component
import Features from "./Components/Features"; // Features section component
import Story from "./Components/Story";     // Story section component
import Contact from "./Components/Contact"; // Contact form or information section component
import Footer from "./Components/footer";   // Footer component (note the lowercase "footer" file name)

// Main App component
function App() {
  return (
    // Main container div for the entire app layout
    // Applies a relative position, full viewport height, full screen width, and hides horizontal overflow
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Navbar is placed at the top */}
      <Navbar />
      
      {/* Hero section typically includes a banner or introductory content */}
      <Hero />
      
      {/* About section providing information about the purpose or organization */}
      <About />
      
      {/* Features section highlighting key features or benefits */}
      <Features />
      
      {/* Story section might include a narrative or timeline */}
      <Story />
      
      {/* Contact section for user interaction like forms or contact details */}
      <Contact />
      
      {/* Footer section for bottom-of-page content, like copyright or links */}
      <Footer />
    </div>
  );
}

// Exporting the App component to be used in the main entry point (e.g., index.js)
export default App;
