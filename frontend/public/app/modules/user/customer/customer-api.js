(function () {
  'use strict';

  app.service('CustomerAPI', CustomerAPI);

  function CustomerAPI($http, socket) {

    let _customers = [];

    this.customers = _customers;

    ////////////////////////////////////////////////////////////////////////////    

    socket.on('createdCustomerID', (id) => {
      _getCustomerByID(id);
    });

    socket.on('updatedCustomerID', (id) => {
      $http.get(`api/customers/${id}`).then(res => {
        let isFound = false;
        if (res.status === 200) {
          for (let i in _customers) {
            if (_customers[i].id === id) {
              isFound = true;
              _customers[i] = res.data;
            }
          }
          if (isFound === false) _customers.push(res.data);
        }
      }, err => {
        console.error(err);
      });
    });

    socket.on('deletedCustomerID', (id) => {
      let isFound = false;
      for (let i in _customers) {
        if (_customers[i].id === id) {
          isFound = true;
          _customers[i].isDeleted = true;
          break;
        }
      }
      if (isFound === false) _getCustomerByID(id);
    });

    socket.on('restoredCustomerID', (id) => {
      let isFound = false;
      for (let i in this._customers) {
        if (this._customers[i].id === id) {
          isFound = true;
          this._customers[i].isDeleted = false;
          break;
        }
      }
      if (isFound === false) _getCustomerByID(id);
    });

    ////////////////////////////////////////////////////////////////////////////

    (function _getCustomers() {
      $http.get(`api/customers/`).then(res => {
        if (res.status === 200) {
          Object.assign(_customers, res.data);
          return _customers;
        }
      }, err => {
        console.error(err);
      });
    })();

    ////////////////////////////////////////////////////////////////////////////

    this.getCustomers = () => {
      return _customers;
    }

    this.getCustomerByID = (id) => {
      for (let i in _customers) {
        if (_customers[i].id === id) {
          return _customers[i];
        }
      }
    }

    this.createCustomer = (data) => {
      return $http.post('/api/customers/', data).then(res => {
        return res.status;
      }, (err) => {
        console.error(err);
        return err.code;
      });
    }

    this.updateCustomer = (data) => {
      return $http.put(`/api/customers/${data.id}`, data).then(res => {
        if (res.status === 200) {
          return res.status;
        }
      }, (err) => {
        console.error(err);
        return res.data;
      });
    }

    this.deleteCustomer = (id) => {
      return $http.delete(`/api/customers/${id}`).then((res) => {
        if (res.status === 200) {
          for (let i in _customers) {
            if (_customers[i].id === res.data.id) {
              _customers[i] = res.data;
              break;
            }
          }
          return res.status;
        } else {
          console.error(res);
        }
      }, (err) => {
        console.error(err);
      });
    }

    this.restoreCustomer = (id) => {
      return $http.options(`/api/customers/${id}`).then((res) => {
        if (res.status === 200) {
          for (let i in _customers) {
            if (_customers[i].id === res.data.id) {
              _customers[i] = res.data;
              break;
            }
          }
          return res.status;
        } else {
          console.error(res);
        }
      }, (err) => {
        console.error(err);
      });
    }

    ////////////////////////////////////////////////////////////////////////////

    function _getCustomerByID(id) {
      $http.get(`api/customers/${id}`).then((res) => {
        if (res.status === 200) _customers.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }
  }

})();
