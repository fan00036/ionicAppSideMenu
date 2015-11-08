angular.module('starter')
.factory('TodoService', function TodoServiceFactory(localStorageService) {
  return {
    getAll : function()
    {
        var todolists = [
            {
                title: 'Todolist1',
                id: 1
            },
            {
                title: 'Todolist2',
                id: 2
            },
            {
                title: 'Todolist3',
                id: 3
            }
        ];
        return todolists;

    },
    getOneTodolist:function(listID){
        var todolist = localStorageService.get('localStorageTodoItems' + listID) || [];
        return todolist; 
    },
    setTodolist:function(listID,items){
        localStorageService.set("localStorageTodoItems" + listID, items);
    },
    clearTodolist:function(listID){
        localStorageService.set("localStorageTodoItems" + listID, items);
    },
    addItemInTodolist:function(listID,item){
        var todolist = localStorageService.get('localStorageTodoItems' + listID);
        todolist.push(item);
        localStorageService.set("localStorageTodoItems" + listID, todolist);
    },

//    
    checkItemInTodolist:function(listID,item){
        var todolist = localStorageService.get('localStorageTodoItems' + listID);
        var itemindex = todolist.indexOf(item);
        if(!itemindex<0){
            todolist[itemindex]=item;
            localStorageService.set("localStorageTodoItems" + listID, todolist);
        }
 
    } 
      
      
      
      
  }
  
  
  
});
