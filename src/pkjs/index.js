const priColor = '#ffee00';
const sndColor = 'black';

const getters = [
  {
    title: 'XMR EUR',
    url: 'https://api.kraken.com/0/public/Ticker?pair=XMREUR',
    valueKey: 'result.XXMRZEUR.c.0',
    valueType: 'number'
  },
  {
    title: 'Nbsp Status',
    url: 'http://status.nobreakspace.org/spaceapi.json',
    valueKey: 'state.open',
    valueType: 'boolean',
    isTrue: 'Offen',
    isFalse: 'Geschlossen',
  },
];

function getItem(obj, key) {
  key.split('.').forEach(function(k) {
    obj = obj[k];
  });
  return obj;
}

function dataToMenuItem(getter, data) {
  var item = getItem(data, getter.valueKey);
  if (getter.valueType == 'number') {
    item = (+item).toFixed(2);
  } else if (getter.valueType == 'boolean') {
    item = (item ? getter.isTrue : getter.isFalse) || item;
  }

  return {
    title: getter.title,
    subtitle: item
  };
}

Pebble.addEventListener('ready', function() {
  require('pebblejs');
  var UI = require('pebblejs/ui');
  var ajax = require('pebblejs/lib/ajax');

  var menu = new UI.Menu({
    textColor: priColor,
    backgroundColor: sndColor,
    highlightTextColor: sndColor,
    highlightBackgroundColor: priColor,

    sections: [{
        items: getters.map(function(g) {
          return {
            title: g.title,
            subtitle: 'loading...'
          };
        })
      }]
  });

  menu.status(false);
  menu.show();

  getters.forEach(function(g, i) {
    ajax(
      { url: g.url, type: 'json' },
      function(data) {
        menu.item(0, i, dataToMenuItem(g, data));
      }
    );
  });
});

