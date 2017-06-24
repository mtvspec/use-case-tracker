(function () {
  'use strict';

  app.factory('socket', function MessageBrocker() {
  
    const socket = io('http://use-case-tracker.org:3000');  
    
    return socket;
  
  });
  
})();

