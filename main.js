// ============================================================
// main.js - Blogr Landing Page Interactive Behaviour
// Handles: mobile hamburger menu, dropdown toggles
// ============================================================

// Wait for the full HTML to load before running any JS
document.addEventListener('DOMContentLoaded', function () {

  // --- ELEMENT REFERENCES ---

  // The hamburger button (visible on mobile only)
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  // The full nav menu container
  const navMenu = document.getElementById('navMenu');

  // All dropdown trigger buttons inside the nav
  const navToggles = document.querySelectorAll('.nav-toggle');


  // --- HAMBURGER MENU TOGGLE ---

  // When the hamburger button is clicked, open or close the mobile nav
  hamburgerBtn.addEventListener('click', function () {

    // Check whether the menu is currently open
    const isOpen = navMenu.classList.contains('open');

    if (isOpen) {
      // Menu is open: close it
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false'); // accessibility: tell screen readers it is closed
    } else {
      // Menu is closed: open it
      navMenu.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');  // accessibility: tell screen readers it is open
    }
  });


  // --- DROPDOWN TOGGLE FOR EACH NAV GROUP ---

  // Loop through every nav dropdown trigger button
  navToggles.forEach(function (toggle) {

    toggle.addEventListener('click', function () {

      // Get the parent .nav-group element that wraps this button and its dropdown
      const parentGroup = toggle.closest('.nav-group');

      // Check if this group is already open
      const isOpen = parentGroup.classList.contains('open');

      // Close ALL other open dropdowns first (only one open at a time)
      document.querySelectorAll('.nav-group.open').forEach(function (openGroup) {
        openGroup.classList.remove('open');                          // remove open class
        openGroup.querySelector('.nav-toggle')
          .setAttribute('aria-expanded', 'false');                  // update aria for screen readers
      });

      // If the clicked group was NOT already open, open it now
      // (if it WAS open, closing all above already closed it, so nothing more needed)
      if (!isOpen) {
        parentGroup.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true'); // update aria to say it is now open
      }
    });
  });


  // --- CLOSE MENU WHEN CLICKING OUTSIDE ---

  // If the user clicks anywhere outside the nav, close everything
  document.addEventListener('click', function (event) {

    // Check if the click was outside the nav menu AND outside the hamburger button
    const clickedInsideNav  = navMenu.contains(event.target);
    const clickedHamburger  = hamburgerBtn.contains(event.target);

    if (!clickedInsideNav && !clickedHamburger) {

      // Close the mobile menu
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');

      // Close any open dropdown groups
      document.querySelectorAll('.nav-group.open').forEach(function (openGroup) {
        openGroup.classList.remove('open');
        openGroup.querySelector('.nav-toggle')
          .setAttribute('aria-expanded', 'false');
      });
    }
  });


  // --- CLOSE DROPDOWNS ON ESCAPE KEY ---

  // Allow keyboard users to close menus by pressing Escape
  document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {

      // Close mobile menu
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');

      // Close all dropdown groups
      document.querySelectorAll('.nav-group.open').forEach(function (openGroup) {
        openGroup.classList.remove('open');
        openGroup.querySelector('.nav-toggle')
          .setAttribute('aria-expanded', 'false');
      });
    }
  });

}); // end DOMContentLoaded
