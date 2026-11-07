import { useState, useEffect, useRef } from 'react';
import './ProjectDetailsModal.css';
import { AnimatePresence, motion } from 'framer-motion';

function DocxViewer({ docxUrl, title }) {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!docxUrl) return;
        setLoading(true);
        setError(null);
        let cancelled = false;

        Promise.all([import('mammoth'), fetch(docxUrl)])
            .then(async ([mammothModule, response]) => {
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const arrayBuffer = await response.arrayBuffer();
                return mammothModule.default.convertToHtml({ arrayBuffer });
            })
            .then((result) => {
                if (cancelled) return;
                setHtmlContent(result.value);
                setLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                console.error('Error loading DOCX:', err);
                setError('Could not load document. ' + err.message);
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
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
                <i className="fas fa-exclamation-triangle mr-2" />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="docx-viewer-wrapper">
            <div className="docx-header-bar">
                <div className="docx-title-chip">
                    <i className="fas fa-file-word mr-2" style={{ color: "var(--maroon)" }} />
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
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
                        aria-label={`Previous ${title} image`}
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
                        aria-label={`Next ${title} image`}
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
                            aria-label={`Show ${title} image ${idx + 1}`}
                            aria-pressed={idx === currentIndex}
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

function ProjectDialog({ project, onClose }) {
    const modalRef = useRef(null);

    // Close modal on Escape key press or background click
    useEffect(() => {
        if (!project) return;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = modalRef.current?.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])');
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || document.activeElement === modalRef.current)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus?.();
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
        <motion.div
            className="project-modal-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
        >
            {/* Modal Content Box (Stop click propagation so clicking inside doesn't close modal) */}
            <motion.div
                className="project-modal-container"
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                {/* ---- Top Bar: Back Button & Breadcrumbs ---- */}
                <div className="project-modal-topbar">
                    <button type="button" className="project-modal-back-btn" onClick={onClose} aria-label="Close project details">
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

                        <h2 className="project-modal-title" id="project-modal-title">{project.title}</h2>
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
                                    <i className="fas fa-external-link-alt" /> Project link
                                </a>
                            ) : (
                                <button className="modal-btn-primary disabled" title="Demo link not set yet">
                                    <i className="fas fa-external-link-alt" /> Project link unavailable
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
                                <span className="modal-media-title">
                                    Project media
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
                                            poster={project.poster}
                                            controls
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            className="modal-video-element"
                                            aria-label={`${project.title} project video`}
                                        />
                                    )
                                ) : project.images && project.images.length > 0 ? (
                                    <ModalImageSlider images={project.images} title={project.title} />
                                ) : (
                                    <div className="modal-video-fallback">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="modal-fallback-img"
                                            />
                                        ) : (
                                            <div className="modal-fallback-vector" style={{ '--fc': project.color }}>
                                                <i className={project.icon} aria-hidden="true" />
                                                <span>No local preview available</span>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Key Features Box */}
                        <div className="modal-features-card">
                            <h4 className="modal-features-title">
                                <i className="fas fa-bolt mr-2" /> Key Features & Highlights
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
            </motion.div>
        </motion.div>
    );
}

function ProjectDetailsModal({ project, onClose }) {
    return (
        <AnimatePresence>
            {project && <ProjectDialog key={project.id} project={project} onClose={onClose} />}
        </AnimatePresence>
    );
}

export default ProjectDetailsModal;
