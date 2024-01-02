/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addToDom.js":
/*!*************************!*\
  !*** ./src/addToDom.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToDotoDom: () => (/* binding */ addToDotoDom),
/* harmony export */   cleartodos: () => (/* binding */ cleartodos),
/* harmony export */   "default": () => (/* binding */ addProjectToDom),
/* harmony export */   renderTodos: () => (/* binding */ renderTodos),
/* harmony export */   updateViewForInboxes: () => (/* binding */ updateViewForInboxes),
/* harmony export */   updateViewPortHeading: () => (/* binding */ updateViewPortHeading)
/* harmony export */ });
function addProjectToDom(parentName, className, type, id, text) {
  const element = document.createElement(type);
  const parent = document.querySelector(parentName);
  element.classList.add(className);
  element.id = id;
  parent.appendChild(element);
  element.textContent = text;
}

function updateViewPortHeading(index) {
  const viewport = document.querySelector(".viewport");
  const heading = document.querySelector(".viewport h3");
  viewport.classList.remove("hidden");
  const todoBtn = document.querySelector("#display-todo");
  todoBtn.classList.remove("hidden");
  const projectHeading = document.getElementById(index);
  heading.textContent = projectHeading.textContent;
}

function addToDotoDom(parentName, className, type) {
  const element = document.createElement(type);
  const parent = document.querySelector(parentName);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
}

function updateViewForInboxes(title) {
  const viewport = document.querySelector(".viewport");
  const heading = document.querySelector(".viewport h3");
  viewport.classList.remove("hidden");
  heading.textContent = title;
  const todoBtn = document.querySelector("#display-todo");
  todoBtn.classList.add("hidden");
}

function renderTodos({ title, description, dueDate, priority } = todo) {
  const todo = addToDotoDom(".todos-container", "todo", "div");
  todo.innerHTML = `
    <div class="todocardbtn">
    <i class="fa fa-trash" aria-hidden="true"></i>
    <i class="fa fa-pencil" aria-hidden="true"></i>
    </div> 
    <h3>${title}</h3>
  <p>${description}</p>
      <div class="duedate">Due-date: ${dueDate}</div>
      <div> ${priority}</div>
      `;
}

function cleartodos() {
  const todos = document.querySelector(".todos-container");
  todos.innerHTML = "";
}




/***/ }),

/***/ "./src/createProjects.js":
/*!*******************************!*\
  !*** ./src/createProjects.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkForEventListeners)
/* harmony export */ });
/* harmony import */ var _createTodos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTodos.js */ "./src/createTodos.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.js */ "./src/form.js");
/* harmony import */ var _addToDom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addToDom.js */ "./src/addToDom.js");





const displayProjectBtn = document.querySelector(".projects .btn");
const addProjectBtn = document.querySelector(".project-form #add");
const displayTodoBtn = document.querySelector("#display-todo");
const addTodoBtn = document.querySelector(".todo-form #add");
const projectsContainer = document.querySelector(".projects-container");
const alltasks = document.querySelector("#all-tasks")
const cancelProject = document.querySelector('.project-form #cancel');
const cancelTodo = document.querySelector('.todo-form #cancel');

const projectForm = (0,_form_js__WEBPACK_IMPORTED_MODULE_1__.ProjectForm)();
const todoForm = (0,_form_js__WEBPACK_IMPORTED_MODULE_1__.TodoForm)();
const projectslist = [];

function checkForEventListeners() {
  displayProjectBtn.addEventListener("click", function () {
    projectForm.display();
  });

  displayTodoBtn.addEventListener("click", function () {
    todoForm.display();
  });

  addProjectBtn.addEventListener("click", function () {
    const index = createProject(projectForm.getData());
    updateActiveStatusForProjects(index);
    projectForm.clearData();
    projectForm.hide();
    checkForProjectEventListeners();
  });

  addTodoBtn.addEventListener("click", function () {
    addTodotoProjects();
    updateViewPortContent();
    todoForm.clearData();
    todoForm.hide();
  });

  alltasks.addEventListener( "click", function(){
    (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.updateViewForInboxes)("All-Tasks");
    updateActiveStatusForInbox("all-tasks");
    (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.cleartodos)();
    allTasksInbox();
  });

  cancelProject.addEventListener( "click", function (){
    projectForm.clearData();
    projectForm.hide();
  })

  cancelTodo.addEventListener ( "click", function () {
    todoForm.clearData();
    todoForm.hide();
  })

}

function checkForProjectEventListeners() {
  projectsContainer.querySelectorAll(".project-card").forEach((project) =>
    project.addEventListener("click", function (event) {
      (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.updateViewPortHeading)(event.target.id);
      if (
        event.target.classList.contains("project-card") &&
        event.target.getAttribute("status") !== "active"
      ) {
        event.target.setAttribute("status", "active");
        updateActiveStatusForProjects(event.target.id);
        updateViewPortContent();
      }
    })
  );
}


class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  setTodos([title, description, dueDate, priority] = data) {
    this.todos.push(new _createTodos_js__WEBPACK_IMPORTED_MODULE_0__["default"](title, description, dueDate, priority));
  }
}

//changing active status
function updateActiveStatusForProjects(id) {

  const active = document.querySelectorAll('[status = "active"]');
  active.forEach( element => element.setAttribute('status','passive'));

  const projects = document.querySelectorAll(".project-card");
  projects.forEach((project) => {
    if (project.id === id) {
      project.setAttribute("status", "active");
    } else {
      project.setAttribute("status", "passive");
    }
  });
}

function updateActiveStatusForInbox(id) {
  const active = document.querySelectorAll('[status = "active"');
  const element = document.querySelector(`#${id}`);
  active.forEach ( el => el.setAttribute('status','passive'))
  element.setAttribute('status', 'active');
}

//adding functions
function createProject(title) {
  const project = new Project(title);
  projectslist.push(project);
  (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
    ".projects-container",
    "project-card",
    "div",
    projectslist.length - 1,
    title
  );
  return projectslist.length - 1;
}

//rendering functions
function allTasksInbox() {
  projectslist.forEach((project) => {
    project.todos.forEach((todo) => (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.renderTodos)(todo));
  });
}

function addTodotoProjects() {
  const index = document.querySelector('.project-card[status="active"]').id;
  const project = projectslist[index];
  project.setTodos(todoForm.getData());
  projectslist[index] = project; //updating after setting the todos
}

function updateViewPortContent() {
  const index = document.querySelector('.project-card[status="active"]').id;
  const project = projectslist[index];
  (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.cleartodos)();
  renderEachProject(project);
}

function renderEachProject(project) {
  project.todos.forEach((todo) => (0,_addToDom_js__WEBPACK_IMPORTED_MODULE_2__.renderTodos)(todo));
}



/***/ }),

/***/ "./src/createTodos.js":
/*!****************************!*\
  !*** ./src/createTodos.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = (priority)? 'Important' : 'Not important';
    }
  }
  
  

/***/ }),

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectForm: () => (/* binding */ ProjectForm),
/* harmony export */   TodoForm: () => (/* binding */ TodoForm)
/* harmony export */ });

function ProjectForm() {
    const projectForm = document.querySelector(".project-form");
    const input = document.querySelector(".project-form input");
  
    function display() {
      projectForm.classList.remove("hidden");
    }
    function hide() {
      projectForm.classList.add("hidden");
    }
    function getData() {
      return input.value;
    }
    function clearData() {
      input.value = "";
    }
    return { display, hide, getData, clearData };
  }
  
  function TodoForm() {
    const dialog = document.querySelector('dialog');
    const title = document.querySelector(".todo-form #name");
    const date = document.querySelector(".todo-form #date");
    const impStatus = document.querySelector(".todo-form #checkbox");
    const description = document.querySelector(".todo-form textarea");
  
    function display() {
     dialog.showModal();
    }
    function hide() {
      dialog.close();
    }
    function getData() {
      return [title.value, description.value, date.value, impStatus.checked];
    }
    function clearData() {
      title.value = "";
      description.value = "";
      impStatus.checked = false;
    }
    return { display, hide, getData, clearData };
  }
  
  
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createProjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProjects */ "./src/createProjects.js");

(0,_createProjects__WEBPACK_IMPORTED_MODULE_0__["default"])();

//todos
/*
add icons to todolist
delete todolist
edit todolist
set todos as complete
*/
})();

/******/ })()
;
//# sourceMappingURL=main.js.map