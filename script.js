const errorInputBacklog = document.getElementById('errorInputBacklog');
const errorInputTodo = document.getElementById('errorInputTodo');
const errorInputDoing = document.getElementById('errorInputDoing');
const errorInputDone = document.getElementById('errorInputDone');
const inputTodo = document.getElementById('inputTodo');
const inputBacklog = document.getElementById('inputBacklog');
const inputDoing = document.getElementById('inputDoing');
const inputDone = document.getElementById('inputDone');
const btnBacklog = document.querySelector('.backlog button');
const btnTodo = document.querySelector('.todo button');
const btnDoing = document.querySelector('.doing button');
const btnDone = document.querySelector('.done button');
const doingElement = document.querySelector('div.doing-list');
const backlogElement = document.querySelector('div.backlog-list');
const todoElement = document.querySelector('div.todo-list');
const doneElement = document.querySelector('div.done-list');

let indexBacklogEdit = -1;
let indexTodoEdit = -1;
let indexDoingEdit = -1;
let indexDoneEdit = -1;

let listBacklog = [
	'Lập kế hoạch 1',
	'Lập kế hoạch 2',
	'Lập kế hoạch 3',
	'Lập kế hoạch 4',
];
let listTodo = ['Học toán 1', 'Học toán 2', 'Học toán 3', 'Học toán 4'];
let listDoing = [
	'Làm bài tập 1',
	'Làm bài tập 2',
	'Làm bài tập 3',
	'Làm bài tập 4',
];
let listDone = [
	'Lên kế hoạch 1',
	'Lên kế hoạch 2',
	'Lên kế hoạch 3',
	'Lên kế hoạch 4',
];

function renderBoard() {
	renderBacklog();
	renderTodo();
	renderDoing();
	renderDone();
}
renderBoard();

function renderBacklog() {
	let html = '';

	for (let i = 0; i < listBacklog.length; i++) {
		const backlog = listBacklog[i];
		html += `
      <div class="backlog-item d-flex justify-content-between">
        <div>
          <span>${backlog}</span>
        </div>
        <div>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit(${i}, 'backlog')"></i>
          <i class="fa fa-trash-o" aria-hidden="true" onclick="remove(${i}, 'backlog')"></i>
          <i class="fa fa-caret-right" aria-hidden="true" onclick="move(${i}, 'backlog', 'todo')"></i>
        </div>
      </div>
    `;
	}

	backlogElement.innerHTML = html;
}

function renderTodo() {
	let html = '';

	for (let i = 0; i < listTodo.length; i++) {
		const todo = listTodo[i];
		html += `
      <div class="todo-item d-flex justify-content-between">
        <div>
          <i class="fa fa-caret-left" aria-hidden="true" onclick="move(${i}, 'todo', 'backlog')"></i>
          <span>${todo}</span>
        </div>
        <div>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit(${i}, 'todo')"></i>
          <i class="fa fa-trash-o" aria-hidden="true" onclick="remove(${i}, 'todo')"></i>
          <i class="fa fa-caret-right" aria-hidden="true" onclick="move(${i}, 'todo', 'doing')"></i>
        </div>
      </div>
    `;
	}

	todoElement.innerHTML = html;
}

function renderDoing() {
	let html = '';

	for (let i = 0; i < listDoing.length; i++) {
		const doing = listDoing[i];
		html += `
      <div class="doing-item d-flex justify-content-between">
        <div>
          <i class="fa fa-caret-left" aria-hidden="true" onclick="move(${i}, 'doing', 'todo')"></i>
          <span>${doing}</span>
        </div>
        <div>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit(${i}, 'doing')"></i>
          <i class="fa fa-trash-o" aria-hidden="true" onclick="remove(${i}, 'doing')"></i>
          <i class="fa fa-caret-right" aria-hidden="true" onclick="move(${i}, 'doing', 'done')"></i>
        </div>
      </div>
    `;
	}

	doingElement.innerHTML = html;
}

function renderDone() {
	let html = '';

	for (let i = 0; i < listDone.length; i++) {
		const done = listDone[i];
		html += `
      <div class="done-item d-flex justify-content-between">
        <div>
          <i class="fa fa-caret-left" aria-hidden="true" onclick="move(${i}, 'done', 'doing')"></i>
          <span>${done}</span>
        </div>
        <div>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit(${i}, 'done')"></i>
          <i class="fa fa-trash-o" aria-hidden="true" onclick="remove(${i}, 'done')"></i>
        </div>
      </div>
    `;
	}

	doneElement.innerHTML = html;
}

function addTask(type) {
	switch (type) {
		case 'backlog':
			if (!inputBacklog.value) {
				errorInputBacklog.innerText = 'Trường này không được bỏ trống';
				errorInputBacklog.classList.remove('d-none');
				return;
			}

			if (indexBacklogEdit >= 0) {
				listBacklog[indexBacklogEdit] = inputBacklog.value;
				btnBacklog.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
				indexBacklogEdit = -1;
			} else {
				listBacklog.push(inputBacklog.value);
			}

			inputBacklog.value = '';
			renderBacklog();
			break;
		case 'todo':
			if (!inputTodo.value) {
				errorInputTodo.innerText = 'Trường này không được bỏ trống';
				errorInputTodo.classList.remove('d-none');
				return;
			}

			if (indexTodoEdit >= 0) {
				listTodo[indexTodoEdit] = inputTodo.value;
				btnBacklog.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
				indexTodoEdit = -1;
			} else {
				console.log(inputTodo.value);
				listTodo.push(inputTodo.value);
			}

			inputTodo.value = '';
			renderTodo();
			break;
		case 'doing':
			if (!inputDoing.value) {
				errorInputDoing.innerText = 'Trường này không được bỏ trống';
				errorInputDoing.classList.remove('d-none');
				return;
			}

			if (indexDoingEdit >= 0) {
				listDoing[indexDoingEdit] = inputDoing.value;
				btnBacklog.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
				indexDoingEdit = -1;
			} else {
				listDoing.push(inputDoing.value);
			}

			inputDoing.value = '';
			renderDoing();
			break;
		case 'done':
			if (!inputDone.value) {
				errorInputDone.innerText = 'Trường này không được bỏ trống';
				errorInputDone.classList.remove('d-none');
				return;
			}

			if (indexDoneEdit >= 0) {
				listDone[indexDoneEdit] = inputDone.value;
				btnBacklog.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
				indexDoneEdit = -1;
			} else {
				listDone.push(inputDone.value);
			}

			inputDone.value = '';
			renderDone();
			break;
		default:
			break;
	}
}

function edit(index, type) {
	switch (type) {
		case 'backlog':
			let backlog = listBacklog[index];
			indexBacklogEdit = index;
			inputBacklog.value = backlog;
			btnBacklog.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';
			break;
		case 'todo':
			let todo = listTodo[index];
			indexTodoEdit = index;
			inputTodo.value = todo;
			btnTodo.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';
			break;
		case 'doing':
			let doing = listDoing[index];
			indexDoingEdit = index;
			inputDoing.value = doing;
			btnDoing.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';
			break;
		case 'done':
			let done = listDone[index];
			indexDoneEdit = index;
			inputDone.value = done;
			btnDone.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';
			break;
	}
}

function remove(index, type) {
	let task = '';
	switch (type) {
		case 'backlog':
			if (index === indexBacklogEdit) return;
			task = listBacklog.splice(index, 1);
			renderBacklog();
			break;
		case 'todo':
			if (index === indexTodoEdit) return;
			task = listTodo.splice(index, 1);
			renderTodo();
			break;
		case 'doing':
			if (index === indexDoingEdit) return;
			task = listDoing.splice(index, 1);
			renderDoing();
			break;
		case 'done':
			if (index === indexDoneEdit) return;
			task = listDone.splice(index, 1);
			renderDone();
			break;
	}
	return task;
}

function move(index, from, to) {
	let task = remove(index, from);

	switch (to) {
		case 'backlog':
			listBacklog.push(task);
			renderBacklog();
			break;
		case 'todo':
			listTodo.push(task);
			renderTodo();
			break;
		case 'doing':
			listDoing.push(task);
			renderDoing();
			break;
		case 'done':
			listDone.push(task);
			renderDone();
			break;
	}
}
