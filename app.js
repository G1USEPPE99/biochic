// BIOCHIC Salon JavaScript - Centro Degradé Joelle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScrollY = currentScrollY;
    });

    //Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
const seeMoreBtn = document.getElementById('see-more-btn');
let currentFilter = 'all';
let mobileIndex = 3; // iniziamo mostrando le prime 3 foto

function updateGallery() {
  const isMobile = window.innerWidth <= 768;
  let count = 0;
  
  galleryItems.forEach(item => {
    const category = item.getAttribute('data-category');
    const match = (currentFilter === 'all' || category === currentFilter);
    
    if (match) {
      if (isMobile) {
        // Mostra solo fino a mobileIndex
        if (count < mobileIndex) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
        count++;
      } else {
        // Desktop: mostra tutto
        item.style.display = 'block';
      }
    } else {
      item.style.display = 'none';
    }
  });

  // Mostra o nascondi pulsante mobile
  if (isMobile && count > mobileIndex) {
    document.querySelector('.see-more-container').style.display = 'block';
  } else if (isMobile && count > 0 && count <= mobileIndex) {
    document.querySelector('.see-more-container').style.display = 'none';
  } else {
    document.querySelector('.see-more-container').style.display = 'none';
  }
}

// Filtri
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    currentFilter = this.getAttribute('data-filter');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    mobileIndex = 3; // resetta mobile a prime 3 foto
    updateGallery();
  });
});

// Pulsante "Vedi altre foto"
seeMoreBtn.addEventListener('click', function() {
  mobileIndex += 3;
  updateGallery();
});

// Aggiorna gallery al resize per passaggio desktop/mobile
window.addEventListener('resize', updateGallery);

// Inizializza
updateGallery();


    // Lightbox functionality for gallery
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const modalClose = document.querySelector('.modal-close');
    const allGalleryItems = document.querySelectorAll('.gallery-item img');

    allGalleryItems.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    const bookingForm = document.getElementById('booking-form');

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
 // ✅ INVIO A WHATSAPP
        const numeroWhatsApp = "3473826741"; // <-- inserisci qui il numero del titolare (senza + o spazi)
        
        const messaggio = 
            `*Nuovo messaggio dal sito Biochic.it*%0A%0A` +
            `👤 *Nome:* ${data.name}%0A` +
             (data.email ? `📧 *Email:* ${encodeURIComponent(data.email)}%0A` : '') +
            `📞 *Telefono:* ${data.phone}%0A` +
            `💬 *Messaggio:* ${encodeURIComponent(data.message)}%0A`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${messaggio}`;

        // Apre WhatsApp (web o app) con il messaggio compilato
        window.open(url, '_blank');
            // Show success message
            showSuccessMessage(contactForm, 'Messaggio inviato con successo! Ti contatteremo presto.');
            
            // Reset form
            contactForm.reset();
            
            console.log('Contact form data:', data);
        });
    }

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                service: formData.get('service'),
                date: formData.get('date'),
                time: formData.get('time'),
                notes: formData.get('notes')
            };

            // Validate date (must be future date)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showErrorMessage(bookingForm, 'La data selezionata deve essere futura.');
                return;
            }

            // Check if selected date is Monday or Sunday (closed days)
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 1) { // 0 = Sunday, 1 = Monday
                showErrorMessage(bookingForm, 'Il salone è chiuso di lunedì e domenica. Seleziona martedì, mercoledì, giovedì, venerdì o sabato.');
                return;
            }

            // Validate time based on opening hours (9:00-18:30)
            const selectedTime = data.time;
            const timeHour = parseInt(selectedTime.split(':')[0]);
            
            if (timeHour < 9 || timeHour > 18) {
                showErrorMessage(bookingForm, 'Gli orari di apertura sono dalle 9:00 alle 18:30. Seleziona un orario valido.');
                return;
            }
           // ✅ INVIO A WHATSAPP
        const numeroWhatsApp = "3473826741"; // <-- Inserisci qui il numero del titolare (senza +, spazi o zeri iniziali)
        
        const messaggio = 
            `*Nuova richiesta di prenotazione*%0A%0A` +
            `👤 *Nome:* ${data.name}%0A` +
            `📞 *Telefono:* ${data.phone}%0A` +
             (data.email ? `📧 *Email:* ${encodeURIComponent(data.email)}%0A` : '') +
            `💇‍♀️ *Servizio richiesto:* ${data.service}%0A` +
            `📅 *Data:* ${data.date}%0A` +
            `🕒 *Orario:* ${data.time}%0A` +
            (data.notes ? `📝 *Note:* ${encodeURIComponent(data.notes)}%0A` : '') +
            `%0A📍 Richiesta inviata dal sito Biochic.it`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${messaggio}`;

        // Apre WhatsApp in nuova finestra/scheda
        window.open(url, '_blank');

            // Show success message
            showSuccessMessage(bookingForm, 'Richiesta inviata su WhatsApp! Ti contatteremo presto per confermare l\'appuntamento.');
            
            // Reset form
            bookingForm.reset();
            
            console.log('Booking form data:', data);
        });
    }

    // Set minimum date for booking form
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        
        bookingDateInput.min = `${year}-${month}-${day}`;
    }

    // Show success message function
    function showSuccessMessage(form, message) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Scroll to message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Show error message function
    function showErrorMessage(form, message) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: rgba(var(--color-error-rgb), 0.1);
            border: 1px solid rgba(var(--color-error-rgb), 0.2);
            color: var(--color-error);
            padding: var(--space-12);
            border-radius: var(--radius-base);
            margin: var(--space-16) 0;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // Scroll to message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial, .service-category, .stat, .heritage-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // WhatsApp button click tracking
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked - Contact:3473826741');
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetText = target.textContent;
                
                if (targetText.includes('+')) {
                    const number = parseInt(targetText.replace(/\D/g, ''));
                    animateCounter(target, 0, number, 2000, '+');
                } else if (targetText.includes('%')) {
                    const number = parseInt(targetText.replace(/\D/g, ''));
                    animateCounter(target, 0, number, 2000, '%');
                }
                
                statsObserver.unobserve(target);
            }
        });
    });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
   // Enhanced testimonial rotation
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length >= 3) {
        let currentTestimonial = 0;
        
        // Highlight testimonials in sequence
        setInterval(() => {
            testimonials.forEach((testimonial, index) => {
                if (index === currentTestimonial) {
                    testimonial.style.transform = 'scale(1.05)';
                    testimonial.style.boxShadow = '0 8px 25px rgba(74, 124, 89, 0.3)';
                    testimonial.style.borderColor = 'var(--color-biochic-green)';
                } else {
                    testimonial.style.transform = 'scale(1)';
                    testimonial.style.boxShadow = 'var(--shadow-sm)';
                    testimonial.style.borderColor = 'var(--color-biochic-green)';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }, 4000);
    }


    // Form validation enhancements
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = 'var(--color-biochic-green)';
            }
        });

        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--color-biochic-green)';
            }
        });
    });

    // Email validation
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--color-error)';
                showFieldError(this, 'Inserisci un indirizzo email valido');
            } else if (this.value) {
                this.style.borderColor = 'var(--color-biochic-green)';
                removeFieldError(this);
            }
        });
    });

    // Phone validation
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('input', function() {
            // Remove non-numeric characters except + and spaces
            this.value = this.value.replace(/[^\d\s\+\-\(\)]/g, '');
        });

        field.addEventListener('blur', function() {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
            if (this.value && !phoneRegex.test(this.value)) {
                this.style.borderColor = 'var(--color-error)';
                showFieldError(this, 'Inserisci un numero di telefono valido');
            } else if (this.value) {
                this.style.borderColor = 'var(--color-biochic-green)';
                removeFieldError(this);
            }
        });
    });

    function showFieldError(field, message) {
        removeFieldError(field);
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.textContent = message;
        errorSpan.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            display: block;
            margin-top: var(--space-4);
        `;
        field.parentNode.appendChild(errorSpan);
    }

    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Loading state for forms
    function setFormLoading(form, isLoading) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Invia';
            submitBtn.style.opacity = '1';
        }
    }

    // Store original button texts
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(btn => {
        btn.dataset.originalText = btn.textContent;
    });

    // Updated real photos for BIOCHIC ()
    const realPhotos = [
        {
            url: "https://lh3.googleusercontent.com/p/AF1QipNdo7NbYJHOa6FEdht5DeMdPCV51qdyETpnBVyx=s1360-w1360-h1020-rw",
            alt: "Salone BIOCHIC - Esterno",
            category: "branding"
        },
        {
            url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nruDDoDtSfvfFT2j08_XVztNlwR9f-bRSAIJ5JVjB2qLC-l9cmFr6A60CkCObl58DzFvo-GLEVL3oSvn0V9ObKn-5To4Wti5eid5Netcweb641gHq9OWFygzaeVN37W2bJNnKgc=s1360-w1360-h1020-rw",
            alt: "BIOCHIC - Interior design",
            category: "interni"
        },
        {
            url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMb4DUWHYEazkwfxSzx-EpbTJS57EJufTfIHC-DNhGV2u_7Fo_fezHnKXfZ7umALALJJ6cBeHKtOs2ae_XkwOnfclXVBdsPV6jzpvVb1tebEoNaKnonUvoTC1P7EHOKAsuMvLV=s1360-w1360-h1020-rw",
            alt: "BIOCHIC - Postazioni styling",
            category: "postazioni"
        },
        {
            url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrfLvu0WpNITd4aLiB9RPbRJmL6tdMTWU9hWssNl9UyPf4FHBdLLY4KoBhxBoR9OLBX-OUQFc_QWqRLLywKbFXE2r-uDA-XmpjJ1TaK8I1QZKiMFZd7uv3HjmapG6QT2ADejBo3=s1360-w1360-h1020-rw",
            alt: "BIOCHIC - Area lavaggio capelli",
            category: "postazioni"
        },
        {
            url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npHIpTJgigT34KFc3DvErY5oPkVpioWyqMwh61tSSQHqPQF939-ZpO7nuv_WY6FsKYovCZEhmH17CuYPA19aJhQbWGpQkSLGNR5_PKUJFMceIRan7rq1pTdnBiAbylPzpHYEOi4=s1360-w1360-h1020-rw",
            alt: "BIOCHIC - Logo e branding salone",
            category: "branding"
        }
    ];

    // Service availability notification
    function checkServiceAvailability() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        
        const isOpen = (dayOfWeek >= 2 && dayOfWeek <= 6) && (hour >= 9 && hour < 18.5);
        
        if (isOpen) {
            console.log('✅ Il salone è aperto ora! Chiama subito: 095 090 1578');
        } else {
            console.log('🔒 Il salone è chiuso. Orari: Mar-Sab 9:00-18:30');
        }
        
        return isOpen;
    }

    // Check service availability on load
    checkServiceAvailability();

    // Image loading optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });

    // Enhanced contact buttons functionality
    const contactButtons = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.href.includes('tel:') ? 'phone' : 'email';
            console.log(`Contact button clicked - ${action}: ${this.href}`);
        });
    });

    // Booking form enhancements for Centro Degradé Joelle
    const serviceSelect = document.getElementById('booking-service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            const notesField = document.getElementById('booking-notes');
            
            if (selectedService.includes('degrade')) {
                notesField.placeholder = 'Specifica se desideri un colore particolare per il tuo Degradé Joelle...';
            } else if (selectedService.includes('taglio')) {
                notesField.placeholder = 'Descrivi il tipo di taglio che desideri...';
            } else if (selectedService.includes('bioplastia') || selectedService.includes('keratina') || selectedService.includes('ricostruzione')) {
                notesField.placeholder = 'Indica se hai problemi specifici ai capelli per il trattamento...';
            } else if (selectedService.includes('sposa')) {
                notesField.placeholder = 'Fornisci dettagli per il tuo servizio sposa (data matrimonio, stile desiderato...)...';
            } else {
                notesField.placeholder = 'Note aggiuntive per il tuo appuntamento...';
            }
        });
    }

    // BIOCHIC brand emphasis
    const biochicElements = document.querySelectorAll('.logo, .footer-brand h3');
    biochicElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.color = 'var(--color-biochic-gold)';
            this.style.textShadow = '2px 2px 8px rgba(212, 175, 55, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.color = 'var(--color-biochic-green)';
            this.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });

    // Enhanced Degradé Joelle service highlighting
    const degradeElements = document.querySelectorAll('.featured, .featured-category');
    degradeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-biochic-gold)';
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-biochic-green)';
            this.style.transform = 'scale(1)';
        });
    });

    // Accessibility enhancements
    document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-biochic-green)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Real photos validation - corrected for 5 working photos
    function validateRealPhotos() {
        let loadedPhotos = 0;
        const totalPhotos = realPhotos.length;
        
        realPhotos.forEach(photo => {
            const img = new Image();
            img.onload = function() {
                loadedPhotos++;
                if (loadedPhotos === totalPhotos) {
                    console.log('✅ Tutte le 5 foto reali di Google sono caricate correttamente!');
                }
            };
            img.onerror = function() {
                console.error('❌ Errore nel caricamento della foto:', photo.alt);
            };
            img.src = photo.url;
        });
    }

    // Validate photos on load
    validateRealPhotos();

    // Console log for development - updated information
    console.log('🌿 BIOCHIC Salon website caricato con successo!');
    console.log('🏆 Centro Degradé Joelle Autorizzato dal 2004');
    console.log('📞 Telefono: 095 090 1578');
    console.log('📱 WhatsApp: 388 733 0722');
    console.log('📧 Email: info@biochicpaterno.it');
    console.log('📍 Indirizzo: Via delle Rose 3, 95047 Paternò (CT)');
    console.log('🕒 Orari: Martedì-Sabato 9:00-18:30');
    console.log('🎨 Servizi principali: Degradé, Taglio, Trattamenti, Cure Specifiche');

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`✨ BIOCHIC website caricato in ${Math.round(loadTime)}ms`);
    });

    // Log corrections applied
    console.log('✅ CORREZIONI APPLICATE:');
    console.log('1. ✅ Servizi Centro Degradé Joelle aggiornati: Degradé, Taglio, Trattamenti, Cure Specifiche');
    console.log('2. ✅ Sezione "La Nostra Arte" rimossa');
    console.log('3. ✅ Galleria corretta: 5 foto funzionanti (rimossa foto problematica)');
    console.log('4. ✅ Indirizzo corretto: Via delle Rose 3, 95047 Paternò (CT)');

    // Enhanced services interaction
    const serviceCategoryCards = document.querySelectorAll('.service-category');
    serviceCategoryCards.forEach(card => {
        if (card.classList.contains('featured-category')) {
            card.addEventListener('click', function() {
                // Highlight the Degradé Joelle services
                this.style.background = 'linear-gradient(135deg, var(--color-bg-3) 0%, var(--color-biochic-green) 10%, var(--color-bg-3) 100%)';
                setTimeout(() => {
                    this.style.background = 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-3) 100%)';
                }, 1000);
            });
        }
    });

    // Enhanced testimonials for updated content
    const testimonialTexts = [
        "Il Degradé di Grazia è perfetto! Professionalità e qualità eccellenti.",
        "Salone elegante, prezzi onesti e risultati fantastici. Lo consiglio!",
        "Dal 2004 la mia parrucchiera di fiducia. Sempre soddisfatta!"
    ];

    // Update testimonial highlighting
    testimonials.forEach((testimonial, index) => {
        testimonial.addEventListener('click', function() {
            console.log(`Testimonianza ${index + 1}: ${testimonialTexts[index]}`);
        });
    });
});






const track = document.querySelector('.testimonials-grid');
const gap = 20; // gap tra testimonial in px
const scrollSpeed = 0.5; // pixel per frame

// Clona tutta la track per creare il loop infinito
const trackContent = track.innerHTML;
track.innerHTML += trackContent; // duplicazione

const testimonials = Array.from(track.children);
const originalCount = testimonials.length / 2; // numero di testimonial originali
const testimonialWidth = testimonials[0].offsetWidth + gap; // larghezza fissa + gap

let scrollPos = 0;

// Animazione scroll infinito
function animateTestimonials() {
    scrollPos += scrollSpeed;
    track.style.transform = `translateX(-${scrollPos}px)`;

    // Quando scroll ha superato la lunghezza dei testimonial originali, ricomincia da 0
    if (scrollPos >= originalCount * testimonialWidth) {
        scrollPos = 0;
    }

    requestAnimationFrame(animateTestimonials);
}

// Evidenzia testimonial attivo (opzionale)
let currentHighlight = 0;
setInterval(() => {
    testimonials.forEach((testimonial, index) => {
        if (index % originalCount === currentHighlight) {
            testimonial.style.transform = 'scale(1.05)';
            testimonial.style.boxShadow = '0 8px 25px rgba(74, 124, 89, 0.3)';
            testimonial.style.borderColor = 'var(--color-biochic-green)';
        } else {
            testimonial.style.transform = 'scale(1)';
            testimonial.style.boxShadow = 'var(--shadow-sm)';
            testimonial.style.borderColor = 'var(--color-biochic-green)';
        }
    });
    currentHighlight = (currentHighlight + 1) % originalCount;
}, 4000);

// Avvia animazione
animateTestimonials();



//animazione servizi
const sections = document.querySelectorAll('.animate-right,.animate-left');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animazione una sola volta
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

/*fade in*/
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // una sola volta
        }
    });
}, {
    threshold: 0.2
});

fadeElements.forEach(el => fadeObserver.observe(el));






