const fs = require('fs');
const talks = require('./data.json');

let startTime = new Date();
startTime.setHours(10, 0, 0, 0);

const schedule = [];

for (let i = 0; i < talks.length; i++) {
  const talk = talks[i];
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  schedule.push({
    startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    talk,
  });

  startTime = new Date(endTime.getTime() + 10 * 60 * 1000);

  if (i === 2) {
    const lunchBreakEndTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    schedule.push({
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: lunchBreakEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      break: 'Lunch Break',
    });
    startTime = lunchBreakEndTime;
  }
}

fs.writeFileSync('schedule.json', JSON.stringify(schedule, null, 2));
