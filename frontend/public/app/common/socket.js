(function () {
  'use strict';

  app.factory('socket', socket);
  
  function socket() {
  
    const socket = io('http://use-case-tracker.org:3000');  
    
    return socket;
  
  };
  
})();
