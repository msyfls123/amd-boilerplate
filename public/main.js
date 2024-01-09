define('main', [
  'react',
  'jsx!component/Header',
  'utils/clock',
], function(react, Header, clock) {
  'use strict';
  clock.timeout(123).then(console.log)
});
