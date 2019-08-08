var PullRequests = {
  items: [],
  version: 1,
  setItems: function(items) {
    this.items = items;
    LocalStorage.write('items', JSON.stringify(items));
  },

  getItems: function() {
    var items = LocalStorage.read('items');
    if (items && items.length > 0) {
      return JSON.parse(items);
    } else {
      return [];
    }
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
