$(document).ready(function() {
  console.log('API version: ' + PullRequests.version);

  var container = $('#plugin-container'),
      authors = LocalStorage.read('authors'),
      token = LocalStorage.read('token'),
      items = PullRequests.getItems();

  if (!authors || !token) {
    console.log('Options not set');
    UI.showHint(container);
  } else if (items && items.length > 0) {
    console.log('Rebuilt from memory');
    setTimeout(function() {
      UI.build(container, authors, items);
    }, 1000);
  } else {
    console.log('Fetching data from API');
    API.reload(function(items) {
      UI.build(container, authors, items);
    });
  }

  $('#refresh').on('click', function() {
    PullRequests.setItems(null);
    location.reload();
  });
});

var UI = {
  build: function(container, authors, items) {
    container.html('');
    container.show();

    $('.loading').hide();

    if (items.length > 0) {
      container.removeClass('empty');

      $.each(items, function(index, item) {
        container.append(UI._pullRequestLine(item));
      });

      container.append('<div class="updated-at">' + UI._showLastUpdateHour() + '</div>');
    } else {
      container.addClass('empty');
      container.html('You are clean ;)');
    }
  },

  showHint: function(container) {
    $('.loading').hide();

    container.addClass('empty');
    container.html('Before using the plugin, you need to configure it. Click on the icon with the right button and choose "options".');

    var hint = $('<img>').attr('src', '/images/config-plugin.png').addClass('hint');
    container.append(hint);
    container.show();
    container.css('display', 'block');
  },

  _pullRequestLine: function(item) {
    var checked = LocalStorage.read(item.id) != null;

    var p = $('<p>')
      .attr('id', item.id)
      .addClass('pull-request-paragraph');

    if (checked) {
      p.addClass('checked');
    }

    var checkbox = this._buildCheckbox(item, checked),
        reviewed = LocalStorage.read(item.id);

    if (reviewed) {
      checkbox.attr('checked', 'checked');
    }

    var link = $('<a>')
      .attr('href', item.html_url)
      .attr('target', '_blank');

    var details = $('<span>').addClass('details');
    var title = item.title.replace(/\[(.*)\]/, '<b>[$1]</b>')
    link.html(title);

    var repoParts = item.repository_url.split('/'),
        repo = repoParts[repoParts.length - 1],
        repoText = '<a target="_blank" href="https://github.com/' + item.repository_url.replace('https://api.github.com/repos/', '') + '"><b class="repo-name">' + repo + '</b></a> - ';

    details.html(repoText + ' ' + item.user.login + this._daysAgo(item));

    p.append(checkbox);
    p.append(link);
    p.append(details);

    return $('<div>').addClass('pull-requests-list').append(p);
  },

  // It will generate the following HTML:
  //
  // <label class="checkbox-container">One
  //   <input type="checkbox" checked="checked">
  //   <span class="checkmark"></span>
  // </label>
  //
  // Source: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
  _buildCheckbox: function(item, checked) {
    var container = $('<label>')
      .addClass('checkbox-container');

    var checkbox = $('<input>')
      .attr('type', 'checkbox')
      .attr('checked', checked);

    var checkmark = $('<span>')
      .addClass('checkmark');

    container.append(checkbox);
    container.append(checkmark);

    var self = this;
    checkmark.on('click', function() {
      self._toggleReviewCheck(item.id, checkbox);
    })

    return container;
  },

  _daysBetween: function(date2, date1) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    if (date1.getFullYear() === date2.getFullYear() &&
     date1.getMonth() === date2.getMonth() &&
     date1.getDate() === date2.getDate()) {
      return 0;
    } else {
      return  Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  },

  _daysAgo: function(item) {
    var pullRequestDate = new Date(item.created_at),
        today = new Date(),
        days = this._daysBetween(today, pullRequestDate);

    var klass = days > 3 ? 'red' : 'green',
        formattedDays = "<span class='" + klass + "'>" + days + "</span>"

    var timePassed = days + (days > 1 ? ' days ago' : ' day ago');
    if (days === 0) {
      timePassed = "today"
    }

    return ' <b class="' + klass + '">(' + timePassed + ')</b>';
  },

  _toggleReviewCheck: function(id, element) {
    var checkbox = $(element),
        paragraph = checkbox.parents('p.pull-request-paragraph');

    if (checkbox.prop('checked')) {
      LocalStorage.remove(id);
      paragraph.removeClass('checked');
    } else {
      LocalStorage.write(id, true);
      paragraph.addClass('checked');
    }

    PullRequests.count();
  },

  _showLastUpdateHour: function() {
    var localDate = LocalStorage.read('last-update');
    var date = localDate ? new Date(localDate) : new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minutes = date.getMinutes();

    var str_date = day + '/' + (month + 1) + '/' + year,
        str_hour = hour + ':' + minutes;

    return 'Last update: ' +  str_date + ' ' + str_hour;
  }
}
