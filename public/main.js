'use strict';

define('main', [
  'react',
  'react-dom',
  'page/Index.jsx',
  'utils/clock',
], function(React, ReactDOM, Index, clock) {
  const rootNode = document.getElementById('root')
  const root = ReactDOM.createRoot(rootNode)
  root.render(Index())
  clock.timeout(123).then(console.log)
});
