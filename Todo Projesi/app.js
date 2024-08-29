let form = document.querySelector("#todoAddForm");
let input = document.querySelector("#todoName");
let addUl = document.querySelector(".list-group");
let firstCardBody = document.querySelectorAll(".card-body")[0];
let secondCardBody = document.querySelectorAll(".card-body")[1];
let clearButton = document.querySelector("#todoClearButton");
let filterİnput = document.querySelector("#todoSearch");

runEvents();
let todos = [];

//EVENTLER!
function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", remove);
    clearButton.addEventListener("click", removeAllTodos);
    filterİnput.addEventListener("keyup", filter);

}
//FILTRASIYA!
function filter(e) {

    let filterValue = e.target.value.toLowerCase().trim();
    let allFilterList = document.querySelectorAll(".list-group-item");
    if (allFilterList.length > 0) {
        allFilterList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display:block");

            }
            else {
                todo.setAttribute("style", "display:none  !important");
            }
        });


    }
    else {
        showAlert("warning", "Filtirasiya edecek Todo yoxdur!");
    }




}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todos) {
        addTodoUI(todos);
    });
}
//BUTUN TODOLARI SILME!
function removeAllTodos() {
    let todoList = document.querySelectorAll(".list-group-item");
    todoList.forEach(function (todo) {
        if (todoList.length > 0) {
            todo.remove();

//STORAGE-DEN BUTUN TODOLARI SILME
            todos = [];
            localStorage.setItem("todos", JSON.stringify(todos));
            showAlert("success", "Butun Todolar silindi.");
        }
        else {
            showAlert("danger", "Silinecek Todo Yoxdur!");

        }

    });
}
// X VASITESILE EKRANDAN TODO SILME
function remove(e) {
    if (e.target.className === "fa fa-remove") {
        let todo = e.target.parentElement.parentElement;
        todo.remove();


        removeTodoToStorage(todo.textContent);

    }
}
//STORAGE-DEN TODO SILME
function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    let inputText = input.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Bir Todo daxil edin!");

    }
    else {
        addTodoUI(inputText);
        addTodoStorage(inputText);
        showAlert("success", "Todo daxil edildi.");


    }
    e.preventDefault();

}
//EKRANA TODO DAXIL ETME
function addTodoUI(newTodo) {

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo;

    let a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item"

    let i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    addUl.appendChild(li);

    input.value = "";
}
//STORAGE-E TODO DAXIL ETME
function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))

}
//TODOLARIN YADDASDA OLDUGUNU YOXLAMA
function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
  //ALERT MESAJI CIXARTMA
function showAlert(type, message) {

    //     <div class="alert alert-success" role="alert">
    //   This is a success alert—check it out!
    // </div>

    let div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 1500);
}

