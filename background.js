function isBreakTime() {
  var today = new Date(),
      day = today.getDay(),
      isWeekend = (day === 6) || (day === 0),
      hour = today.getHours(),
      workingHours = (hour > 7 && hour < 22);

  return isWeekend || !workingHours;
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  // We are preventing the plugin to query the server during the weekend and at
  // strange hours (like 2 am or 10 pm) to give it a break :) You should not
  // work during the weekend, go take a rest and spend a quality time with your
  // loved ones.
  if (alarm.name == 'Reload pull requests' && !isBreakTime()) {
    API.reload();
  }
});

// https://developer.chrome.com/extensions/alarms
// Set an alarm to run every 30 minutes
var minutes = 30;
chrome.alarms.create('Reload pull requests', { periodInMinutes: minutes });

API.reload();
