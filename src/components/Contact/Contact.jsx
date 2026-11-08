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

  const [status, setStatus] = useState({ type: null, text: '', mailtoUrl: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: null, text: '', mailtoUrl: null });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('mahaather45@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus({
        type: 'error',
        text: 'Please fill in your name, email and message, then try again.',
        mailtoUrl: null,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, text: '', mailtoUrl: null });

    const subjectText = subject || `Portfolio Inquiry from ${name}`;
    const fullSubject = `New Portfolio Message from ${name} (${email})`;

    const mailtoFallback = `mailto:mahaather45@gmail.com?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}`
    )}`;

    let sent = false;

    // 1. First attempt: Dedicated Vercel serverless function /api/contact
    try {
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subjectText,
          message,
        }),
      });

      if (apiResponse.ok) {
        const result = await apiResponse.json();
        if (result.success) {
          sent = true;
        }
      }
    } catch (err) {
      console.warn('/api/contact unavailable, trying direct client-side delivery:', err);
    }

    // 2. Second attempt: Check if Web3Forms key is configured
    if (!sent && import.meta.env.VITE_WEB3FORMS_KEY) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_KEY,
            name,
            email,
            from_name: name,
            reply_to: email,
            subject: fullSubject,
            message: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subjectText}\n\nMessage:\n${message}`,
          }),
        });

        const web3Data = await web3Res.json();
        if (web3Data.success) {
          sent = true;
        }
      } catch (err) {
        console.warn('Web3Forms attempt error:', err);
      }
    }

    // 3. Third attempt: FormSubmit with _captcha=false and _replyto
    if (!sent) {
      try {
        const fsPayload = JSON.stringify({
          name,
          email,
          _replyto: email,
          message: `Sender: ${name} (${email})\n\nMessage:\n${message}`,
          subject: subjectText,
          _subject: fullSubject,
          _captcha: 'false',
          _template: 'table',
        });

        const fsRes = await fetch('https://formsubmit.co/ajax/mahaather45@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: fsPayload,
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json();
          if (fsData.success === 'true' || fsData.success === true) {
            sent = true;
          }
        }
      } catch (err) {
        console.warn('FormSubmit direct attempt error:', err);
      }
    }

    // Status display
    if (sent) {
      setStatus({
        type: 'success',
        text: 'Message delivered! Thanks for reaching out, I will reply to your email soon.',
        mailtoUrl: null,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({
        type: 'fallback',
        text: 'Automated delivery was blocked by your browser network. You can send this message directly in 1 click:',
        mailtoUrl: mailtoFallback,
      });
    }

    setIsSubmitting(false);
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
            <div className="status-banner-content">
              <div className="status-banner-main">
                <i
                  className={
                    status.type === 'success'
                      ? 'fas fa-check-circle'
                      : status.type === 'fallback'
                      ? 'fas fa-envelope-circle-check'
                      : 'fas fa-exclamation-circle'
                  }
                  aria-hidden="true"
                />
                <span>{status.text}</span>
              </div>
              {status.mailtoUrl && (
                <div className="status-banner-actions">
                  <a
                    href={status.mailtoUrl}
                    className="status-mailto-btn"
                  >
                    <i className="fas fa-paper-plane mr-1" />
                    Open in Email App
                  </a>
                </div>
              )}
            </div>
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
              <a
                href="mailto:mahaather45@gmail.com"
                className="direct-mail-button"
                title="Send email directly via your mail app"
              >
                <i className="fas fa-envelope mr-2" />
                Open Email App
              </a>
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
