  // JavaScript code for handling tab functionality
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.getAttribute('data-tab');

      // Remove active class from all tab links and contents
      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.style.display = 'none');

      // Add active class to the clicked tab link and display its content
      link.classList.add('active');
      document.getElementById(tabId).style.display = 'block';
    });
  });