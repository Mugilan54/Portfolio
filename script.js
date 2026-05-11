/* =====================================================
   1. CUSTOM CURSOR
===================================================== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = (mx - 6) + 'px';
  cursor.style.top  = (my - 6) + 'px';
});

function animateRing() {
  rx += (mx - rx - 15) * 0.12;
  ry += (my - ry - 15) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Cursor scale on interactive elements */
document.querySelectorAll('a, button, .cert-dot, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform   = 'scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
  });
});

/* =====================================================
   2. HAMBURGER MENU TOGGLE
===================================================== */
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

/* Close menu when a nav link is clicked */
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
});

/* =====================================================
   3. CERTIFICATE DATA
   ✏️ To add more certificates: copy one object { }
      and paste it inside the array with a comma.
      Replace image paths with your actual filenames.
===================================================== */
const certificates = [
  {
    image:    "images/GfG.png",
    badge:    "Python",
    title:    "Python Programming",
    issuer:   "GeeksforGeeks",
    desc:     "Covers Python fundamentals, data structures, functions, OOP, and file handling. A solid foundation for data science and software development.",
    year:     "2025",
    link:     "https://media.geeksforgeeks.org/courses/certificates/9dd60895509ae9a98169929ca6831818.pdf",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/Sawit-AI(HCL Guvi).png",
    badge:    "Gen AI",
    title:    "Fundamentals of Generative AI",
    issuer:   "HCL Guvi",
    desc:     "Core concepts of Generative AI including LLMs, prompt engineering, and practical applications of modern AI tools.",
    year:     "2025",
    link:     "https://www.guvi.in/share-certificate/iO7I1V25164MaA4T54",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/IBM-Badge.png",
    badge:    "IBM Badge",
    title:    "Artificial Intelligence Fundamentals",
    issuer:   "IBM SkillsBuild",
    desc:     "Foundational AI: machine learning, neural networks, NLP, and ethical AI — verified by IBM.",
    year:     "2025",
    link:     "https://www.credly.com/badges/b7e552dd-1f2a-4a54-8c34-0e85b2fe69f3/linked_in_profile",
    linkText: "VIEW_BADGE"
  },
  {
    image:    "images/Gold-Coin.jpg",
    badge:    "🥇 Gold Coin",
    title:    "Gold Coin Award – 1st Year Excellence",
    issuer:   "AAMC Engineering College",
    desc:     "CGPA 9.32 — exceeding the college criteria of 8.75 CGPA and 90% attendance in both Semester 1 & 2.",
    year:     "2023–24",
    link:     "images/Gold-Coin.jpg",
    linkText: "VIEW_PROOF"
  },
  {
    image:    "images/Frontend-Training.png",
    badge:    "Frontend",
    title:    "Frontend Development Certificate",
    issuer:   "Logritha Technologies",
    desc:     "3-month comprehensive training in HTML, CSS, JavaScript, and modern frameworks to build responsive web applications.",
    year:     "2025",
    link:     "#",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/IBM-Backend (1).png",
    badge:    "Backend",
    title:    "Backend Development Certificate",
    issuer:   "IBM SkillsBuild",
    desc:     "Node.js, Express, databases, and RESTful APIs — comprehensive backend training programme.",
    year:     "2025",
    link:     "images/IBM-Backend (1).png",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/SQL-Basic.png",
    badge:    "SQL",
    title:    "SQL Fundamentals",
    issuer:   "HackerRank",
    desc:     "Proficiency in SQL syntax, queries, and database management — verified by HackerRank.",
    year:     "2025",
    link:     "https://www.hackerrank.com/certificates/c7ead7d29abb",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/IBM-ML.png",
    badge:    "ML",
    title:    "Machine Learning with Python",
    issuer:   "IBM SkillsBuild",
    desc:     "ML algorithms, model evaluation, and practical implementation using Python libraries.",
    year:     "2025",
    link:     "images/IBM-ML.png",
    linkText: "VIEW_CERT"
  },
  {
    image:    "images/Python-basic.png",
    badge:    "Python",
    title:    "Python Programming Fundamentals",
    issuer:   "HackerRank",
    desc:     "Python syntax, data types, control structures, and basic problem-solving skills — verified by HackerRank.",
    year:     "2025",
    link:     "https://www.hackerrank.com/certificates/iframe/b0fe336145b6",
    linkText: "VIEW_CERT"
  }
  /* ✏️ Add more certificate objects here */
];

/* =====================================================
   4. CERTIFICATE BOOKLET RENDERING
===================================================== */
let currentCert = 0;

const certImage  = document.getElementById('certImage');
const certBadge  = document.getElementById('certBadge');
const certNumber = document.getElementById('certNumber');
const certTitle  = document.getElementById('certTitle');
const certIssuer = document.getElementById('certIssuer');
const certDesc   = document.getElementById('certDesc');
const certYear   = document.getElementById('certYear');
const certLink   = document.getElementById('certLink');
const certPrev   = document.getElementById('certPrev');
const certNext   = document.getElementById('certNext');
const certDots   = document.getElementById('certDots');

/* Build dot indicators */
certificates.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => showCert(i));
  certDots.appendChild(dot);
});

/* Display a certificate by index */
function showCert(index) {
  const c = certificates[index];

  certImage.style.opacity = '0';
  setTimeout(() => {
    certImage.src           = c.image;
    certImage.alt           = c.title;
    certBadge.textContent   = c.badge;
    certNumber.textContent  = `${String(index + 1).padStart(2, '0')} / ${String(certificates.length).padStart(2, '0')}`;
    certTitle.textContent   = c.title;
    certIssuer.textContent  = c.issuer;
    certDesc.textContent    = c.desc;
    certYear.textContent    = c.year;
    certLink.href           = c.link;
    certLink.innerHTML      = `<i class="fas fa-arrow-up-right-from-square"></i> ${c.linkText || 'VIEW_CERT'}`;
    certImage.style.opacity = '1';
  }, 200);

  /* Update dots */
  document.querySelectorAll('.cert-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  /* Disable buttons at ends */
  certPrev.disabled = index === 0;
  certNext.disabled = index === certificates.length - 1;

  currentCert = index;
}

/* Smooth image fade */
certImage.style.transition = 'opacity 0.2s ease';

/* Button navigation */
certPrev.addEventListener('click', () => {
  if (currentCert > 0) showCert(currentCert - 1);
});
certNext.addEventListener('click', () => {
  if (currentCert < certificates.length - 1) showCert(currentCert + 1);
});

/* Keyboard arrow support */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft'  && currentCert > 0)                       showCert(currentCert - 1);
  if (e.key === 'ArrowRight' && currentCert < certificates.length - 1) showCert(currentCert + 1);
});

/* Load first certificate */
showCert(0);

/* =====================================================
   5. SCROLL REVEAL
===================================================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================================================
   6. CONTACT FORM VALIDATION
===================================================== */
document.getElementById('submitBtn').addEventListener('click', handleSubmit);

function handleSubmit() {
  const name  = document.getElementById('name');
  const email = document.getElementById('email');
  const msg   = document.getElementById('msg');
  let valid   = true;

  /* Clear previous errors */
  document.getElementById('name_err').textContent = '';
  document.getElementById('mail_err').textContent = '';

  /* Validate name */
  if (!name.value.trim()) {
    document.getElementById('name_err').textContent = '// name is required';
    valid = false;
  }

  /* Validate email format */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    document.getElementById('mail_err').textContent = '// invalid email address';
    valid = false;
  }

  /* Submit if valid */
  if (valid) {
    /*
     * ✏️ Replace this alert with EmailJS or a backend API
     *    to actually send the message to your email inbox.
     */
    alert('>> MESSAGE TRANSMITTED. Will respond soon.');
    name.value  = '';
    email.value = '';
    msg.value   = '';
  }
}