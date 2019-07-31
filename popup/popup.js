$(document).ready(function() {
  var container = $('#plugin-container'),
      url = 'http://localhost:5003/pull_requests';

  $.getJSON(url, function(data) {
    $('body').css('background-color', '#e8eff3');
    $('#plugin-container').show();
    $('.loading').hide();

    if (data.items.length > 0) {
      setIconBadge(data.items.length);

      var items = [];
      $.each(data.items, function(index, item) {
        // items.push(pullRequestLine(item));
        container.append(pullRequestLine(item));
      });

      // $('<div/>', {
      //   'class': 'pull-requests-list',
      //   html: items.join('')
      // }).appendTo(container);
    } else {
      container.innerHTML = 'Não há pull requests abertos.';
    }
  });
});

function pullRequestLine(item) {
  var li = $('<p>')
    .attr('id', item.id);

  var checkbox = buildCheckbox(),
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

  li.append(checkbox);
  li.append(a);
  li.append(details);

  return $('<div>').addClass('pull-requests-list').append(li);

  // return li.prop('outerHTML');;
}

// It will generate the following HTML:
//
// <label class="container">One
//   <input type="checkbox" checked="checked">
//   <span class="checkmark"></span>
// </label>
//
// Source: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
function buildCheckbox() {
  var container = $('<label>')
    .addClass('checkbox-container');

  var checkbox = $('<input>')
    .attr('type', 'checkbox')
    .attr('checked', false);

  var checkmark = $('<span>')
    .addClass('checkmark');

  container.append(checkbox);
  container.append(checkmark);

  checkmark.on('click', function() {
    console.log('clicked');
    toggleReviewCheck(1);
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

function setIconBadge(count) {
  chrome.browserAction.setIcon({ path:'../images/red-shark.png' });
  chrome.browserAction.setBadgeText({ text: count.toString() });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
}

function toggleReviewCheck(id) {
  console.log(id);
  // LocalStorage.write('test', 'abc');
}
