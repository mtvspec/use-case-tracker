(function () {
  'use strict';
  
  app.factory('PersonAPI', function ($http, socket) {
    
    let persons = [];
    
    let genders = [];
    
    socket.on('createdPersonID', (personID) => {
      _getPersonByID(personID);
    });
    
    socket.on('updatedPersonID', (personID) => {
      $http({
        url: `api/persons/${personID}`,
        method: 'GET'
      }).then((response) => {
        let updated = false;
        if (response.status === 200) {
          for (let i in persons) {
            if (persons[i].id === personID) {
              updated = true;
              persons[i] = response.data;
            }
          }
          if (updated === false) persons.push(response.data);
        }
      }, (response) => {
        console.error(response);
      });
    });

    socket.on('deletedPersonID', (personID) => {
      let updated = false;
      for (let i in persons) {
        if (persons[i].id === personID) {
          updated = true;
          persons[i].isDeleted = true;
          break;
        }
      }
      if (updated === false) {
        _getPersonByID(personID);
      }
    });
    
    socket.on('restoredPersonID', (personID) => {
      let updated = false;
      for (let i in persons) {
        if (persons[i].id === personID) {
          updated = true;
          persons[i].isDeleted = false;
          break;
        }
      }
      if (updated === false) {
        _getPersonByID(personID);
      }
    });
    
    (function _getPersons() {
      $http({
        url: `api/persons/`,
        method: 'GET'
      }).then((response) => {
        if (response.status === 200) {
          for (let i in response.data) {
            persons.push(response.data[i]);
          }
        }
      }, (response) => {
        console.error(response);
      })
    })();
    
    function _getPersonByID(personID) {
      $http({
        url: `api/persons/${personID}`,
        method: 'GET'
      }).then((response) => {
        if (response.status === 200) persons.push(response.data);
      }, (response) => {
        console.error(response);
      })
    }
    
    (function _getPersonGenders() {
      $http({
        url: 'api/dict/person-genders',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          for (let i in response.data)
          genders.push(response.data[i]);
          return genders;
        }
      }, function (response) {
        console.error(response);
      });
    })();
    
    return {
      persons: persons,
      genders: genders,
      getPersonByID(personID) {
        for (let i in persons) {
          if (persons[i].id === personID) {
            return persons[i];
          }
        }
      },
      getPersons: function (cb) {
        return cb(persons);
      },
      getPersonGenders: function (cb) {
        return cb(genders);
      },
      createPerson: function (person) {
        $http({
          url: '/api/persons',
          method: 'POST',
          data: person
        }).then(function (response) {
          if (response.status === 201) {
            person.id = response.data.id;
            persons.push(person);
          }
        }, function (response) {
          console.error(response);
        })
      },
      updatePerson: function (person, cb) {
        $http({
          url: `/api/persons/${person.id}`,
          method: 'PUT',
          data: person
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in persons) {
              if (persons[i].id === response.data.id) {
                persons[i] = response.data;
              }
            }
          }
          return cb(response);
        }, function (response) {
          console.error(response);
          return cb(response);
        });
      },
      deletePerson: function (personID) {
        $http({
          url: `/api/persons/${personID}`,
          method: 'DELETE'
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in persons) {
              if (persons[i].id === response.data.id) {
                persons[i] = response.data;
                break;
              }
            }
          } else {
            console.error(response);
          }
        }, function (response) {
          console.error(response);
        });
      },
      restorePerson: function (personID) {
        $http({
          url: `/api/persons/${personID}`,
          method: 'OPTIONS'
        }).then(function (response) {
          if (response.status === 200) {
            for (let i in persons) {
              if (persons[i].id === response.data.id) {
                persons[i] = response.data;
                break;
              }
            }
          } else {
            console.error(response);
          }
        }, function (response) {
          console.error(response);
        });
      }
    }
    
  });
  
})();