import { useState, useEffect } from 'react';
import './ProjectDetailsModal.css';
import mammoth from 'mammoth';

function DocxViewer({ docxUrl, title }) {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!docxUrl) return;
        setLoading(true);
        setError(null);
        fetch(docxUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                return res.arrayBuffer();
            })
            .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer }))
            .then(result => {
                setHtmlContent(result.value);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading DOCX:', err);
                setError('Could not load document. ' + err.message);
                setLoading(false);
            });
    }, [docxUrl]);

    if (loading) {
        return (
            <div className="docx-loading-container">
                <i className="fas fa-spinner fa-spin docx-spinner" />
                <span>Converting & Loading {title} DOCX...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="docx-loading-container">
                <i className="fas fa-exclamation-triangle text-red-500 mr-2" />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="docx-viewer-wrapper">
            <div className="docx-header-bar">
                <div className="docx-title-chip">
                    <i className="fas fa-file-word mr-2" style={{ color: '#3b82f6' }} />
                    <span>aiadoption.docx (Complete Word Document)</span>
                </div>
                <div className="docx-scroll-hint">
                    <i className="fas fa-arrows-up-down mr-1" /> Scroll to read end of docx
                </div>
            </div>
            <div
                className="docx-content-body custom-docx-scrollbar"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
}


function ModalImageSlider({ images, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images]);

    return (
        <div className="modal-slider-container">
            <img
                src={images[currentIndex]}
                alt={`${title} - Slide ${currentIndex + 1}`}
                className="modal-slider-img"
            />

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className="slider-arrow slider-arrow-left"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                        }}
                    >
                        <i className="fas fa-chevron-left" />
                    </button>
                    <button
                        type="button"
                        className="slider-arrow slider-arrow-right"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((prev) => (prev + 1) % images.length);
                        }}
                    >
                        <i className="fas fa-chevron-right" />
                    </button>
                </>
            )}

            {images.length > 1 && (
                <div className="slider-dots">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                        />
                    ))}
                </div>
            )}
            
            <div className="slider-badge">
                <i className="fas fa-images mr-1" /> Slide {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}

function ProjectDetailsModal({ project, onClose }) {
    // Close modal on Escape key press or background click
    useEffect(() => {
        if (!project) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        // Lock body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [project, onClose]);

    if (!project) return null;

    // Default bullet points if specific features array isn't provided
    const defaultFeatures = [
        'Interactive and responsive user interface built for optimal user experience.',
        'Seamless data handling with clean component architecture and modular design.',
        'Optimized performance with fast loading speeds and smooth visual transitions.',
        'Cross-platform compatibility across modern browsers and mobile devices.',
    ];

    const displayFeatures = project.features || defaultFeatures;

    return (
        <div className="project-modal-backdrop" onClick={onClose}>
            {/* Modal Content Box (Stop click propagation so clicking inside doesn't close modal) */}
            <div
                className="project-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ---- Top Bar: Back Button & Breadcrumbs ---- */}
                <div className="project-modal-topbar">
                    <button className="project-modal-back-btn" onClick={onClose}>
                        <i className="fas fa-arrow-left" /> Back to Projects
                    </button>
                    <div className="project-modal-breadcrumb">
                        <span>Projects</span>
                        <i className="fas fa-chevron-right breadcrumb-sep" />
                        <span>{project.category}</span>
                        <i className="fas fa-chevron-right breadcrumb-sep" />
                        <span className="breadcrumb-current">{project.title}</span>
                    </div>
                </div>

                {/* ---- Main 2-Column Grid ---- */}
                <div className="project-modal-grid">
                    {/* ---- Left Column: Info, Buttons, Tech Stack ---- */}
                    <div className="project-modal-left">
                        <div className="project-modal-badge" style={{ '--ac': project.color }}>
                            <i className={project.icon} /> {project.category}
                        </div>

                        <h2 className="project-modal-title">{project.title}</h2>
                        <p className="project-modal-description">{project.description}</p>

                        {/* Quick Stats Box */}
                        <div className="project-modal-stats">
                            <div className="modal-stat-card">
                                <div className="stat-icon-wrap" style={{ '--sc': project.color }}>
                                    <i className="fas fa-layer-group" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{project.tags.length}+ Tech</span>
                                    <span className="stat-label">Stack Size</span>
                                </div>
                            </div>
                            <div className="modal-stat-card">
                                <div className="stat-icon-wrap" style={{ '--sc': '#22c55e' }}>
                                    <i className="fas fa-check-circle" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">Completed</span>
                                    <span className="stat-label">Project Status</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons: Live Demo & GitHub Source */}
                        <div className="project-modal-actions">
                            {project.demoLink && project.demoLink !== '#' ? (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-btn-primary"
                                >
                                    <i className="fas fa-external-link-alt" /> Live Demo
                                </a>
                            ) : (
                                <button className="modal-btn-primary disabled" title="Demo link not set yet">
                                    <i className="fas fa-external-link-alt" /> Live Demo
                                </button>
                            )}

                            {project.codeLink && project.codeLink !== '#' ? (
                                <a
                                    href={project.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-btn-secondary"
                                >
                                    <i className="fab fa-github" /> Source Code
                                </a>
                            ) : (
                                <button className="modal-btn-secondary disabled" title="Repository not linked yet">
                                    <i className="fab fa-github" /> GitHub
                                </button>
                            )}
                        </div>

                        {/* Technologies Used Section */}
                        <div className="project-modal-tech-section">
                            <h4 className="modal-subtitle">
                                <i className="fas fa-code mr-2" style={{ color: project.color }} />
                                Technologies Used
                            </h4>
                            <div className="modal-tags-grid">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="modal-tech-pill">
                                        <i className="fas fa-hashtag text-xs opacity-60 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ---- Right Column: Video/Media Showcase & Key Features ---- */}
                    <div className="project-modal-right">
                        {/* 1. Media Box (Live Video Player or UI Mockup) */}
                        <div className="modal-media-container">
                            <div className="modal-media-header">
                                <div className="preview-dots">
                                    <span className="dot dot-r" />
                                    <span className="dot dot-y" />
                                    <span className="dot dot-g" />
                                </div>
                                <span className="modal-media-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <img src="/favicon.svg" alt="Dev Icon" className="project-browser-svg-icon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /> Live Preview & Video Showcase
                                </span>
                            </div>

                            <div className="modal-media-body">
                                {/* If docxUrl is provided, render live Word document viewer */}
                                {project.docxUrl ? (
                                    <DocxViewer docxUrl={project.docxUrl} title={project.title} />
                                ) : project.videoUrl ? (
                                    project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                                        <iframe
                                            src={project.videoUrl.replace('watch?v=', 'embed/')}
                                            title={project.title}
                                            className="modal-video-element"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={project.videoUrl}
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                            className="modal-video-element"
                                        />
                                    )
                                ) : project.images && project.images.length > 0 ? (
                                    <ModalImageSlider images={project.images} title={project.title} />
                                ) : (
                                    /* If videoUrl is empty, render exact UI Mockup / Image with video note */
                                    <div className="modal-video-fallback">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="modal-fallback-img"
                                            />
                                        ) : (
                                            <div className="modal-fallback-vector" style={{ '--fc': project.color }}>
                                                <i className={project.icon} />
                                                <span>{project.title} UI Preview</span>
                                            </div>
                                        )}

                                        {/* Video Upload Note Overlay */}
                                        <div className="video-placeholder-banner">
                                            <div className="video-play-icon" style={{ '--pc': project.color }}>
                                                <i className="fas fa-play" />
                                            </div>
                                            <div className="video-note-text">
                                                <h5>Add Live Video (`videoUrl`)</h5>
                                                <p>
                                                    Paste any MP4 video URL inside <code>videoUrl: "..."</code> in `PROJECTS_DATA` to display live project video!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Key Features Box */}
                        <div className="modal-features-card">
                            <h4 className="modal-features-title">
                                <i className="fas fa-bolt text-yellow-400 mr-2" /> Key Features & Highlights
                            </h4>
                            <ul className="modal-features-list">
                                {displayFeatures.map((feature, i) => (
                                    <li key={i} className="modal-feature-item">
                                        <span className="feature-bullet" style={{ '--bc': project.color }}>
                                            ✓
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailsModal;
