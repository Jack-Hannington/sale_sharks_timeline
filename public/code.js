document.querySelectorAll('.fixture').forEach(fixture => {
    fixture.addEventListener('click', () => {
      const index = fixture.dataset.index;
      const detailsContainer = fixture.parentElement.nextElementSibling;
      const fixtureDetails = detailsContainer.children[index];
  
      Array.from(detailsContainer.children).forEach((details, i) => {
        details.style.display = i === parseInt(index) ? 'block' : 'none';
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const monthElements = document.querySelectorAll('.month-container');

    const updateActiveMonth = () => {
        for (const month of monthElements) {
            const rect = month.getBoundingClientRect();
            const middleOfScreen = window.innerHeight / 2;

            if (rect.top <= middleOfScreen && rect.bottom > middleOfScreen) {
                month.classList.add('active');
            } else {
                month.classList.remove('active');
            }
        }
    };

    updateActiveMonth();
    document.addEventListener('scroll', updateActiveMonth);
});

// init aos
AOS.init();

  