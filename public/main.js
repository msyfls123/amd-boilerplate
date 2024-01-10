define('main', [
  'react',
  'react-dom',
  'jsx!component/Header',
  'utils/clock',
], function(React, ReactDOM, Header, clock) {
  'use strict';
  console.log(React, ReactDOM)
  clock.timeout(123).then(console.log)
});
