// ─── Replace these three values with your EmailJS credentials ───
const EMAILJS_SERVICE_ID  = 'EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'EMAILJS_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'EMAILJS_PUBLIC_KEY';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Override the handleSubmit function defined in script.js
function handleSubmit(e) {
  e.preventDefault();

  const form    = e.target;
  const btn     = form.querySelector('.submit-btn');
  const success = document.getElementById('form-success');

  const name    = form.querySelector('input[type="text"]').value.trim();
  const email   = form.querySelector('input[type="email"]').value.trim();
  const subject = form.querySelectorAll('input[type="text"]')[1].value.trim();
  const message = form.querySelector('textarea').value.trim();

  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…';

  const templateParams = {
    from_name:  name,
    from_email: email,
    subject:    subject || '(No subject)',
    message:    message,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      btn.innerHTML = '<i class="fa fa-circle-exclamation"></i> Failed — Try Again';
      btn.disabled  = false;
    });
}