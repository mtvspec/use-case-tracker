$scope.logOut = () => {
      $http.post('/api/users/logout').then((res) => {
        if (res.status === 200) $state.go('login');
      }, (err) => {
        console.error(err);
      });
    }