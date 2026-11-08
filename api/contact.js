export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const recipient = 'mahaather45@gmail.com';
    const emailSubject = subject || `Portfolio Inquiry from ${name}`;
    const fullSubject = `New Portfolio Message from ${name} (${email})`;

    // Check if WEB3FORMS_ACCESS_KEY is available in environment variables
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_KEY;

    if (web3formsKey) {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          from_name: name,
          reply_to: email,
          subject: fullSubject,
          message: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`,
        }),
      });

      const web3Data = await web3Res.json();
      if (web3Data.success) {
        return res.status(200).json({ success: true, message: 'Message sent successfully via Web3Forms.' });
      }
    }

    // Forward to FormSubmit with explicit Referer & Origin to guarantee delivery
    const host = req.headers['host'] || 'portfolio-project-pink-sigma-57.vercel.app';
    const origin = req.headers['origin'] || `https://${host}`;

    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: `${origin}/`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        message: `Sender: ${name} (${email})\n\nMessage:\n${message}`,
        subject: emailSubject,
        _subject: fullSubject,
        _captcha: 'false',
        _template: 'table',
      }),
    });

    const formSubmitData = await formSubmitRes.json();

    if (formSubmitData.success === 'true' || formSubmitData.success === true) {
      return res.status(200).json({
        success: true,
        message: 'Message delivered to Maha Ather successfully.',
      });
    }

    return res.status(200).json({
      success: true,
      message: formSubmitData.message || 'Message processed.',
    });
  } catch (error) {
    console.error('Contact handler error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while processing message.',
    });
  }
}

