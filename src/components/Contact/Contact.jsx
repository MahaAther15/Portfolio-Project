import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: null, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: null, text: '' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('mahaather45@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        text: 'Please fill in your name, email and message, then try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, text: '' });

    const payload = JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
      message: formData.message,
      _template: 'table',
      _subject: `New Portfolio Message from ${formData.name}`,
    });

    try {
      const response = await fetch('https://formsubmit.co/ajax/mahaather45@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: payload,
      });

      if (!response.ok) throw new Error('FormSubmit rejected the request.');
      const result = await response.json();
      if (result.success === 'false' || result.success === false) {
        throw new Error('FormSubmit could not send the message.');
      }

      setStatus({
        type: 'success',
        text: 'Message sent. Thanks for reaching out, I will reply soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        text: 'The message could not be sent. Please email mahaather45@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="contact-header-area">
          <h2 className="section-title" id="contact-title">Let&apos;s work together</h2>
          <p className="contact-lead">
            Hiring for a full-time role, planning a contract project, or want to add AI to something
            you&apos;re building? Send me a note and I&apos;ll get back to you.
          </p>
        </div>

        {status.type && (
          <motion.div
            className={`contact-status-banner ${status.type}`}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i
              className={status.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}
              aria-hidden="true"
            />
            <span>{status.text}</span>
          </motion.div>
        )}

        <div className="contact-split-grid">
          <div className="contact-channels-card">
            <div className="direct-email-block">
              <span className="block-label">Email</span>
              <div className="email-display-row">
                <span className="email-text">mahaather45@gmail.com</span>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <i className={copiedEmail ? 'fas fa-check' : 'fas fa-copy'} aria-hidden="true" />
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="channels-social-row">
              <a
                href="https://github.com/MahaAther15/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link"
              >
                <span><i className="fab fa-github" aria-hidden="true" />GitHub</span>
                <span className="channel-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/maha-ather22"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link"
              >
                <span><i className="fab fa-linkedin-in" aria-hidden="true" />LinkedIn</span>
                <span className="channel-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h3 className="form-card-title">Send a message</h3>

            <div className="form-field-group">
              <label htmlFor="contact-name" className="field-label">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                className="field-input"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field-group">
              <label htmlFor="contact-email" className="field-label">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className="field-input"
                placeholder="you@company.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field-group">
              <label htmlFor="contact-subject" className="field-label">Subject (optional)</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                className="field-input"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-field-group">
              <label htmlFor="contact-message" className="field-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="field-textarea"
                rows="5"
                placeholder="Tell me about the role or project"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                  <span>Sending</span>
                </>
              ) : (
                <span>Send message</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
