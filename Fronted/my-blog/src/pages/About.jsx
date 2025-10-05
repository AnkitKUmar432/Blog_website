import React from 'react';
import { motion } from 'framer-motion';

const developers = [
  {
    name: 'Ankit Kumar',
    role: 'Frontend Developer & Backend Contributor',
    desc: 'Led the frontend using React and Tailwind. Also contributed to backend APIs and dynamic features.',
  },
  {
    name: 'Ashutosh Sharma',
    role: 'Admin Dashboard & Layout Developer',
    desc: 'Built admin dashboard functionality and focused on the overall page layout and structure.',
  },
];

const projects = [
  {
    title: 'Real-Time Chat App',
    description: 'A 1-to-1 messaging app with live communication using React.js, Socket.IO, and Node.js.',
  },
  {
    title: 'E-Commerce Website',
    description: 'A responsive shopping platform with cart, admin, and product management functionality.',
  },
  {
    title: 'College Blog Website',
    description: 'Final year project with blog creation, admin dashboard, and responsive frontend.',
  },
];

function About() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-50 py-16 px-4">
      {/* Animated Heading */}
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Us & Our Work
      </motion.h2>

      {/* School Info */}
      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-gray-700">
          The <strong>School of Research and Technology</strong> fosters innovation, hands-on learning, and technical
          excellence. Through expert mentorship and modern facilities, students here transform ideas into impactful
          technology. It’s a space where we build, break, learn, and grow.
        </p>
      </motion.div>

      {/* Developer Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {developers.map((dev, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{dev.name}</h3>
            <p className="text-yellow-600 font-medium mb-1">{dev.role}</p>
            <p className="text-gray-600">{dev.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects Section */}
      <motion.h3
        className="text-3xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Projects We’ve Worked On
      </motion.h3>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-2 text-gray-800">{proj.title}</h4>
            <p className="text-gray-600">{proj.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default About;
