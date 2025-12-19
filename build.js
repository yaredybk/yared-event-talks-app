const fs = require('fs');

const schedule = fs.readFileSync('schedule.json', 'utf-8');
const style = fs.readFileSync('style.css', 'utf-8');
const script = fs.readFileSync('script.js', 'utf-8');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${style}</style>`);
html = html.replace('<script src="script.js"></script>', `<script>
  const scheduleData = ${schedule};
  document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('search');

    function renderSchedule(schedule) {
      scheduleContainer.innerHTML = '';
      schedule.forEach(item => {
        if (item.break) {
          const breakElement = document.createElement('div');
          breakElement.classList.add('break');
          breakElement.textContent = \`\${item.startTime} - \${item.endTime}: \${item.break}\`;
          scheduleContainer.appendChild(breakElement);
        } else {
          const talkElement = document.createElement('div');
          talkElement.classList.add('talk');

          const time = document.createElement('div');
          time.classList.add('talk-time');
          time.textContent = \`\${item.startTime} - \${item.endTime}\`;
          talkElement.appendChild(time);

          const title = document.createElement('div');
          title.classList.add('talk-title');
          title.textContent = item.talk.title;
          talkElement.appendChild(title);

          const speakers = document.createElement('div');
          speakers.classList.add('talk-speakers');
          speakers.textContent = \`Speakers: \${item.talk.speakers.join(', ')}\`;
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

    renderSchedule(scheduleData);

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
</script>`);

fs.writeFileSync('event_schedule.html', html);
