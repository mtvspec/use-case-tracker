(function () {
  'use strict';

  app.service('PersonAPI', PersonAPI);

  function PersonAPI($http, socket) {

    let _genders = []
    let _persons = []

    this.genders = _genders
    this.persons = _persons

    ////////////////////////////////////////////////////////////////////////////    

    socket.on('createdPersonID', (id) => {
      _getPersonByID(id)
    });

    socket.on('updatedPersonID', (id) => {
      $http.get(`api/persons/${id}`).then((res) => {
        let isFound = false
        if (res.status === 200) {
          for (let i in _persons) {
            if (_persons[i].id === id) {
              isFound = true
              _persons[i] = res.data
            }
          }
          if (isFound === false) _persons.push(res.data)
        }
      }, (err) => {
        console.error(err)
      });
    });

    socket.on('deletedPersonID', (id) => {
      let isFound = false
      for (let i in _persons) {
        if (_persons[i].id === id) {
          isFound = true
          _persons[i].isDeleted = true
          break
        }
      }
      if (isFound === false) _getPersonByID(id);
    });

    socket.on('restoredPersonID', (id) => {
      let isFound = false
      for (let i in this._persons) {
        if (this._persons[i].id === id) {
          isFound = true
          this._persons[i].isDeleted = false
          break
        }
      }
      if (isFound === false) _getPersonByID(id)
    });

    ////////////////////////////////////////////////////////////////////////////

    (function _getPersonGenders() {
      $http.get('api/dict/person-genders').then((res) => {
        if (res.status === 200) {
          Object.assign(_genders, res.data)
          return _genders
        }
      }, (err) => {
        console.error(err)
      });
    })();

    (function _getPersons() {
      $http.get(`api/persons/`).then((res) => {
        if (res.status === 200) {
          Object.assign(_persons, res.data)
          return _persons
        }
      }, (err) => {
        console.error(err)
      })
    })()

    ////////////////////////////////////////////////////////////////////////////

    this.getPersons = () => {
      return _persons
    }

    this.getPersonByID = (id) => {
      for (let i in _persons) {
        if (_persons[i].id === id) {
          return _persons[i];
        }
      }
    }

    this.createPerson = (person) => {
      return $http.post('/api/persons', person).then((res) => {
        return res.status;
      }, (err) => {
        console.error(err);
        return res.data;
      });
    }

    this.updatePerson = (person) => {
      return $http.put(`/api/persons/${person.id}`, person).then(res => {
        if (res.status === 200) {
          return res.status;
        }
      }, (err) => {
        console.error(err);
        return res.data;
      });
    }

    this.deletePerson = (id) => {
      $http.delete(`/api/persons/${id}`).then((res) => {
        if (res.status === 200) {
          for (let i in _persons) {
            if (_persons[i].id === res.data.id) {
              _persons[i] = res.data;
              break;
            }
          }
        } else {
          console.error(res);
        }
      }, (err) => {
        console.error(err);
      });
    }

    this.restorePerson = (id) => {
      $http.options(`/api/persons/${id}`).then((res) => {
        if (res.status === 200) {
          for (let i in _persons) {
            if (_persons[i].id === res.data.id) {
              _persons[i] = res.data;
              break;
            }
          }
        } else {
          console.error(res);
        }
      }, (err) => {
        console.error(err);
      });
    }

    ////////////////////////////////////////////////////////////////////////////

    function _getPersonByID(id) {
      $http.get(`api/persons/${id}`).then((res) => {
        if (res.status === 200) _persons.push(res.data);
      }, (err) => {
        console.error(err);
      });
    }
  }

})();