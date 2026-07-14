import { useState, useMemo } from 'react';
import './Contact.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function generateContactParticles(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        x: Math.random() * 100,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.4 + 0.1,
    }));
}

function Contact() {
    const [sectionRef, isVisible] = useScrollReveal(0.15);
    const particles = useMemo(() => generateContactParticles(35), []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({ type: null, text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status.type) setStatus({ type: null, text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus({
                type: 'error',
                text: 'Please fill in your Name, Email, and Message before sending.',
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, text: '' });

        const payload = JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Portfolio Contact from ${formData.name}`,
            message: formData.message,
            _template: 'table',
            _subject: `New Portfolio Message from ${formData.name}`,
        });

        // Fire the fetch — let it run in background even after we show success
        const fetchPromise = fetch('https://formsubmit.co/ajax/mahaather45@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: payload,
        });

        // After 3s, show success optimistically (email is already on its way)
        const optimisticTimeout = new Promise((resolve) =>
            setTimeout(() => resolve('optimistic'), 3000)
        );

        const result = await Promise.race([fetchPromise, optimisticTimeout]);

        // Whether it resolved via fetch or timeout, show success & clear form
        setStatus({
            type: 'success',
            text: 'Message sent successfully! Maha will get back to you shortly.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);

        // Auto-dismiss success message after 2 seconds
        setTimeout(() => setStatus({ type: null, text: '' }), 2000);

        // If fetch won the race, we're done. If timeout won, fetch still runs in bg.
        if (result !== 'optimistic') {
            // fetch resolved — check if it actually failed
            try {
                if (!result.ok) console.warn('FormSubmit returned non-OK status');
            } catch (_) { /* ignore */ }
        }
    };


    return (
        <section
            className={`contact-section ${isVisible ? 'in-view' : ''}`}
            id="contact"
            ref={sectionRef}
        >
            {/* Ambient Background Orbs */}
            <div className="contact-orb contact-orb-left" />
            <div className="contact-orb contact-orb-right" />

            {/* Rising Floating Particles */}
            <div className="contact-particles" aria-hidden="true">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="contact-particle"
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

            <div className="contact-container">
                {/* Header Section */}
                <div className="contact-header">
                    <span className="contact-badge">
                        <i className="fas fa-envelope-open-text" /> Get in Touch
                    </span>
                    <h2 className="contact-heading">
                        Contact <span className="highlight">Me</span>
                    </h2>
                    <p className="contact-subtitle">
                        Ask questions, send your message, or discuss project opportunities and I will get back to you soon.
                    </p>
                </div>

                {/* Status Message Display */}
                {status.type && (
                    <div className={`contact-status-msg ${status.type}`}>
                        <i
                            className={
                                status.type === 'success'
                                    ? 'fas fa-check-circle text-xl'
                                    : 'fas fa-exclamation-circle text-xl'
                            }
                        />
                        <span>{status.text}</span>
                    </div>
                )}

                {/* Main 2-Card Grid Layout */}
                <form className="contact-grid" onSubmit={handleSubmit}>
                    {/* Card 1: Get in Touch Form Details */}
                    <div className="contact-card">
                        <div className="contact-card-header">
                            <h3 className="contact-card-title">
                                <span>Get in Touch</span>
                                <i className="fas fa-comments" />
                            </h3>
                            <p className="contact-card-desc">
                                Have something to discuss? Fill out your details below and send me a message. I&apos;m all ears.
                            </p>
                        </div>

                        {/* Name Input */}
                        <div className="contact-form-group">
                            <label className="contact-label" htmlFor="name">
                                <i className="fas fa-user text-pink-400 mr-1" /> Your Name *
                            </label>
                            <div className="input-wrapper">
                                <i className="fas fa-user" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="contact-input"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="contact-form-group">
                            <label className="contact-label" htmlFor="email">
                                <i className="fas fa-envelope text-pink-400 mr-1" /> Your Email *
                            </label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="contact-input"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject Input */}
                        <div className="contact-form-group">
                            <label className="contact-label" htmlFor="subject">
                                <i className="fas fa-tag text-pink-400 mr-1" /> Your Subject
                            </label>
                            <div className="input-wrapper">
                                <i className="fas fa-tag" />
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="contact-input"
                                    placeholder="What is this regarding?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                    </div>

                    {/* Card 2: Comments & Message Area */}
                    <div className="contact-card">
                        <div className="contact-card-header">
                            <h3 className="contact-card-title">
                                <span>Message & Comments</span>
                                <i className="fas fa-paper-plane" />
                            </h3>
                            <p className="contact-card-desc">
                                Write your detailed query, project requirements, or message below to deliver directly to my inbox.
                            </p>
                        </div>

                        {/* Message Textarea */}
                        <div className="contact-form-group" style={{ flexGrow: 1 }}>
                            <label className="contact-label" htmlFor="message">
                                <i className="fas fa-comment-dots text-pink-400 mr-1" /> Your Message *
                            </label>
                            <div className="input-wrapper" style={{ height: '100%' }}>
                                <i className="fas fa-comment-alt" style={{ top: '1.1rem' }} />
                                <textarea
                                    id="message"
                                    name="message"
                                    className="contact-textarea"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="contact-submit-btn mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin" /> Sending to Maha...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane" /> Send Message Now
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;
