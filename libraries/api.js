var API = {
  url: 'https://pull-requests-api.herokuapp.com/pull_requests',

  reload: function(callback) {
    var authors = LocalStorage.read('authors'),
        organization = LocalStorage.read('organization'),
        token = LocalStorage.read('token');

    var data = {
      authors: authors,
      organization: organization,
      token: token
    };

    $.post(this.url, data, function(response) {
      PullRequests.setItems(response.items);
      PullRequests.count();
      LocalStorage.write('last-update', new Date());

      if (callback && typeof(callback) == 'function') {
        callback(response.items);
      }
    }, 'json');
  }
}
