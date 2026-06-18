/* =============================================
   CONTACT.JS — Brew Haven Contact Page
   Handles: form validation, UI interactions
   ============================================= */

/* ── HELPERS ── */
function showError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('invalid');
  input.classList.remove('valid');
  error.classList.add('show');
}

function showValid(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('invalid');
  input.classList.add('valid');
  error.classList.remove('show');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── LIVE VALIDATION (on blur) ── */
document.getElementById('name').addEventListener('blur', function () {
  this.value.trim().length >= 2
    ? showValid('name', 'nameError')
    : showError('name', 'nameError');
});

document.getElementById('email').addEventListener('blur', function () {
  isValidEmail(this.value.trim())
    ? showValid('email', 'emailError')
    : showError('email', 'emailError');
});

document.getElementById('subject').addEventListener('change', function () {
  this.value
    ? showValid('subject', 'subjectError')
    : showError('subject', 'subjectError');
});

document.getElementById('message').addEventListener('blur', function () {
  this.value.trim().length >= 10
    ? showValid('message', 'messageError')
    : showError('message', 'messageError');
});

/* ── CLEAR INVALID ON INPUT ── */
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', function () {
    if (this.classList.contains('invalid')) {
      this.classList.remove('invalid');
      document.getElementById(id + 'Error').classList.remove('show');
    }
  });
});

/* ── FORM SUBMISSION ── */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  let isValid = true;

  // Validate name
  if (name.length < 2) {
    showError('name', 'nameError');
    isValid = false;
  } else {
    showValid('name', 'nameError');
  }

  // Validate email
  if (!isValidEmail(email)) {
    showError('email', 'emailError');
    isValid = false;
  } else {
    showValid('email', 'emailError');
  }

  // Validate subject
  if (!subject) {
    showError('subject', 'subjectError');
    isValid = false;
  } else {
    showValid('subject', 'subjectError');
  }

  // Validate message
  if (message.length < 10) {
    showError('message', 'messageError');
    isValid = false;
  } else {
    showValid('message', 'messageError');
  }

  if (!isValid) return;

  // ── SIMULATE SEND ──
  const btn      = document.getElementById('submitBtn');
  const btnText  = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');

  btn.disabled    = true;
  btnText.style.display  = 'none';
  btnLoader.style.display = 'inline';

  setTimeout(() => {
    btn.disabled           = false;
    btnText.style.display  = 'inline';
    btnLoader.style.display = 'none';

    // Show success
    document.getElementById('formSuccess').classList.add('show');

    // Reset form
    document.getElementById('contactForm').reset();
    ['name', 'email', 'subject', 'message'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('valid', 'invalid');
    });

    // Hide success after 6 seconds
    setTimeout(() => {
      document.getElementById('formSuccess').classList.remove('show');
    }, 6000);

  }, 1600);
});

/* ── NAVBAR SHADOW ON SCROLL ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40
    ? '0 4px 20px rgba(43,24,10,0.12)'
    : 'none';
});

/* ── BACK TO TOP ── */
const topBtn = document.getElementById('topBtn');
if (topBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.style.display = 'flex';
    } else {
      topBtn.style.display = 'none';
    }
  });
}