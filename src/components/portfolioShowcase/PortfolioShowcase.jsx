import { lazy, Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortfolioShowcase.css';

// Project Video & Image Assets
import speectoVideo from '../../assets/speecto.mp4';
import bloombasketVideo from '../../assets/bloombasket.mp4';
import interiordesignVideo from '../../assets/interiordesign.mp4';
import attendanceVideo from '../../assets/attendance.mp4';
import furnitureVideo from '../../assets/furniture.mp4';
import todoVideo from '../../assets/todo.mp4';
import universityVideo from '../../assets/university.mp4';
import travelVideo from '../../assets/travel.mp4';
import diseaseprediction from '../../assets/disease.mp4';
import ecommerceVideo from '../../assets/ecommerce.mp4';

import ai1Img from '../../assets/AI_1.png';
import ai2Img from '../../assets/AI_2.png';
import ai3Img from '../../assets/AI_3.png';
import ai4Img from '../../assets/AI_4.png';
import ai5Img from '../../assets/AI_5.png';
import ai6Img from '../../assets/AI_6.png';
import ai7Img from '../../assets/AI_7.png';
import ai8Img from '../../assets/AI_8.png';
import ai9Img from '../../assets/AI_9.png';
import email1Img from '../../assets/email_1.png';
import email2Img from '../../assets/email_2.png';

import speectoPoster from '../../assets/speecto-poster.jpg';
import bloombasketPoster from '../../assets/bloombasket-poster.jpg';
import interiordesignPoster from '../../assets/interiordesign-poster.jpg';
import attendancePoster from '../../assets/attendance-poster.jpg';
import furniturePoster from '../../assets/furniture-poster.jpg';
import todoPoster from '../../assets/todo-poster.jpg';
import universityPoster from '../../assets/university-poster.jpg';
import travelPoster from '../../assets/travel-poster.jpg';
import diseasePoster from '../../assets/disease-poster.jpg';
import ecommercePoster from '../../assets/ecommerce-poster.jpg';

const ProjectDetailsModal = lazy(() => import('./ProjectDetailsModal'));

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'BloomBasket',
    category: 'Mobile & E-Commerce',
    categoryGroup: 'mobile',
    videoUrl: bloombasketVideo,
    poster: bloombasketPoster,
    icon: 'fas fa-gift',
    description: 'A modern and responsive flower & gift e-commerce application featuring an intuitive user interface, product browsing, shopping cart, and seamless online shopping experience.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Figma', 'VS Code'],
    demoLink: 'https://github.com/MahaAther15/BloomBasket.git',
    codeLink: 'https://github.com/MahaAther15/BloomBasket.git',
    features: [
      'Modern and intuitive flower & gift product browsing interface.',
      'Seamless shopping cart management with instant price calculations.',
      'Responsive layout designed in Figma and developed natively in Flutter/Dart.',
      'Real-time database and user state synchronization via Firebase.',
    ],
  },
  {
    id: 2,
    title: 'Speecto Clone',
    category: 'Web Engineering',
    categoryGroup: 'web',
    videoUrl: speectoVideo,
    poster: speectoPoster,
    icon: 'fas fa-wand-magic-sparkles',
    description: 'A responsive clone of the Speecto website featuring a modern UI, smooth navigation, and optimized user experience.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/speecto_Clone.git',
    codeLink: 'https://github.com/MahaAther15/speecto_Clone.git',
    features: [
      'Pixel-perfect UI replication with responsive desktop and mobile layouts.',
      'Ultra-fast page load speeds and optimized bundle size powered by Vite.',
      'Modular component architecture structured cleanly with React.js.',
      'Dynamic dark-themed aesthetics and smooth interactive micro-transitions.',
    ],
  },
  {
    id: 3,
    title: 'Attendance Management System',
    category: 'Systems & Databases',
    categoryGroup: 'systems',
    videoUrl: attendanceVideo,
    poster: attendancePoster,
    icon: 'fas fa-clipboard-user',
    description: 'A web-based attendance management system that enables efficient student attendance tracking and record management.',
    tags: ['C++', 'DSA', 'SQL', 'Tailwind CSS'],
    demoLink: 'https://github.com/MahaAther15/Attendance_Management_system.git',
    codeLink: 'https://github.com/MahaAther15/Attendance_Management_system.git',
    features: [
      'Automated student attendance tracking and structured digital records.',
      'Optimized data structures using C++ and DSA for fast query execution.',
      'Reliable backend storage structured with SQL database integration.',
      'Clean administrative management interface styled with Tailwind CSS.',
    ],
  },
  {
    id: 4,
    title: 'AI Agents',
    category: 'Applied AI & Automation',
    categoryGroup: 'ai',
    images: [ai1Img, ai2Img, ai3Img, ai4Img, ai5Img, ai6Img, ai7Img, ai8Img, ai9Img],
    videoUrl: '',
    icon: 'fas fa-robot',
    description: 'A collection of intelligent AI agents capable of automating tasks, processing user queries, and integrating with modern AI models.',
    tags: ['Python', 'OpenAI SDK', 'LangChain', 'Automation'],
    demoLink: 'https://github.com/MahaAther15/AI_Agents.git',
    codeLink: 'https://github.com/MahaAther15/AI_Agents.git',
    features: [
      'Autonomous AI agent pipelines automating multi-step cognitive tasks.',
      'Seamless API integration with OpenAI models via official SDKs.',
      'Advanced prompt chains and memory retention using LangChain.',
      'Scalable agent architecture capable of tool calling and data parsing.',
    ],
  },
  {
    id: 5,
    title: 'Interior Design Prediction',
    category: 'Applied AI & ML',
    categoryGroup: 'ai',
    videoUrl: interiordesignVideo,
    poster: interiordesignPoster,
    icon: 'fas fa-house-chimney-window',
    description: 'An AI-powered system that predicts and recommends interior design styles based on user preferences using machine learning.',
    tags: ['Python', 'Machine Learning', 'Streamlit', 'AI'],
    demoLink: 'https://github.com/MahaAther15/Interior_Design_Prediction.git',
    codeLink: 'https://github.com/MahaAther15/Interior_Design_Prediction.git',
    features: [
      'AI-driven recommendation engine tailored to user aesthetic preferences.',
      'Trained machine learning models predicting optimal interior design layouts.',
      'Interactive web dashboard built using Python and Streamlit.',
      'Fast real-time data processing and instant visual predictions.',
    ],
  },
  {
    id: 6,
    title: 'AI Disease Prediction',
    category: 'Healthcare & AI',
    categoryGroup: 'ai',
    videoUrl: diseaseprediction,
    poster: diseasePoster,
    icon: 'fas fa-heart-pulse',
    description: 'A machine learning application that predicts potential diseases from user health information to assist with early risk assessment.',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas'],
    demoLink: 'https://github.com/MahaAther15/AI_Disease_Prediction.git',
    codeLink: 'https://github.com/MahaAther15/AI_Disease_Prediction.git',
    features: [
      'Predictive health risk assessment using Scikit-learn algorithms.',
      'Structured data analysis and feature engineering powered by Pandas.',
      'User-friendly medical symptom input portal built with Streamlit.',
      'High accuracy statistical modeling assisting early diagnosis awareness.',
    ],
  },
  {
    id: 7,
    title: 'AI Email Workflow Automation',
    category: 'Workflow Automation',
    categoryGroup: 'ai',
    images: [email1Img, email2Img],
    videoUrl: '',
    icon: 'fas fa-envelope-open-text',
    description: 'An AI-driven automation platform that classifies emails, creates tasks, manages CRM records, schedules follow-ups, and generates daily summaries.',
    tags: ['Python', 'n8n', 'Gmail API', 'Asana API', 'Airtable', 'OpenAI'],
    demoLink: 'https://github.com/MahaAther15/AI-Powered-Email-Workflow-Automation-System.git',
    codeLink: 'https://github.com/MahaAther15/AI-Powered-Email-Workflow-Automation-System.git',
    features: [
      'Automated email classification and sentiment parsing with AI models.',
      'Seamless multi-platform sync across Gmail API, Asana, and Airtable.',
      'Workflow orchestration structured inside n8n automation engine.',
      'Daily executive summary generation and smart follow-up scheduling.',
    ],
  },
  {
    id: 8,
    title: 'Furniture Ecommerce Website',
    category: 'Web Engineering',
    categoryGroup: 'web',
    videoUrl: furnitureVideo,
    poster: furniturePoster,
    icon: 'fas fa-couch',
    description: 'A responsive furniture e-commerce website featuring product browsing, modern UI, and an engaging shopping experience.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/Furniture_Ecommerce_Website.git',
    codeLink: 'https://github.com/MahaAther15/Furniture_Ecommerce_Website.git',
    features: [
      'Elegant catalog interface displaying curated modern furniture items.',
      'Interactive shopping cart and instant product filter search bar.',
      'Responsive grid scaling perfectly across mobile and desktop viewports.',
      'High performance React single-page architecture built with Vite.',
    ],
  },
  {
    id: 9,
    title: 'University Website',
    category: 'Web Engineering',
    categoryGroup: 'web',
    videoUrl: universityVideo,
    poster: universityPoster,
    icon: 'fas fa-graduation-cap',
    description: 'A responsive university website showcasing academic programs, admissions, events, and campus information with a modern interface.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/University_Website.git',
    codeLink: 'https://github.com/MahaAther15/University_Website.git',
    features: [
      'Academic portal showcasing faculty departments and degree courses.',
      'Live admissions guidance section and interactive campus tour galleries.',
      'Modern institutional aesthetics built with clean Tailwind utilities.',
      'Accessible navigation structure matching educational web standards.',
    ],
  },
  {
    id: 10,
    title: 'Travel Website',
    category: 'Web Engineering',
    categoryGroup: 'web',
    videoUrl: travelVideo,
    poster: travelPoster,
    icon: 'fas fa-plane-departure',
    description: 'A modern travel website designed to showcase destinations, travel packages, and booking information through an interactive interface.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/Travel_website.git',
    codeLink: 'https://github.com/MahaAther15/Travel_website.git',
    features: [
      'Exotic travel destination showcase with high-res image carousels.',
      'Interactive package comparison and vacation itinerary booking cards.',
      'Responsive layout with smooth hover elevation and travel badges.',
      'Clean frontend code utilizing modern ES6+ JavaScript and React.',
    ],
  },
  {
    id: 11,
    title: 'Ecommerce Website',
    category: 'Web Engineering',
    categoryGroup: 'web',
    videoUrl: ecommerceVideo,
    poster: ecommercePoster,
    icon: 'fas fa-cart-shopping',
    description: 'A fully responsive e-commerce website with product listings, shopping cart functionality, and a clean user interface.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/Ecommerce_Website.git',
    codeLink: 'https://github.com/MahaAther15/Ecommerce_Website.git',
    features: [
      'Comprehensive e-commerce storefront with dynamic product cards.',
      'Global shopping cart state management with real-time price totals.',
      'User-centric navigation design optimized for high conversion rates.',
      'Clean CSS styling combined with responsive Tailwind design tokens.',
    ],
  },
  {
    id: 12,
    title: 'AI Adoption Prediction',
    category: 'Data Science & AI',
    categoryGroup: 'ai',
    docxUrl: '/aiadoption.docx',
    videoUrl: '',
    icon: 'fas fa-chart-line',
    description: 'A machine learning model that predicts AI adoption trends using data analysis and predictive algorithms, accompanied by full research documentation.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'DOCX'],
    demoLink: 'https://github.com/MahaAther15/AI_Adoption_prediction.git',
    codeLink: 'https://github.com/MahaAther15/AI_Adoption_prediction.git',
    features: [
      'Predictive analytics forecasting industry-wide AI technology adoption.',
      'Statistical regression and classification models built with Scikit-learn.',
      'Interactive data visualization dashboard deployed on Streamlit.',
      'Complete scientific project document viewable directly in browser.',
    ],
  },
  {
    id: 13,
    title: 'React Todo Application',
    category: 'Web Applications',
    categoryGroup: 'web',
    videoUrl: todoVideo,
    poster: todoPoster,
    icon: 'fas fa-list-check',
    description: 'A responsive Todo application built with React, supporting task creation, state persistence, filtering, and smooth check animations.',
    tags: ['React.js', 'CSS', 'JavaScript', 'HTML'],
    demoLink: 'https://github.com/MahaAther15/React_Todo.git',
    codeLink: 'https://github.com/MahaAther15/React_Todo.git',
    features: [
      'Full CRUD task management (Create, Read, Update, Delete) in React.',
      'Persistent task state maintaining items across browser sessions.',
      'Clean task filtering by status (All, Active, Completed).',
      'Minimalist custom styling with smooth item check animations.',
    ],
  },
  {
    id: 14,
    title: 'Redux Toolkit App',
    category: 'State Management',
    categoryGroup: 'web',
    videoUrl: todoVideo,
    poster: todoPoster,
    icon: 'fas fa-cubes-stacked',
    description: 'A React application demonstrating efficient global state management using Redux Toolkit for scalable frontend enterprise architecture.',
    tags: ['React.js', 'Redux Toolkit', 'JavaScript', 'HTML/CSS'],
    demoLink: 'https://github.com/MahaAther15/Redux_Toolkit.git',
    codeLink: 'https://github.com/MahaAther15/Redux_Toolkit.git',
    features: [
      'Centralized global state management built with Redux Toolkit.',
      'Clean slice reducers, actions, and store configuration architecture.',
      'Predictable state mutation and seamless React component bindings.',
      'Scalable frontend boilerplate ready for large enterprise features.',
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects', count: 14 },
  { id: 'web', label: 'Web Applications', count: 7 },
  { id: 'mobile', label: 'Mobile & Flutter', count: 1 },
  { id: 'ai', label: 'Applied AI & ML', count: 5 },
  { id: 'systems', label: 'Systems & Data', count: 1 },
];

function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.categoryGroup === activeCategory);
  }, [activeCategory]);

  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-container">
        <div className="portfolio-header-area">
          <h2 className="section-title" id="portfolio-title">Selected work</h2>
          <p className="portfolio-lead">
            Web apps, Flutter apps and AI projects. Open any card for the demo video, key features and source code.
          </p>

          <div className="filter-pills" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="pill-name">{cat.label}</span>
                  <span className="pill-count">{cat.count}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="pill-active-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards List */}
        <motion.div
          className="projects-card-grid"
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                  className="project-index-card"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Open details for ${project.title}`}
                >
                  {/* Center: Title & Tech Stack */}
                  <div className="card-content-col">
                    <div className="card-title-row">
                      <h3 className="card-project-name">{project.title}</h3>
                      <span className="card-category-tag">{project.category}</span>
                    </div>

                    {/* Tech Stack List */}
                    <div className="card-tech-stack">
                      {project.tags.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Interactive Launch Indicator */}
                  <div className="card-action-col">
                    <div className="launch-btn" title="View project details">
                      <span className="launch-text">View project</span>
                      <span className="launch-arrow" aria-hidden="true">↗</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Screen-filling Project Details Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}

export default PortfolioShowcase;
