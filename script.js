// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    
    // Close mobile menu if open
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      enableScroll();
    }
  });
});

// Scroll to top
const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
});

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

// Handle Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
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
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again later.');
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
      return (activeFilter === 'all' && category === 'tournament') || 
             (activeFilter === category);
    });

    // Hide all cards first
    eventCards.forEach(card => card.style.display = 'none');

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
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
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

  // Tournament data
  const tournamentData = {
    'Fudruckers Gaming Night': {
      highlights: [
        'Casual gaming environment',
        'Food and drink specials',
        'Prize giveaways',
        'Community networking'
      ],
      responsibilities: [
        'Event coordination with venue',
        'Gaming equipment setup',
        'Prize distribution',
        'Community engagement',
        'Social media coverage',
        'Registration management'
      ],
      photos: [
        'Images/event-photos/fudruckers-1.jpg',
        'Images/event-photos/fudruckers-2.jpg',
        'Images/event-photos/fudruckers-3.jpg',
        'Images/event-photos/fudruckers-4.jpg',
        'Images/event-photos/fudruckers-5.jpg',
        'Images/event-photos/fudruckers-6.jpg'
      ]
    },
    'Overwatch Online Friendly Tournament': {
      highlights: [
        '12 Teams competed',
        '5v5 format',
        'Single Elimination bracket',
        'Best of 3 matches (Final was Best of 5)'
      ],
      responsibilities: [
        'Match scheduling & bracket management',
        'Streaming',
        'Casting & spectator management',
        'Match hosting & refereeing',
        'Tournament bracket setup'
      ]
    },
    'BEC Online League of Legends Tournament': {
      highlights: [
        '8 Teams participated',
        '5v5 format',
        'Single Elimination',
        'Best of 1 matches'
      ],
      responsibilities: [
        'Match scheduling & bracket management',
        'Streaming',
        'Casting & spectator management',
        'Match hosting & refereeing',
        'Tournament bracket setup'
      ]
    },
    'BEC Tekken 8 Friendly Online Tournament': {
      highlights: [
        '32 Players',
        '1v1 format',
        'Single Elimination bracket'
      ],
      responsibilities: [
        'Match scheduling & bracket management',
        'Streaming',
        'Casting & spectator management',
        'Match hosting & refereeing',
        'Tournament bracket setup'
      ]
    },
    'Reboot Valorant Tournament': {
      highlights: [
        '16 participating teams (80 Players)',
        'Professional production setup',
        'Live-streamed on Twitch',
        'Bracket hosted on Challonge',
        'Prize pool sponsored by local partners'
      ],
      responsibilities: [
        'Event planning & team coordination',
        'Match scheduling & bracket management',
        'On-site tech support & streaming',
        'Casting and spectator management',
        'Match hosting and refereeing',
        'Tournament bracket setup',
        'Venue setup and equipment management',
        'Social media content creation & result announcements'
      ],
      photos: [
        'Images/event-photos/Valorant (1).png',
        'Images/event-photos/Valorant (2).png',
        'Images/event-photos/Valorant (3).png',
        'Images/event-photos/Valorant (4).png',
        'Images/event-photos/Valorant (5).png',
        'Images/event-photos/Valorant (6).png'
      ]
    },
    'Reboot Tekken 8 Tournament': {
      highlights: [
        '64-player bracket',
        'Double elimination format',
        'Matches streamed live',
        'Prize pool sponsored by local partners'
      ],
      responsibilities: [
        'Event planning & team coordination',
        'Match scheduling & bracket management',
        'On-site tech support & streaming',
        'Casting and spectator management',
        'Match hosting and refereeing',
        'Tournament bracket setup',
        'Venue setup and equipment management',
        'Social media content creation & result announcements'
      ],
      photos: [
        'Images/event-photos/tekken-1.png',
        'Images/event-photos/tekken-2.png',
        'Images/event-photos/tekken-3.png',
        'Images/event-photos/tekken-4.png',
        'Images/event-photos/tekken-5.png',
        'Images/event-photos/tekken-6.png'
      ]
    },
    'Zain E-sports Marvel Rivals Tournament': {
      highlights: [
        '13 participating teams',
        'Professional production setup',
        'Live-streamed on Twitch',
        'Bracket hosted on Challonge',
        'Prize pool sponsored by Zain E-sports'
      ],
      responsibilities: [
        'Event planning & team coordination',
        'Match scheduling & bracket management',
        'On-site tech support & streaming',
        'Casting and spectator management',
        'Match hosting and refereeing',
        'Tournament bracket setup'
      ],
      photos: [
        'Images/event-photos/marvel-1.png',
        'Images/event-photos/marvel-2.png',
        'Images/event-photos/marvel-3.png',
        'Images/event-photos/marvel-4.png',
        'Images/event-photos/marvel-5.png',
        'Images/event-photos/marvel-6.png'
      ]
    }
  };

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