Pebble.addEventListener('ready', function() {
  require('pebblejs');
  var UI = require('pebblejs/ui');
  var ajax = require('pebblejs/lib/ajax');

  var card = new UI.Card({
    title: 'Hello World',
    body: 'This is your first Pebble app!',
    scrollable: true
  });

  card.show();
});
