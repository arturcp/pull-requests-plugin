var API = {
  url: 'https://pull-requests-api.herokuapp.com/pull_requests',

  reload: function(callback) {
    var authors = LocalStorage.read('authors');
    $.getJSON(this.url + '?authors=' + authors, function(data) {
      PullRequests.setItems(data.items);
      PullRequests.count();

      if (callback && typeof(callback) == 'function') {
        callback(data.items);
      }
    });
  }
}
