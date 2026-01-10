// Smooth scroll (only for in-page anchors, skip if href is not a hash)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior: 'smooth'});
      // Close mobile menu if open
      const navToggle = document.querySelector('.nav-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        enableScroll();
      }
    }
  });
});

// Scroll to top
const scrollBtn = document.querySelector('.scroll-to-top');
if (scrollBtn) {
  scrollBtn.addEventListener('click', e => {
    e.preventDefault();
    if (window.location.pathname.endsWith('home.html')) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      window.location.href = 'home.html';
    }
  });
}

// Disable scroll
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// Enable scroll
function enableScroll() {
  document.body.style.overflow = '';
}

// Hamburger menu functionality
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Toggle scroll based on menu state
  if (navLinks.classList.contains('active')) {
    disableScroll();
  } else {
    enableScroll();
  }
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navToggle.contains(e.target) && 
      !navLinks.contains(e.target) && 
      navLinks.classList.contains('active')) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    enableScroll();
  }
});

// Close on escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    enableScroll();
  }
});

// Handle Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});

// Show success alert
function showAlert() {
    const alert = document.getElementById('successAlert');
    alert.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

// Hide success alert
function hideAlert() {
    const alert = document.getElementById('successAlert');
    alert.classList.add('hiding');
    
    // Remove the alert after animation completes
    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove('hiding');
    }, 300);
}

let recaptchaVerified = false;

// reCAPTCHA success callback
function onRecaptchaSuccess() {
    recaptchaVerified = true;
    hideRecaptchaAlert();
}

// reCAPTCHA expired callback
function onRecaptchaExpired() {
    recaptchaVerified = false;
    showRecaptchaAlert();
}

// Show reCAPTCHA alert
function showRecaptchaAlert() {
    const alert = document.getElementById('recaptchaAlert');
    if (alert) {
        alert.style.display = 'block';
        alert.classList.remove('hiding');
        alert.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideRecaptchaAlert();
        }, 5000);
    }
}

// Hide reCAPTCHA alert
function hideRecaptchaAlert() {
    const alert = document.getElementById('recaptchaAlert');
    if (alert) {
        alert.classList.add('hiding');
        
        // Remove the alert after animation completes
        setTimeout(() => {
            alert.style.display = 'none';
            alert.classList.remove('hiding');
            alert.classList.remove('show');
        }, 300);
    }
}

// Handle Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Verify reCAPTCHA
            try {
                const recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse || recaptchaResponse.length === 0) {
                    showRecaptchaAlert();
                    return;
                }
            } catch (error) {
                console.error('reCAPTCHA error:', error);
                showRecaptchaAlert();
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                to_name: 'BEC Support',
                message: message,
                year: new Date().getFullYear()
            };

            // Send email using EmailJS
            emailjs.send('BEC_Web_support', 'template_o1uw69m', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Show success alert
                    document.getElementById('successAlert').style.display = 'flex';
                    // Reset form
                    document.getElementById('contactForm').reset();
                    // Reset reCAPTCHA
                    grecaptcha.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS error:', error);
                    if (error && error.status === 200) {
                        // If the error status indicates success, show success alert
                        document.getElementById('successAlert').style.display = 'flex';
                    } else {
                        // Otherwise, show failure alert
                        alert('Failed to send message. Please try again later.');
                    }
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
});

// Events Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const showMoreBtn = document.querySelector('.show-more-btn');
  const eventsGrid = document.querySelector('.events-grid');
  const showMoreContainer = document.querySelector('.show-more-container');
  let lastScrollPosition = 0;

  function updateCardVisibility() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const visibleCards = Array.from(eventCards).filter(card => {
      const category = card.getAttribute('data-category');
      // Show all cards when "all" is selected, otherwise show only matching category
      return activeFilter === 'all' || activeFilter === category;
    });

    // Hide all cards first
    eventCards.forEach(card => {
      card.style.display = 'none';
    });

    // Show appropriate cards based on filter and expansion state
    visibleCards.forEach((card, index) => {
      if (eventsGrid.classList.contains('expanded') || index < 6) {
        card.style.display = 'block';
      }
    });

    // Update show more button visibility
    showMoreContainer.style.display = visibleCards.length > 6 ? 'block' : 'none';
  }

  // Filter button click handler
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      eventsGrid.classList.remove('expanded');
      if (showMoreBtn) {
        showMoreBtn.textContent = 'Show More Events';
      }
      updateCardVisibility();
    });
  });

  // Show more button click handler
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      eventsGrid.classList.toggle('expanded');
      showMoreBtn.textContent = eventsGrid.classList.contains('expanded') ? 'Show Less' : 'Show More Events';
      updateCardVisibility();
      
      if (eventsGrid.classList.contains('expanded')) {
        // When showing more, scroll to the bottom of the events section
        const eventsSection = document.querySelector('.events-section');
        const eventsContainer = document.querySelector('.events-container');
        const scrollToPosition = eventsSection.offsetTop + eventsContainer.offsetHeight;
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
      } else {
        // When showing less, scroll to the top of the events section
        const eventsSection = document.querySelector('.events-section');
        window.scrollTo({ top: eventsSection.offsetTop, behavior: 'smooth' });
      }
    });
  }

  // Initial setup
  updateCardVisibility();
});

// View Details Button Functionality
document.addEventListener('DOMContentLoaded', () => {
  const viewDetailsButtons = document.querySelectorAll('.see-all-events-btn');
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxDescription = document.querySelector('.lightbox-description');
  const lightboxDate = document.querySelector('.lightbox-date');
  const lightboxLocation = document.querySelector('.lightbox-location');
  const highlightsList = document.querySelector('.highlights-list');
  const responsibilitiesList = document.querySelector('.responsibilities-list');
  const closeLightbox = document.querySelector('.close-lightbox');
  let lastScrollPosition = 0;

  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Store current scroll position
      lastScrollPosition = window.scrollY;

      const eventCard = button.closest('.event-card');
      const eventImage = eventCard.querySelector('.event-img');
      const eventTitle = eventCard.querySelector('.event-title').textContent;
      const eventDescription = eventCard.querySelector('.event-description').textContent;
      const eventDate = eventCard.querySelector('.event-date').textContent;
      const eventLocation = eventCard.querySelector('.event-location').textContent;

      // Update lightbox content
      if (eventImage) {
        lightboxImg.src = eventImage.src;
        lightboxImg.alt = eventImage.alt;
        lightboxImg.style.display = 'block';
      } else {
        lightboxImg.style.display = 'none';
      }

      lightboxTitle.textContent = eventTitle;
      lightboxDescription.textContent = eventDescription;
      lightboxDate.textContent = eventDate;
      lightboxLocation.textContent = eventLocation;

      // Update highlights and responsibilities
      const data = tournamentData[eventTitle];
      if (data) {
        highlightsList.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join('');
        responsibilitiesList.innerHTML = data.responsibilities.map(item => `<li>${item}</li>`).join('');
        
        // Update photos
        const photoGrid = document.querySelector('.photo-grid');
        if (data.photos && data.photos.length > 0) {
          photoGrid.innerHTML = data.photos.map(photoSrc => `
            <div class="photo-item">
              <img src="${photoSrc}" alt="Event photo">
            </div>
          `).join('');
          document.querySelector('.lightbox-photos').style.display = 'block';
        } else {
          document.querySelector('.lightbox-photos').style.display = 'none';
        }
      } else {
        highlightsList.innerHTML = '';
        responsibilitiesList.innerHTML = '';
        document.querySelector('.lightbox-photos').style.display = 'none';
      }

      // Show lightbox
      lightboxModal.style.display = 'block';
      document.body.classList.add('modal-open');
      
      // Scroll to top of lightbox
      lightboxModal.scrollTop = 0;
    });
  });

  // Close lightbox
  function closeLightboxModal() {
    lightboxModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Restore scroll position
    window.scrollTo(0, lastScrollPosition);
  }

  // Close button click handler
  closeLightbox.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeLightboxModal();
    return false;
  });

  // Close lightbox when clicking outside
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightboxModal();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
      closeLightboxModal();
    }
  });
});

// Image Lightbox for Event Images with Arrow Navigation
(function() {
  var images = [];
  var currentIndex = 0;
  function showLightbox(src, alt) {
    // Find the parent event card of the clicked image
    var allImgs = Array.from(document.querySelectorAll('.expandable-img'));
    var clickedImg = allImgs.find(img => img.src === src);
    var eventCard = clickedImg.closest('.event-card-modern');
    // Only select images within this event card's gallery
    images = Array.from(eventCard.querySelectorAll('.expandable-img'));
    currentIndex = images.findIndex(img => img.src === src);
    var lightbox = document.getElementById('img-lightbox');
    var content = document.getElementById('img-lightbox-content');
    content.src = src;
    content.alt = alt || '';
    lightbox.classList.add('show');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateArrows();
  }
  function hideLightbox() {
    var lightbox = document.getElementById('img-lightbox');
    lightbox.classList.remove('show');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  function showImageAt(idx) {
    if (idx < 0 || idx >= images.length) return;
    currentIndex = idx;
    var img = images[currentIndex];
    var content = document.getElementById('img-lightbox-content');
    content.src = img.src;
    content.alt = img.alt || '';
    updateArrows();
  }
  function updateArrows() {
    document.getElementById('img-lightbox-arrow-left').style.display = (currentIndex > 0) ? 'flex' : 'none';
    document.getElementById('img-lightbox-arrow-right').style.display = (currentIndex < images.length - 1) ? 'flex' : 'none';
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.expandable-img').forEach(function(img) {
      img.addEventListener('click', function() {
        showLightbox(this.src, this.alt);
      });
    });
    document.getElementById('img-lightbox-close').addEventListener('click', hideLightbox);
    document.getElementById('img-lightbox').addEventListener('click', function(e) {
      if (e.target === this) hideLightbox();
    });
    document.getElementById('img-lightbox-arrow-left').addEventListener('click', function(e) {
      e.stopPropagation();
      showImageAt(currentIndex - 1);
    });
    document.getElementById('img-lightbox-arrow-right').addEventListener('click', function(e) {
      e.stopPropagation();
      showImageAt(currentIndex + 1);
    });
    document.addEventListener('keydown', function(e) {
      if (document.getElementById('img-lightbox').classList.contains('show')) {
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowLeft') showImageAt(currentIndex - 1);
        if (e.key === 'ArrowRight') showImageAt(currentIndex + 1);
      }
    });
  });
})();

// Event data for dynamic rendering
const eventsData = [
   {
  title: "BPEC at Orientation Week 2025",
  date: "September 7-9, 2025",
  location: " Bahrain Polytechnic, Campus A – Hall 12",
  type: "workshop",
    image: "Images/covers/BPEC_Orientation_Week_2025.png",
    description: "Welcoming new and returning students to explore the exciting world of gaming and esports at Bahrain Polytechnic.",
  },
  {
    title: "Comicon 2025",
    date: "May 2-3, 2025",
    location: "Bahrain International Circuit",
    type: "community",
    image: "Images/covers/COMICON_2025.webp",
    description: "A celebration of gaming, anime, and pop culture! Featuring cosplay competitions, gaming zones, special guests, live performances, and more.",
  },
  {
    title: "Fudruckers Esports Championship 2025",
    date: "April 25-26, 2025",
    location: "Al Liwan, Hamala",
    type: "tournament",
    image: "Images/covers/FUDDRUCKERS_2025.webp",
    description: "A two-day gaming extravaganza featuring EA Sports FC 25, Tekken 8, Rocket League, and Call of Duty: Black Ops 6.",
  },
  {
    title: "Zain E-sports Marvel Rivals Tournament",
    date: "February 21-23, 2025",
    location: "Zain E-sports Lab, Zain Tower",
    type: "tournament",
    image: "Images/covers/ZAIN_MARVELRIVALS.webp",
    description: "A collaboration between Zain E-sports, Teal Flamingo, and BEC for a 6v6 competitive Marvel Rivals tournament.",
  },
  {
    title: "Reboot Tekken 8 Tournament",
    date: "January 25, 2025",
    location: "Reboot Coding Institute",
    type: "tournament",
    image: "Images/covers/REBOOT_TEKKEN8.webp",
    description: "A LAN tournament for Tekken 8 players to compete in a community-focused, hype-filled environment.",
  },
  {
    title: "Reboot Valorant Tournament",
    date: "October 17-19, 2024",
    location: "Reboot Coding Institute",
    type: "tournament",
    image: "Images/covers/REBOOT_VALRORANT.webp",
    description: "A 5v5 competitive Valorant tournament with 16 participating teams. Professional production setup with live streaming.",
  },
  {
    title: "BEC Tekken 8 Friendly Online Tournament",
    date: "September 26, 2024",
    location: "Online via Discord",
    type: "tournament",
    image: "Images/covers/BEC_TEKKEN8.webp",
    description: "A high-energy 1v1 showdown where 32 fighters clashed in this Tekken 8 friendly tournament.",
  },
  {
    title: "BEC Online League of Legends Tournament",
    date: "August 29, 2024",
    location: "Online via Discord",
    type: "tournament",
    image: "Images/covers/BEC_LOL.webp",
    description: "An intense battle of strategy and teamwork, our League of Legends tournament brought 8 skilled teams together in a one-day online event.",
  },
  {
    title: "BEC Overwatch Online Friendly Tournament",
    date: "July 26-27, 2024",
    location: "Online via Discord",
    type: "tournament",
    image: "Images/covers/BEC_OW.webp",
    description: "Bahrain Esports Community's first-ever tournament! This event marked the beginning of our journey.",
  },
  // Add more events as needed, including workshops
];

function renderEvents(filter = "all", search = "") {
  const grid = document.getElementById("events-grid");
  if (!grid) return;
  let filtered = eventsData.filter(ev =>
    (filter === "all" || ev.type === filter) &&
    (ev.title.toLowerCase().includes(search) ||
     ev.location.toLowerCase().includes(search) ||
     ev.description.toLowerCase().includes(search))
  );
  grid.innerHTML = filtered.length ? filtered.map(ev => `
    <article class="event-card-modern">
      <div class="event-card-header">
        <img class="event-cover" src="${ev.image}" alt="${ev.title} Cover">
      </div>
      <div class="event-card-header-info">
        <h3 class="event-title">${ev.title}</h3>
        <div class="event-meta">
          <span class="event-date"><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
          <span class="event-location"><i class="fa-solid fa-location-dot"></i> ${ev.location}</span>
        </div>
      </div>
      <div class="event-card-body">
        <p class="event-description">${ev.description}</p>
        <a href="events/${ev.title.replace(/[^a-zA-Z0-9]/g, '_')}.html" class="see-all-events-btn">View Details</a>
      </div>
    </article>
  `).join("") : '<div style="grid-column:1/-1;text-align:center;color:#888;font-size:1.2rem;">No events found.</div>';
}

document.addEventListener("DOMContentLoaded", function() {
  renderEvents();
  const searchInput = document.getElementById("event-search");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let currentFilter = "all";
  let currentSearch = "";
  searchInput.addEventListener("input", function(e) {
    currentSearch = e.target.value.toLowerCase();
    renderEvents(currentFilter, currentSearch);
  });
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderEvents(currentFilter, currentSearch);
    });
  });
});

// Hero video removed; no sizing script needed
