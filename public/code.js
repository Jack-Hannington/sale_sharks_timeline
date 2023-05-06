function showFixtureDetails(detailsContainer, index, activeFixture) {
  Array.from(detailsContainer.children).forEach((details, i) => {
    details.style.display = i === parseInt(index) ? 'block' : 'none';
  });

  // Add border to the active fixture and remove it from others
  Array.from(detailsContainer.parentElement.querySelectorAll('.fixture')).forEach(fixture => {
    if (fixture === activeFixture) {
      fixture.style.border = '1px solid lightblue';
    } else {
      fixture.style.border = '1px solid #ededed';
    }
  });
}

document.querySelectorAll('.fixture').forEach(fixture => {
  fixture.addEventListener('click', () => {
    const index = fixture.dataset.index;
    const detailsContainer = fixture.parentElement.nextElementSibling;
    showFixtureDetails(detailsContainer, index, fixture);
  });
});

document.querySelectorAll('.month-container').forEach(monthContainer => {
  const firstFixture = monthContainer.querySelector('.fixture');
  if (firstFixture) {
    const detailsContainer = firstFixture.parentElement.nextElementSibling;
    showFixtureDetails(detailsContainer, 0, firstFixture);
  }
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
