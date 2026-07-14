import { useState, useMemo } from 'react';
import './PortfolioShowcase.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ProjectDetailsModal from './ProjectDetailsModal';
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


// 15 Real Portfolio Projects with Live Video Option & Key Features
const PROJECTS_DATA = [
    {
        id: 1,
        title: 'BloomBasket',
        category: 'Mobile & E-Commerce',
        image: '',
        videoUrl: bloombasketVideo,
        icon: 'fas fa-gift',
        color: '#f5576c',
        description: 'A modern and responsive flower & gift e-commerce website featuring an intuitive user interface, product browsing, shopping cart, and seamless online shopping experience.',
        tags: ['Flutter', 'Dart', 'Firebase', 'Figma', 'VS Code'],
        demoLink: 'https://github.com/MahaAther15/BloomBasket.git',
        codeLink: 'https://github.com/MahaAther15/BloomBasket.git',
        features: [
            'Modern and intuitive flower & gift product browsing interface.',
            'Seamless shopping cart management with instant price calculations.',
            'Responsive layout designed using Figma and developed in Flutter/Dart.',
            'Real-time database and user state synchronization via Firebase.',
        ],
    },
    {
        id: 2,
        title: 'Speecto Clone',
        category: 'Web Development',
        image: '',
        videoUrl: speectoVideo,
        icon: 'fas fa-wand-magic-sparkles',
        color: '#f093fb',
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
        image: '',
        videoUrl: attendanceVideo,
        icon: 'fas fa-clipboard-user',
        color: '#61dafb',
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
        id: 5,
        title: 'Interior Design Prediction',
        category: 'AI & Machine Learning',
        image: '',
        videoUrl: interiordesignVideo,
        icon: 'fas fa-house-chimney-window',
        color: '#a78bfa',
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
        image: '',
        videoUrl: diseaseprediction,
        icon: 'fas fa-heart-pulse',
        color: '#fbbf24',
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
        title: 'AI Agents',
        category: 'AI & Automation',
        image: '',
        images: [ai1Img, ai2Img, ai3Img, ai4Img, ai5Img, ai6Img, ai7Img, ai8Img, ai9Img],
        videoUrl: '',
        icon: 'fas fa-robot',
        color: '#38bdf8',
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
        id: 8,
        title: 'AI Email Workflow Automation',
        category: 'Workflow Automation',
        image: '',
        images: [email1Img, email2Img],
        videoUrl: '',
        icon: 'fas fa-envelope-open-text',
        color: '#ec4899',
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
        id: 9,
        title: 'Furniture Ecommerce Website',
        category: 'Web Development',
        image: '',
        videoUrl: furnitureVideo,
        icon: 'fas fa-couch',
        color: '#f97316',
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
        id: 10,
        title: 'University Website',
        category: 'Web Development',
        image: '',
        videoUrl: universityVideo,
        icon: 'fas fa-graduation-cap',
        color: '#8b5cf6',
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
        id: 11,
        title: 'Travel Website',
        category: 'Web Development',
        image: '',
        videoUrl: travelVideo,
        icon: 'fas fa-plane-departure',
        color: '#06b6d4',
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
        id: 12,
        title: 'Ecommerce Website',
        category: 'Web Development',
        image: '',
        videoUrl: ecommerceVideo,
        icon: 'fas fa-cart-shopping',
        color: '#10b981',
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
        id: 13,
        title: 'AI Adoption Prediction',
        category: 'Data Science / AI',
        image: '',
        docxUrl: '/aiadoption.docx',
        videoUrl: '',
        icon: 'fas fa-chart-line',
        color: '#ef4444',
        description: 'A machine learning model that predicts AI adoption trends using data analysis and predictive algorithms.',
        tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
        demoLink: 'https://github.com/MahaAther15/AI_Adoption_prediction.git',
        codeLink: 'https://github.com/MahaAther15/AI_Adoption_prediction.git',
        features: [
            'Predictive analytics forecasting industry-wide AI technology adoption.',
            'Statistical regression and classification models built with Scikit-learn.',
            'Interactive data visualization dashboard deployed on Streamlit.',
            'Thorough exploratory data analysis processed with Python Pandas.',
        ],
    },
    {
        id: 14,
        title: 'React Todo Application',
        category: 'Web Applications',
        image: '',
        videoUrl: todoVideo,
        icon: 'fas fa-list-check',
        color: '#eab308',
        description: 'A simple and responsive Todo application built with React, supporting task creation, editing, completion, and deletion.',
        tags: ['React.js', 'CSS', 'JavaScript', 'HTML'],
        demoLink: 'https://github.com/MahaAther15/React_Todo.git',
        codeLink: 'https://github.com/MahaAther15/React_Todo.git',
        features: [
            'Full CRUD task management (Create, Read, Update, Delete) in React.',
            'Persistent task state maintaining items across browser sessions.',
            'Clean task filtering by status (All, Active, Completed).',
            'Minimalist custom CSS styling with smooth item check animations.',
        ],
    },
    {
        id: 15,
        title: 'Redux Toolkit App',
        category: 'State Management',
        image: '',
        videoUrl: todoVideo,
        icon: 'fas fa-cubes-stacked',
        color: '#7c3aed',
        description: 'A React application demonstrating efficient global state management using Redux Toolkit for scalable frontend development.',
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

// Categorized Tech Stack Data
const TECH_CATEGORIES = [
    {
        categoryTitle: 'Frontend Architecture',
        icon: 'fas fa-code',
        color: '#f5576c',
        items: [
            { name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26', level: 'Advanced' },
            { name: 'CSS3 / Modern CSS', icon: 'fab fa-css3-alt', color: '#264de4', level: 'Advanced' },
            { name: 'JavaScript (ES6+)', icon: 'fab fa-js', color: '#f0db4f', level: 'Advanced' },
            { name: 'React.js', icon: 'fab fa-react', color: '#61dafb', level: 'Advanced' },
            { name: 'Vite & Tooling', icon: 'fas fa-bolt', color: '#f093fb', level: 'Proficient' },
            { name: 'Responsive Layouts', icon: 'fas fa-mobile-screen', color: '#22c55e', level: 'Advanced' },
        ],
    },
    {
        categoryTitle: 'Cross-Platform & Mobile',
        icon: 'fas fa-mobile-alt',
        color: '#22c55e',
        items: [
            { name: 'Flutter Framework', icon: 'fas fa-layer-group', color: '#02569B', level: 'Proficient' },
            { name: 'Dart Language', icon: 'fas fa-terminal', color: '#0175C2', level: 'Proficient' },
            { name: 'Mobile UI/UX Design', icon: 'fas fa-palette', color: '#a78bfa', level: 'Advanced' },
            { name: 'Cross-Platform Apps', icon: 'fas fa-tablet-screen-button', color: '#4ade80', level: 'Proficient' },
        ],
    },
    {
        categoryTitle: 'Backend & Systems',
        icon: 'fas fa-server',
        color: '#a78bfa',
        items: [
            { name: 'C# Programming', icon: 'fas fa-laptop-code', color: '#9b4f96', level: 'Proficient' },
            { name: '.NET Core / Architecture', icon: 'fas fa-cubes', color: '#512bd4', level: 'Intermediate' },
            { name: 'RESTful APIs', icon: 'fas fa-network-wired', color: '#60a5fa', level: 'Proficient' },
            { name: 'SQL & Database Design', icon: 'fas fa-database', color: '#f59e0b', level: 'Proficient' },
        ],
    },
    {
        categoryTitle: 'Design & Workflow Tools',
        icon: 'fas fa-wand-magic-sparkles',
        color: '#f093fb',
        items: [
            { name: 'Figma Prototyping', icon: 'fab fa-figma', color: '#a259ff', level: 'Advanced' },
            { name: 'Git & Version Control', icon: 'fab fa-git-alt', color: '#f05032', level: 'Advanced' },
            { name: 'GitHub Collaboration', icon: 'fab fa-github', color: '#ffffff', level: 'Advanced' },
            { name: 'VS Code Mastery', icon: 'fas fa-code-branch', color: '#007acc', level: 'Advanced' },
        ],
    },
];

function generateParticles(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        x: Math.random() * 100,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.4 + 0.1,
    }));
}

function PortfolioShowcase() {
    const [activeTab, setActiveTab] = useState('projects');
    const [selectedProject, setSelectedProject] = useState(null);
    const [sectionRef, isVisible] = useScrollReveal(0.15);
    const particles = useMemo(() => generateParticles(35), []);

    return (
        <section
            className={`portfolio-section ${isVisible ? 'in-view' : ''}`}
            id="portfolio"
            ref={sectionRef}
        >
            {/* Ambient background glow & rising bubble particles */}
            <div className="portfolio-orb portfolio-orb-left" />
            <div className="portfolio-orb portfolio-orb-right" />
            <div className="portfolio-particles" aria-hidden="true">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="portfolio-particle"
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            left: `${p.x}%`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            opacity: p.opacity,
                        }}
                    />
                ))}
            </div>

            <div className="portfolio-container">
                {/* ---- Header Section ---- */}
                <div className="showcase-top-header">
                    <span className="portfolio-badge">
                        <i className="fas fa-briefcase" /> Portfolio Showcase
                    </span>
                    <h2 className="portfolio-heading">
                        Featured <span className="highlight">Projects & Tech</span>
                    </h2>
                    <p className="portfolio-subtitle">
                        Explore my latest applications, creative UI designs, and technical
                        stack across modern web, mobile, and software engineering.
                    </p>

                    {/* ---- 2 Navigation Tabs ---- */}
                    <div className="portfolio-tabs">
                        <button
                            className={`portfolio-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <i className="fas fa-folder-open" /> Projects ({PROJECTS_DATA.length})
                        </button>
                        <button
                            className={`portfolio-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tech')}
                        >
                            <i className="fas fa-layer-group" /> Tech Stack & Skills
                        </button>
                    </div>
                </div>

                {/* ---- TAB 1: PROJECTS GRID ---- */}
                {activeTab === 'projects' && (
                    <div className="portfolio-projects-grid">
                        {PROJECTS_DATA.map((project, index) => (
                            <div
                                className="portfolio-project-card"
                                key={project.id}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                {/* Preview / Image Mockup Window */}
                                <div className="portfolio-card-preview">
                                    {/* Mock Browser Bar */}
                                    <div className="portfolio-preview-bar">
                                        <div className="preview-dots" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <span className="dot dot-r" />
                                                <span className="dot dot-y" />
                                                <span className="dot dot-g" />
                                            </div>
                                            <img src="/favicon.svg" alt="Dev Icon" style={{ width: '15px', height: '15px', objectFit: 'contain', marginLeft: '4px' }} title="Software Development Project" />
                                        </div>
                                        <span className="preview-category" style={{ '--acc': project.color }}>
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Always show icon fallback on card — images only in modal */}
                                    <div className="portfolio-preview-fallback">
                                        <div
                                            className="fallback-icon-wrap"
                                            style={{ '--fc': project.color }}
                                        >
                                            <i className={project.icon} />
                                        </div>
                                        <span className="fallback-text">{project.title} Preview</span>
                                        <div className="fallback-grid-lines" />
                                    </div>

                                    {/* Hover Overlay Buttons */}
                                    <div className="portfolio-preview-overlay">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="overlay-action-btn primary"
                                        >
                                            <i className="fas fa-eye" /> Explore Project
                                        </button>
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="overlay-action-btn secondary"
                                        >
                                            <i className="fab fa-github" /> Source
                                        </a>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="portfolio-card-body">
                                    <h3
                                        className="portfolio-card-title cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="portfolio-card-desc">{project.description}</p>

                                    {/* Tech Tags */}
                                    <div className="portfolio-card-tags">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="portfolio-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="portfolio-card-footer">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="portfolio-link-btn cursor-pointer bg-transparent border-none p-0 text-left"
                                        >
                                            Explore Project <i className="fas fa-arrow-right" />
                                        </button>
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="portfolio-git-link"
                                            title="View Source Code"
                                        >
                                            <i className="fab fa-github" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ---- TAB 2: TECH STACK CATEGORIES GRID ---- */}
                {activeTab === 'tech' && (
                    <div className="portfolio-tech-categories">
                        {TECH_CATEGORIES.map((cat, catIndex) => (
                            <div
                                className="portfolio-tech-group"
                                key={cat.categoryTitle}
                                style={{ transitionDelay: `${catIndex * 0.15}s` }}
                            >
                                <div className="tech-group-header">
                                    <div className="tech-group-icon" style={{ '--gc': cat.color }}>
                                        <i className={cat.icon} />
                                    </div>
                                    <h3 className="tech-group-title">{cat.categoryTitle}</h3>
                                </div>

                                <div className="tech-group-grid">
                                    {cat.items.map((tech) => (
                                        <div
                                            className="portfolio-tech-card"
                                            key={tech.name}
                                            style={{ '--tc': tech.color }}
                                        >
                                            <div className="tech-card-icon">
                                                <i className={tech.icon} />
                                            </div>
                                            <div className="tech-card-info">
                                                <h4 className="tech-card-name">{tech.name}</h4>
                                                <span className="tech-card-level">{tech.level}</span>
                                            </div>
                                            <div className="tech-card-indicator" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ---- Full-Screen Project Details & Live Video Modal ---- */}
            <ProjectDetailsModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}

export default PortfolioShowcase;
