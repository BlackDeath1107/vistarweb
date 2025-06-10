"use client"
import React, { useState, useEffect, useRef } from "react";

// Custom hook for intersection observer (for scroll animations)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

// 3D Cube Component for visual interest
const Cube = () => {
  return (
    <div className="cube-container perspective-500 h-32 w-32 relative transform-style-3d animate-spin-slow">
      <div className="cube-face absolute h-full w-full bg-blue-800 opacity-70 transform translate-z-16"></div>
      <div className="cube-face absolute h-full w-full bg-blue-700 opacity-70 transform -translate-z-16 rotate-y-180"></div>
      <div className="cube-face absolute h-full w-full bg-purple-400 opacity-70 transform rotate-y-90 translate-z-16"></div>
      <div className="cube-face absolute h-full w-full bg-purple-500 opacity-70 transform -rotate-y-90 translate-z-16"></div>
      <div className="cube-face absolute h-full w-full bg-blue-600 opacity-70 transform rotate-x-90 translate-z-16"></div>
      <div className="cube-face absolute h-full w-full bg-purple-300 opacity-70 transform -rotate-x-90 translate-z-16"></div>
    </div>
  );
};

// NavBar Component
const NavBar = ({ scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-900 shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white font-bold text-xl md:text-2xl">
            Vistar Solutions
          </span>
        </div>

        <div className="hidden md:flex space-x-8">
          {["about", "services", "vision", "works", "testimonial"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-white relative overflow-hidden group py-2 px-4 uppercase text-sm tracking-wider hover:text-purple-300 transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
              </button>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center relative overflow-hidden">
      {/* Background 3D elements */}
      <div className="absolute top-20 right-20 opacity-50">
        <Cube />
      </div>
      <div className="absolute bottom-20 left-20 opacity-50">
        <Cube />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Digital Excellence for Your Business
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            At Vistar Solutions, we specialize in helping businesses establish a
            robust online presence through innovative marketing strategies.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

// About Section
const About = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
            About Us
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-gradient-to-br from-blue-800 to-purple-600 p-1 rounded-lg shadow-xl transform hover:rotate-2 transition-transform duration-500">
              <div className="bg-white p-6 rounded-lg h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team is dedicated to driving success by creating powerful,
                  tailored digital solutions. We understand that every business
                  is unique, which is why we work closely with you to craft
                  engaging content, data-driven marketing strategies, and
                  high-performance websites that align with your specific goals.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-800 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Our Approach
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Personalized strategies for your business goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Data-driven decision making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Cutting-edge design and development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Continuous optimization and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const services = [
    {
      title: "Digital Marketing",
      description:
        "Strategic digital marketing campaigns designed to increase visibility and drive qualified traffic.",
      icon: "📈",
    },
    {
      title: "Web Development",
      description:
        "Custom, responsive websites optimized for performance and conversion.",
      icon: "💻",
    },
    {
      title: "Content Creation",
      description:
        "Engaging content that resonates with your audience and boosts your brand.",
      icon: "✏️",
    },
    {
      title: "SEO Optimization",
      description:
        "Data-driven SEO strategies to improve rankings and organic traffic.",
      icon: "🔍",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-16 text-center">
          Our Services
        </h2>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Vision Section
const Vision = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="vision" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Vision</h2>

          <div className="bg-gradient-to-r from-blue-800 to-purple-800 p-1 rounded-lg">
            <div className="bg-blue-900 p-8 rounded-lg">
              <p className="text-xl leading-relaxed mb-6">
                We envision a digital landscape where businesses of all sizes
                can thrive with strategic online presence. Our mission is to
                democratize digital excellence, making powerful marketing tools
                and strategies accessible to everyone.
              </p>
              <p className="text-xl leading-relaxed">
                By 2026, we aim to help over 1,000 businesses transform their
                digital footprint and achieve sustainable growth through our
                innovative solutions.
              </p>

              <div className="mt-12">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-purple-400 shadow-lg">
                  Join Our Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Works Section
const Works = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const projects = [
    {
      title: "TechNova Rebrand",
      category: "Digital Marketing",
      image: "/api/placeholder/600/400",
    },
    {
      title: "GreenLife E-commerce",
      category: "Web Development",
      image: "/api/placeholder/600/400",
    },
    {
      title: "FinSecure App",
      category: "UX/UI Design",
      image: "/api/placeholder/600/400",
    },
    {
      title: "EduReach Campaign",
      category: "Content Strategy",
      image: "/api/placeholder/600/400",
    },
    {
      title: "SportFit Platform",
      category: "Web Development",
      image: "/api/placeholder/600/400",
    },
    {
      title: "ArtisanBrew Marketing",
      category: "SEO & Social Media",
      image: "/api/placeholder/600/400",
    },
  ];

  return (
    <section id="works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center">
          Our Works
        </h2>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-purple-300">{project.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section
const Testimonial = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechNova",
      quote:
        "Working with Vistar Solutions transformed our digital presence completely. Their strategic approach helped us increase our online leads by 150% in just six months.",
      avatar: "/api/placeholder/100/100",
    },
    {
      name: "Mark Thompson",
      position: "Marketing Director, GreenLife",
      quote:
        "The team at Vistar doesn't just deliver websites; they deliver results. Our e-commerce conversion rate improved by 45% after implementing their recommendations.",
      avatar: "/api/placeholder/100/100",
    },
    {
      name: "Jennifer Adams",
      position: "Founder, EduReach",
      quote:
        "Vistar's content strategy revolutionized how we connect with our audience. Their data-driven approach helped us identify exactly what our customers needed.",
      avatar: "/api/placeholder/100/100",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonial"
      className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Client Testimonials
        </h2>

        <div
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${
                  index === currentTestimonial
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute top-0 translate-x-20"
                }`}
              >
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
                  <div className="text-3xl text-purple-300 mb-4">"</div>
                  <p className="text-xl mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-purple-300 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-purple-400 w-6"
                    : "bg-blue-300 bg-opacity-50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section & Footer
const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-800 to-purple-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="mb-8">
                  Get in touch with our team to discuss how we can help you
                  achieve your business goals.
                </p>
                <button className="bg-white text-blue-800 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Schedule a Consultation
                </button>
              </div>

              <div className="md:w-1/2 bg-white p-12">
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      rows="4"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Vistar Solutions</h3>
            <p className="text-blue-200">
              Empowering businesses with innovative digital marketing solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Works
                </a>
              </li>
              <li>
                <a
                  href="#testimonial"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  Content Creation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-purple-300 transition-colors"
                >
                  SEO Optimization
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-blue-200 mb-2">123 Digital Avenue</p>
            <p className="text-blue-200 mb-2">contact@vistarsolutions.com</p>
            <p className="text-blue-200">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-6 text-center text-blue-300">
          <p>
            &copy; {new Date().getFullYear()} Vistar Solutions. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Add global styles for perspective and 3D transforms
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .perspective-500 {
        perspective: 500px;
      }
      .transform-style-3d {
        transform-style: preserve-3d;
      }
      .translate-z-16 {
        transform: translateZ(16px);
      }
      .rotate-y-90 {
        transform: rotateY(90deg);
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .-rotate-y-90 {
        transform: rotateY(-90deg);
      }
      .rotate-x-90 {
        transform: rotateX(90deg);
      }
      .-rotate-x-90 {
        transform: rotateX(-90deg);
      }
      @keyframes spin-slow {
        from {
          transform: rotateX(0) rotateY(0);
        }
        to {
          transform: rotateX(360deg) rotateY(360deg);
        }
      }
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="font-sans">
      <NavBar scrollToSection={scrollToSection} />
      <Hero />
      <About />
      <Services />
      <Vision />
      <Works />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;