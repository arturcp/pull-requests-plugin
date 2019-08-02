chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'Reload pull requests') {
    API.reload();
  }
});

// https://developer.chrome.com/extensions/alarms
// Set an alarm to run every 60 minutes
var minutes = 60;
chrome.alarms.create('Reload pull requests', { periodInMinutes: minutes });

API.reload();
