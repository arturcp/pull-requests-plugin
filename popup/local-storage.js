var LocalStorage = {
  prefix: 'pull-requests-plugin__',

  read: function(key) {
    var storageKey = this.prefix + key;
    return localStorage.getItem(storageKey);
  },

  write: function(key, value) {
    var storageKey = this.prefix + key;
    localStorage.setItem(storageKey, value);
  }
}
