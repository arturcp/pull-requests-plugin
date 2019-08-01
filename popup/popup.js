$(document).ready(function() {
  var container = $('#plugin-container'),
      url = 'http://localhost:5003/pull_requests';

  $.getJSON(url, function(data) {
    $('body').css('background-color', '#e8eff3');
    $('#plugin-container').show();
    $('.loading').hide();

    PullRequests.setItems(data.items);

    if (data.items.length > 0) {
      PullRequests.count();

      var items = [];
      $.each(data.items, function(index, item) {
        container.append(pullRequestLine(item));
      });
    } else {
      container.innerHTML = 'Não há pull requests abertos.';
    }
  });
});

function pullRequestLine(item) {
  var checked = LocalStorage.read(item.id) != null;

  var p = $('<p>')
    .attr('id', item.id)
    .addClass('pull-request-paragraph');

  if (checked) {
    p.addClass('checked');
  }

  var checkbox = buildCheckbox(item, checked),
      reviewed = LocalStorage.read(item.id);

  if (reviewed) {
    checkbox.attr('checked', 'checked');
  }

  var a = $('<a>')
    .attr('href', item.html_url)
    .attr('target', '_blank');

  var details = $('<span>')
    .addClass('details');

  var title = item.title.replace(/\[(.*)\]/, '<b>[$1]</b>')
  a.html(title);

  details.html(item.user.login + daysAgo(item));

  p.append(checkbox);
  p.append(a);
  p.append(details);

  return $('<div>').addClass('pull-requests-list').append(p);
}

// It will generate the following HTML:
//
// <label class="container">One
//   <input type="checkbox" checked="checked">
//   <span class="checkmark"></span>
// </label>
//
// Source: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
function buildCheckbox(item, checked) {
  var container = $('<label>')
    .addClass('checkbox-container');

  var checkbox = $('<input>')
    .attr('type', 'checkbox')
    .attr('checked', checked);

  var checkmark = $('<span>')
    .addClass('checkmark');

  container.append(checkbox);
  container.append(checkmark);

  checkmark.on('click', function() {
    toggleReviewCheck(item.id, checkbox);
  })

  return container;
};

function daysBetween(date2, date1) {
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return  Math.ceil(timeDiff / (1000 * 3600 * 24));
};

function daysAgo(item) {
  var pullRequestDate = new Date(item.created_at),
      today = new Date(),
      days = daysBetween(today, pullRequestDate);

  var klass = days > 3 ? 'red' : 'green',
      formattedDays = "<span class='" + klass + "'>" + days + "</span>"

  var timePassed = days + (days > 1 ? ' days ago' : ' day ago');

  return ' <b class="' + klass + '">(' + timePassed + ')</b>';
};

function toggleReviewCheck(id, element) {
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
