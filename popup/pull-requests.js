var PullRequests = {
  items: [],
  setItems: function(items) {
    this.items = items;
  },

  count: function() {
    var counter = 0;

    $.each(this.items, function() {
      if (!LocalStorage.read(this.id)) {
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
