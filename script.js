// ─── SMOOTH SCROLL (in-page anchors only) ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = anchor.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      var navToggle = document.querySelector('.nav-toggle');
      var navLinks  = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        enableScroll();
      }
    }
  });
});

// ─── SCROLL LOCK HELPERS ──────────────────────────────────────────────────────
function disableScroll() { document.body.style.overflow = 'hidden'; }
function enableScroll()  { document.body.style.overflow = '';       }

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks  = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navLinks.classList.contains('active') ? disableScroll() : enableScroll();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      enableScroll();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      enableScroll();
    }
  });
});

// ─── NAV SCROLL EFFECT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
});

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────
var scrollBtn = document.querySelector('.scroll-to-top');
if (scrollBtn) {
  scrollBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = 'index.html';
    }
  });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
// Alert helpers
function showAlert() {
  var alert = document.getElementById('successAlert');
  if (!alert) return;
  alert.style.display = 'flex';
  setTimeout(hideAlert, 5000);
}
function hideAlert() {
  var alert = document.getElementById('successAlert');
  if (!alert) return;
  alert.classList.add('hiding');
  setTimeout(function () {
    alert.style.display = 'none';
    alert.classList.remove('hiding');
  }, 300);
}

// reCAPTCHA callbacks (called by Google's API)
var recaptchaVerified = false;
function onRecaptchaSuccess() { recaptchaVerified = true; }
function onRecaptchaExpired()  { recaptchaVerified = false; }

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
// Event data — add new events here
var eventsData = [
  {
    title: 'Valorant Friendly Tournament',
    date: 'November 29, 2025',
    location: " | Darkness Gaming Center, A'ali",
    type: 'tournament',
    image: 'Images/covers/VALORANT_FRIENDLY.png',
    description: 'A Valorant 5v5 friendly tournament hosted in collaboration between Darkness Gaming Center and BEC, bringing together 8 teams for a day of competitive action.',
  },
  {
    title: 'PolyWonderland 2025',
    date: '27th November 2025',
    location: " | Bahrain Polytechnic Campus A – In front of Building 12",
    type: 'community',
    image: 'Images/covers/POLYWONDERLAND_2025.webp',
    description: "BEC participated in PolyWonderland 2025, Bahrain Polytechnic's flagship annual festival, bringing interactive gaming experiences, esports activities, and community engagement opportunities to students and visitors.",
  },
  {
    title: 'BPEC at Orientation Week 2025',
    date: 'September 7–9, 2025',
    location: " | Bahrain Polytechnic, Campus A – Hall 12",
    type: 'workshop',
    image: 'Images/covers/BPEC_Orientation_Week_2025.png',
    description: 'Welcoming new and returning students to explore the exciting world of gaming and esports at Bahrain Polytechnic.',
  },
  {
    title: 'BEC CS2 Friendly Online Tournament',
    date: 'September 6, 2025',
    location: " | Online (Discord)",
    type: 'tournament',
    image: 'Images/covers/BEC_CS2_FRIENDLY.png',
    description: 'A community-focused Counter-Strike 2 competition. Six teams competed in a single-elimination 5v5 bracket hosted online via Discord.',
  },
  {
    title: 'Comicon 2025',
    date: 'May 2–3, 2025',
    location: " | Bahrain International Circuit",
    type: 'community',
    image: 'Images/covers/COMICON_2025.webp',
    description: 'A celebration of gaming, anime, and pop culture! Featuring cosplay competitions, gaming zones, special guests, live performances, and more.',
  },
  {
    title: 'Fudruckers Esports Championship 2025',
    date: 'April 25–26, 2025',
    location: " | Al Liwan, Hamala",
    type: 'tournament',
    image: 'Images/covers/FUDDRUCKERS_2025.webp',
    description: 'A two-day gaming extravaganza featuring EA Sports FC 25, Tekken 8, Rocket League, and Call of Duty: Black Ops 6.',
  },
  {
    title: 'Zain E-sports Marvel Rivals Tournament',
    date: 'February 21–23, 2025',
    location: " | Zain E-sports Lab, Zain Tower",
    type: 'tournament',
    image: 'Images/covers/ZAIN_MARVELRIVALS.webp',
    description: 'A collaboration between Zain E-sports, Teal Flamingo, and BEC for a 6v6 competitive Marvel Rivals tournament.',
  },
  {
    title: 'Reboot Tekken 8 Tournament',
    date: 'January 25, 2025',
    location: " | Reboot Coding Institute",
    type: 'tournament',
    image: 'Images/covers/REBOOT_TEKKEN8.webp',
    description: 'A LAN tournament for Tekken 8 players to compete in a community-focused, hype-filled environment.',
  },
  {
    title: 'Reboot Valorant Tournament',
    date: 'October 17–19, 2024',
    location: " | Reboot Coding Institute",
    type: 'tournament',
    image: 'Images/covers/REBOOT_VALRORANT.webp',
    description: 'A 5v5 competitive Valorant tournament with 16 participating teams. Professional production setup with live streaming.',
  },
  {
    title: 'BEC Tekken 8 Friendly Online Tournament',
    date: 'September 26, 2024',
    location: " | Online via Discord",
    type: 'tournament',
    image: 'Images/covers/BEC_TEKKEN8.webp',
    description: 'A high-energy 1v1 showdown where 32 fighters clashed in this Tekken 8 friendly tournament.',
  },
  {
    title: 'BEC Online League of Legends Tournament',
    date: 'August 29, 2024',
    location: " | Online via Discord",
    type: 'tournament',
    image: 'Images/covers/BEC_LOL.webp',
    description: 'An intense battle of strategy and teamwork, bringing 8 skilled teams together in a one-day online event.',
  },
  {
    title: 'BEC Overwatch Online Friendly Tournament',
    date: 'July 26–27, 2024',
    location: " | Online via Discord",
    type: 'tournament',
    image: 'Images/covers/BEC_OW.webp',
    description: "Bahrain Esports Community's first-ever tournament! This event marked the beginning of our journey.",
  },
];

function titleToFilename(title) {
  return title.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
}

function getRelativePrefix() {
  var path = window.location.pathname.replace(/^\//, '');
  return path.split('/').length > 1 ? '../' : '';
}

function renderEvents(filter, search) {
  filter = filter || 'all';
  search = (search || '').toLowerCase();
  var grid = document.getElementById('events-grid');
  if (!grid) return;

  var filtered = eventsData.filter(function (ev) {
    var matchFilter = filter === 'all' || ev.type === filter;
    var matchSearch =
      ev.title.toLowerCase().includes(search) ||
      ev.location.toLowerCase().includes(search) ||
      ev.description.toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#888;font-size:1.2rem;">No events found.</div>';
    return;
  }

  var prefix = getRelativePrefix();
  grid.innerHTML = filtered.map(function (ev) {
    return '<article class="event-card-modern">' +
      '<div class="event-card-header">' +
        '<img class="event-cover" src="' + prefix + ev.image + '" alt="' + ev.title + ' Cover">' +
      '</div>' +
      '<div class="event-card-header-info">' +
        '<h3 class="event-title">' + ev.title + '</h3>' +
        '<div class="event-meta">' +
          '<span class="event-date">' + ev.date + '</span>' +
          '<span class="event-location">' + ev.location + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="event-card-body">' +
        '<p class="event-description">' + ev.description + '</p>' +
        '<a href="' + prefix + 'Events/' + titleToFilename(ev.title) + '" class="see-all-events-btn">View Details</a>' +
      '</div>' +
    '</article>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('events-grid')) return;

  renderEvents();

  var searchInput  = document.getElementById('event-search');
  var filterBtns   = document.querySelectorAll('.filter-btn');
  var currentFilter = 'all';
  var currentSearch = '';

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      currentSearch = e.target.value;
      renderEvents(currentFilter, currentSearch);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderEvents(currentFilter, currentSearch);
    });
  });
});

// ─── IMAGE LIGHTBOX (event detail pages) ─────────────────────────────────────
(function () {
  var images = [];
  var currentIndex = 0;

  function showLightbox(src, alt) {
    var allImgs   = Array.from(document.querySelectorAll('.expandable-img'));
    var clickedImg = allImgs.find(function (img) { return img.src === src; });
    if (!clickedImg) return;
    var eventCard = clickedImg.closest('.event-card-modern');
    images = eventCard
      ? Array.from(eventCard.querySelectorAll('.expandable-img'))
      : allImgs;
    currentIndex = images.findIndex(function (img) { return img.src === src; });

    var lightbox = document.getElementById('img-lightbox');
    var content  = document.getElementById('img-lightbox-content');
    if (!lightbox || !content) return;
    content.src = src;
    content.alt = alt || '';
    lightbox.classList.add('show');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateArrows();
  }

  function hideLightbox() {
    var lightbox = document.getElementById('img-lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function showImageAt(idx) {
    if (idx < 0 || idx >= images.length) return;
    currentIndex = idx;
    var content = document.getElementById('img-lightbox-content');
    if (!content) return;
    content.src = images[currentIndex].src;
    content.alt = images[currentIndex].alt || '';
    updateArrows();
  }

  function updateArrows() {
    var left  = document.getElementById('img-lightbox-arrow-left');
    var right = document.getElementById('img-lightbox-arrow-right');
    if (left)  left.style.display  = currentIndex > 0                   ? 'flex' : 'none';
    if (right) right.style.display = currentIndex < images.length - 1   ? 'flex' : 'none';
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.expandable-img').forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () { showLightbox(this.src, this.alt); });
    });

    var closeBtn   = document.getElementById('img-lightbox-close');
    var lightboxEl = document.getElementById('img-lightbox');
    var arrowLeft  = document.getElementById('img-lightbox-arrow-left');
    var arrowRight = document.getElementById('img-lightbox-arrow-right');

    if (closeBtn)   closeBtn.addEventListener('click', hideLightbox);
    if (lightboxEl) lightboxEl.addEventListener('click', function (e) { if (e.target === this) hideLightbox(); });
    if (arrowLeft)  arrowLeft.addEventListener('click',  function (e) { e.stopPropagation(); showImageAt(currentIndex - 1); });
    if (arrowRight) arrowRight.addEventListener('click', function (e) { e.stopPropagation(); showImageAt(currentIndex + 1); });

    document.addEventListener('keydown', function (e) {
      if (!lightboxEl || lightboxEl.style.display !== 'flex') return;
      if (e.key === 'Escape')      hideLightbox();
      if (e.key === 'ArrowLeft')   showImageAt(currentIndex - 1);
      if (e.key === 'ArrowRight')  showImageAt(currentIndex + 1);
    });
  });
})();