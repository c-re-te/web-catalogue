// Seleziona tutti gli elementi con la classe .open-modal
const openModalElements = document.querySelectorAll('.open-modal');

// Aggiungi un evento di clic a ciascun elemento
openModalElements.forEach(element => {
    element.addEventListener('click', function() {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    });
});

// Create the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active'); // Add active class when in view
      }
    });
  });
  
  // Select all elements with .animate-on-scroll and observe them
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
  