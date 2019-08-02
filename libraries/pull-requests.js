var PullRequests = {
  items: [],
  setItems: function(items) {
    this.items = items;
  },

  count: function() {
    var counter = 0;

    this.items.forEach(function(element) {
      if (!LocalStorage.read(element.id)) {
        counter += 1;
      }
    });

    this.setBadge(counter);

    return counter;
  },

  setBadge: function(count) {
    if (count > 0) {
      chrome.browserAction.setIcon({ path:'../images/red-shark.png' });
      chrome.browserAction.setBadgeText({ text: count.toString() });
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
    } else {
      chrome.browserAction.setIcon({ path:'../images/blue-shark.png' });
      chrome.browserAction.setBadgeText({ text: '' });
    }
  }
}
