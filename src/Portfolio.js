import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X, ArrowDown, Moon, Sun } from 'lucide-react';
import { FaLaptopCode, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './styles.css'; // Path to the CSS file


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Apply dark mode styles
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', true);
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', false);
    }
  }, [darkMode]);

  const portfolioData = {
    name: "Sukitha Bandara",
    title: "Creative Full Stack Developer",
    about: "I create stunning web applications with modern technologies. Passionate about design, user experience, and scalable architecture.",
    skills: ["React", "Node.js", "Python", "AWS", "GraphQL", "Docker"],
    projects: [
      { title: "E-Commerce Platform", description: "Built a full-stack platform with payment integration.", tags: ["React", "Node.js"], link: "#" },
      { title: "Social Media App", description: "Developed a real-time social media app with chat.", tags: ["React", "Firebase"], link: "#" },
      { title: "Portfolio Site", description: "Designed a responsive portfolio with animations.", tags: ["React", "Tailwind"], link: "#" },
    ],
    experience: [
      { company: "Tech Innovators", position: "Lead Developer", period: "2020 - Present" },
      { company: "Creative Startups", position: "Full Stack Developer", period: "2018 - 2020" },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
            setActiveSection(section);
          }
        }
      }

      document.querySelectorAll('[data-animate]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isElementVisible = rect.top <= windowHeight * 0.8;
        setIsVisible((prev) => ({
          ...prev,
          [el.id]: isElementVisible,
        }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getAnimationClass = (id) => (isVisible[id] ? 'animate-visible' : '');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white relative">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-800 shadow-lg backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity duration-300">
            {portfolioData.name}
          </h1>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex space-x-6">
            {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative text-lg hover:text-blue-600 transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? 'text-blue-600 font-bold' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-800" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white p-4 shadow-md">
            {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-center text-lg text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section
  id="home"
  className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center"
  style={{
    backgroundImage: `url('hero-background.jpg')`, // Replace with your image URL
  }}
>

    {/* Profile Picture */}
  <div className="relative z-10 mb-6 animate-fade-in">
    <img
      src="profile-pic.jpg" // Replace with your profile image URL
      alt="Sukitha Bandara"
      className="w-32 sm:w-48 lg:w-64 rounded-full border-4 border-white shadow-lg transform transition-transform duration-500 hover:scale-105"
    />
  </div>
  <h1 className="text-6xl font-extrabold animate-fade-in">{portfolioData.name}</h1>
  <p className="text-xl mt-4 animate-slide-up">{portfolioData.title}</p>
  <div className="mt-8 flex space-x-4">
    {[Github, Linkedin, Mail].map((Icon, i) => (
      <a
        key={i}
        href="#"
        className="p-3 bg-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300"
      >
        <Icon className="text-blue-600" />
      </a>
    ))}
  </div>

  {/* Enhanced Let's Connect Button with Animated Send Icon */}
<div className="mt-6 relative group">
  <a
    href="#contact"
    className="relative inline-block px-10 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-bold rounded-full shadow-lg overflow-hidden z-10 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></span>
    <span className="relative z-20 flex items-center justify-between">
      <span>Let’s Connect</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 ml-3 transform transition-all duration-300 group-hover:translate-x-2 group-hover:rotate-45"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </span>
  </a>
  {/* Ripple Effect */}
  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 group-hover:animate-ripple"></span>
</div>

</section>


      <section id="about" className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 animate-slide-in">{portfolioData.about}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioData.skills.map((skill, idx) => (
              <div key={idx} className="p-3 bg-blue-100 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 text-white relative overflow-hidden">
  {/* Background Video */}
  <video 
    className="absolute inset-0 w-full h-full object-cover z-0" 
    autoPlay 
    loop 
    muted
  >
    <source src="v2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay for better readability */}
  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

  <div className="max-w-6xl mx-auto text-center relative z-20">
    <h2 className="text-4xl font-bold mb-8">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {portfolioData.projects.map((project, idx) => (
        <div
          key={idx}
          className="relative p-6 bg-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-500 group-hover:to-blue-700 rounded-lg opacity-25 transition-all duration-300"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-white transition-all duration-300">
              {project.title}
            </h3>
            <p className="mb-3 text-gray-700 group-hover:text-white transition-all duration-300">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-block text-blue-600 hover:underline group-hover:text-white transition-all duration-300"
            >
              View Project
            </a>
          </div>

          {/* Animated glowing border */}
          <div className="absolute inset-0 border-4 border-transparent rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 animate-glow transition-all duration-500"></div>
        </div>
      ))}
    </div>
  </div>
</section>



<section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 text-center relative overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-extrabold mb-12 text-gray-800 dark:text-white animate__animated animate__fadeInUp">Experience</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {portfolioData.experience.map((job, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="relative p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-700"
        >
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-xl z-0 transition-all duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              {/* Dynamic Icons based on Position */}
              {job.position === "Lead Developer" ? (
                <FaLaptopCode className="text-4xl text-blue-600" />
              ) : (
                <FaBuilding className="text-4xl text-blue-600" />
              )}
              <h3 className="ml-4 text-2xl font-semibold text-gray-800 dark:text-white">{job.position}</h3>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">{job.company}</p>
            <p className="text-md text-gray-500 dark:text-gray-400">{job.period}</p>
          </div>

          <div className="absolute inset-0 border-4 border-transparent rounded-xl bg-gray-300 opacity-0 group-hover:opacity-100 animate-glow transition-all duration-500"></div>
        </motion.div>
      ))}
    </div>
  </div>
</section>






<section id="contact" className="py-20 relative overflow-hidden text-white">
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover z-0"
    autoPlay
    loop
    muted
  >
    <source src="contact.mp4" type="video/webm" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

  {/* Contact Content */}
  <div className="max-w-6xl mx-auto text-center relative z-20">
    <h2 className="text-4xl font-bold mb-8">Contact</h2>
    <form className="space-y-6" action="#">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full p-4 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full p-4 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full p-4 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        rows="6"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Send Message
      </button>
    </form>
  </div>
</section>


      <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto text-center px-4">
    {/* Footer Top Section */}
    <div className="space-y-6">
      <h3 className="text-3xl font-bold">Let's Connect!</h3>
      <p className="text-lg text-gray-300">
        I'm always open to new opportunities, ideas, or collaborations. Feel free to reach out!
      </p>
    </div>

    {/* Footer Links and Social Media Section */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Contact Info */}
      <div className="text-gray-300">
        <h4 className="text-xl font-semibold mb-3">Contact</h4>
        <p className="mb-2">Email: <a href="mailto:sukithabandara13@gmail.com" className="hover:text-blue-500">sukithabandara13@gmail.com</a></p>
        <p className="mb-2">Phone: <span className="text-blue-500">+94 761148054</span></p>
      </div>

      {/* Social Media Links */}
      <div className="text-gray-300">
        <h4 className="text-xl font-semibold mb-3">Social Media</h4>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-all duration-300"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-all duration-300"
          >
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-all duration-300"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-all duration-300"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-gray-300">
        <h4 className="text-xl font-semibold mb-3">Get in Touch</h4>
        <p>&copy; {new Date().getFullYear()} Sukitha Bandara. All Rights Reserved.</p>
      </div>
    </div>

    {/* Scroll to Top Button */}
    <div className="mt-8">
      <a
        href="#top"
        className="inline-block text-blue-500 hover:text-blue-700 transition-all duration-300"
      >
        <i className="fas fa-arrow-up fa-2x"></i> Back to Top
      </a>
    </div>
  </div>
</footer>


    </div>
  );
};


export default Portfolio;
