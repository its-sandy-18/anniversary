document.addEventListener('DOMContentLoaded', function() {
  const openButton = document.getElementById('open');
  const closeButton = document.getElementById('close');
  const card = document.getElementById('card');
  const cardFront = document.getElementById('card-front');
  const cardInside = document.getElementById('card-inside');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  // Function to check if we are on a mobile layout (based on CSS media query)
  function isMobileLayout() {
      return window.matchMedia("(max-width: 768px)").matches;
  }

  // --- Initial state setup for card content visibility ---
  function setupInitialState() {
      if (isMobileLayout()) {
          cardInside.style.display = 'none'; // Hide inside by default on mobile
          openButton.style.display = 'inline'; // Show open button
          closeButton.style.display = 'none'; // Hide close button
          cardFront.style.display = 'block'; // Ensure front is visible
          card.classList.remove('open-fully', 'open-half', 'close-half'); // Reset desktop classes
      } else {
          cardInside.style.display = 'block'; // Show inside by default on desktop
          openButton.style.display = 'inline'; // Show open button
          closeButton.style.display = 'none'; // Hide close button
          // Desktop will handle initial flip state via CSS if no JS interaction has happened
      }
  }

  // --- Event Listeners ---
  openButton.addEventListener('click', function() {
      if (isMobileLayout()) {
          // Mobile: Show inside, hide front
          cardFront.style.display = 'none';
          cardInside.style.display = 'block';
          openButton.style.display = 'none'; // Hide open button
          closeButton.style.display = 'inline'; // Show close button
          // Optional: scroll to the top of the card inside
          cardInside.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          // Desktop: Perform the flip animation
          card.classList.add('open-half');
          setTimeout(function() {
              card.classList.add('open-fully');
              openButton.style.display = 'none';
              closeButton.style.display = 'inline';
          }, 1000); // Match CSS transition duration
      }
  });

  closeButton.addEventListener('click', function() {
      if (isMobileLayout()) {
          // Mobile: Hide inside, show front
          cardInside.style.display = 'none';
          cardFront.style.display = 'block';
          openButton.style.display = 'inline'; // Show open button
          closeButton.style.display = 'none'; // Hide close button
          // Optional: scroll to the top of the card front
          cardFront.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          // Desktop: Reverse the flip animation
          card.classList.remove('open-fully');
          setTimeout(function() {
              card.classList.remove('open-half');
              openButton.style.display = 'inline';
              closeButton.style.display = 'none';
          }, 1000); // Match CSS transition duration
      }
  });

  // --- Scroll to Top Button Logic ---
  window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = "block";
      } else {
          scrollToTopBtn.style.display = "none";
      }
  });

  scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Run initial setup
  setupInitialState();

  // Re-run setup on window resize to adjust for layout changes
  window.addEventListener('resize', setupInitialState);
});