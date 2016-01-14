(function() {
  
  //default list to be displayed if local storage is empty.

  var mainList = [{
    name: 'To-Do #1',
    completed: false
  }, {
    name: 'To-Do #2',
    completed: false
  }];

  // Put each controller in different js file.

  var app = angular.module('toDoList', ['ngStorage']);

  // Main item controller used for pulling items from the local storage list
  // as well as creating a new list.

  app.controller('ItemController', function($scope, $localStorage) {

    if (!$localStorage.list) {
      $localStorage.list = mainList;  //Pull from default list if local storage is empty.
      this.item = mainList;
    } else {
      mainList = $localStorage.list;
    }
    
    this.item = mainList;
    hide = 'no';
    this.newItem = {};
    $scope.numLists = [1];
    count = 2
    $scope.clearStorage = function() {
      delete $localStorage.list;
    }

    $scope.one = true;
    $scope.newList = function() {
      $scope.numLists.push(count);
        count++;
      }

    // Tab functions to filter completed tasks from non-completed.

    $scope.showAll = function() {
      $('.green').addClass('show');
      $('.clear').addClass('show');
      }

    $scope.showActive = function() {
      $('.green').removeClass('show');
      $('.clear').addClass('show');
      }

    $scope.showCompleted = function() {
      $('.green').addClass('show');
      $('.clear').removeClass('show');
      }

    // Menu animation

    $scope.openMenu = function() {
      $('.menu').toggleClass('open');
      }
    // Locally save if completed
  });

  // Controller used to add a new list item at the bottom of the list.

  app.controller('NewItemController', function($scope, $localStorage) {

    $scope.newItem = '';

    $scope.addItem = function() {
      $scope.items.item.push({
        name: $scope.newItem
      });

      $localStorage.list = $scope.items.item;
      $scope.newItem = '';
    }
  });

  // Controller used to edit an item of users choice.

  app.controller('EditItemController', function($scope, $localStorage){ 
    
    $scope.newText = '';

    $scope.showNew = function(){
      if ($scope.newText != '') {
        $scope.item.name = $scope.newText;

        $scope.newText = '';
      };
    };

    $scope.removeItem = function(index) {
      $localStorage.list.splice(index, 1);
    }
  });

  // Getting the current date to display the date for this "daily" to-do list.

  app.controller('DateController', function ($scope) {
    $scope.CurrentDate = new Date();
  });

})();









