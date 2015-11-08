angular.module('starter.controllers', [])


.controller('TodolistCtrl', function ($scope, $stateParams, localStorageService, $cordovaVibration, $cordovaLocalNotification,TodoService) {

    var listID = ($stateParams.todolistId);
    $scope.items = TodoService.getOneTodolist(listID);
    $scope.todolists=TodoService.getAll();

    var vibrateOn = localStorageService.get("vibrate");
    var notificationOn = localStorageService.get("notify");

    $scope.clearAll = function () {
        $scope.items = [];
        TodoService.setTodolist(listID,this.items);
    }

    $scope.addItem = function (todoItem) {
        var listItem = {};
        listItem.title = todoItem;
        listItem.checked = false;
        this.items.push(listItem);
        TodoService.addItemInTodolist(listID,listItem);
        this.todoItem = "";
    }

    //    $scope.shouldShowDelete = false;
    //    $scope.listCanSwipe = true;



    $scope.remove = function (item) {
        var itemindex = this.items.indexOf(item);
        this.items.splice(itemindex, 1);
        TodoService.setTodolist(listID,this.items);
    }



    $scope.checkItem = function (item) {
        var itemindex = this.items.indexOf(item);
        if(!itemindex<0){
            this.items[itemindex] = item;
        }
        TodoService.setTodolist(listID,this.items);
        if (item.checked && vibrateOn) { 
            $cordovaVibration.vibrate(200);
        }
        scheduleSingleNotification();
    }

    var notificationOn = localStorageService.get("notify");


    var scheduleSingleNotification = function () {
        if(!notificationOn)return;
        for (var i = 0; i < $scope.items.length; i++) {
            if(!$scope.items[i].checked){
                return;
            }
        }
        $cordovaLocalNotification.schedule({
            id: listID,
            message: "Your to do list is Done!",
            title: "Congratulations!",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };



})



.controller('SettingController', function ($scope, localStorageService) {
    $scope.isVibrate = localStorageService.get("vibrate") || true;
    $scope.isNotify = localStorageService.get("notify")|| true;

    $scope.settingChanged = function () {
        localStorageService.set("notify", this.isNotify);
        localStorageService.set("vibrate", this.isVibrate);
    };

});