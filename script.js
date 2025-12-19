document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('search');

  let scheduleData = [];

  fetch('schedule.json')
    .then(response => response.json())
    .then(data => {
      scheduleData = data;
      renderSchedule(scheduleData);
    });

  function renderSchedule(schedule) {
    scheduleContainer.innerHTML = '';
    schedule.forEach(item => {
      if (item.break) {
        const breakElement = document.createElement('div');
        breakElement.classList.add('break');
        breakElement.textContent = `${item.startTime} - ${item.endTime}: ${item.break}`;
        scheduleContainer.appendChild(breakElement);
      } else {
        const talkElement = document.createElement('div');
        talkElement.classList.add('talk');

        const time = document.createElement('div');
        time.classList.add('talk-time');
        time.textContent = `${item.startTime} - ${item.endTime}`;
        talkElement.appendChild(time);

        const title = document.createElement('div');
        title.classList.add('talk-title');
        title.textContent = item.talk.title;
        talkElement.appendChild(title);

        const speakers = document.createElement('div');
        speakers.classList.add('talk-speakers');
        speakers.textContent = `Speakers: ${item.talk.speakers.join(', ')}`;
        talkElement.appendChild(speakers);

        const categories = document.createElement('div');
        item.talk.category.forEach(cat => {
          const categorySpan = document.createElement('span');
          categorySpan.classList.add('talk-category');
          categorySpan.textContent = cat;
          categories.appendChild(categorySpan);
        });
        talkElement.appendChild(categories);

        const description = document.createElement('p');
        description.textContent = item.talk.description;
        talkElement.appendChild(description);

        scheduleContainer.appendChild(talkElement);
      }
    });
  }

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSchedule = scheduleData.filter(item => {
      if (item.break) {
        return true;
      }
      return item.talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredSchedule);
  });
});
