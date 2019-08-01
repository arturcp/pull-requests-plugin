var API = {
  url: 'http://localhost:5003/pull_requests',

  reload: function() {
    var self = this,
        container = $('#plugin-container');

    $.getJSON(this.url, function(data) {
      container.show();
      $('.loading').hide();

      PullRequests.setItems(data.items);
      PullRequests.count();

      if (data.items.length > 0) {
        $.each(data.items, function(index, item) {
          console.log(self._pullRequestLine(item));
          container.append(self._pullRequestLine(item));
        });
      } else {
        container.innerHTML = 'Não há pull requests abertos.';
      }
    });
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

    details.html(item.user.login + this._daysAgo(item));

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
    return  Math.ceil(timeDiff / (1000 * 3600 * 24));
  },

  _daysAgo: function(item) {
    var pullRequestDate = new Date(item.created_at),
        today = new Date(),
        days = this._daysBetween(today, pullRequestDate);

    var klass = days > 3 ? 'red' : 'green',
        formattedDays = "<span class='" + klass + "'>" + days + "</span>"

    var timePassed = days + (days > 1 ? ' days ago' : ' day ago');

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
  }
}
