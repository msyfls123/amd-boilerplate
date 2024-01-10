'use strict';

define('main', [
  'react',
  'react-dom',
  'component/Header.jsx',
  'utils/clock',
], function(React, ReactDOM, Header, clock) {
  const rootNode = document.getElementById('root')
  const root = ReactDOM.createRoot(rootNode)
  root.render(Header())
  clock.timeout(123).then(console.log)
});
