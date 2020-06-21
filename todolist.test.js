/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns an array', () => {
    expect(Array.isArray(list.toArray())).toBeTruthy();
  });

  test('first returns the first todo in todolist', () => {
    expect(list.first()).toBe(todo1);
  });

  test('last returns the last todo item in todolist', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns the first todo in todolist', () => {
    let item = list.shift();
    expect(item).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns the last todo in todolist', () => {
    let item = list.pop();
    expect(item).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true when all items are done, false otherwise', () => {
    expect(list.isDone()).not.toBeTruthy();
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();
  });

  test('throws TypeError when attempting to add item that is not Todo', () => {
    expect(() => list.add('todo')).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add(new TodoList())).toThrow(TypeError);
  });

  test('itemAt returns the todo at index', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('markDoneAt sets the done property of todo at index to true', () => {
    list.markDoneAt(1);
    expect(list.itemAt(1).isDone()).toBeTruthy();
    expect(list.itemAt(0).isDone()).not.toBeTruthy();
    expect(list.itemAt(2).isDone()).not.toBeTruthy();
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  });

  test('markUndoneAt sets done property of todo at index to false', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);

    list.markAllDone();
    list.markUndoneAt(1);
    list.markUndoneAt(2);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(false);
    expect(list.itemAt(2).isDone()).toBe(false);
  });

  test('markAllDone sets done property of all todos to true', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBeTruthy();
    expect(todo2.isDone()).toBeTruthy();
    expect(todo3.isDone()).toBeTruthy();
    expect(list.isDone()).toBeTruthy();
  });

  test('removeAt removes todo at given index', () => {
    expect(() => list.removeAt(9)).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list).not.toContain(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns different string when a todo is marked done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  test('toString returns string marking when all todos are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

  list.markAllDone();
  expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all elements in todolist', () => {
    list.forEach((todo) => todo.markDone());
    expect(list.isDone()).toBeTruthy();
  });

  test('filter returns a new TodoList', () => {
    list.markDoneAt(1);

    let filteredList = list.filter((todo) => todo.isDone());
    expect(filteredList).not.toEqual(list);
    expect(filteredList.toArray()).toEqual([todo2]);
  });

  test('getTitle returns the title of a todo', () => {
    expect(list.itemAt(0).getTitle()).toBe('Buy milk');
  });

  test('findByTitle returns the todo with a given title', () => {
    expect(list.findByTitle('Go to the gym')).toEqual(todo3);
  });

  test('markDone sets the property done of todo by title to true', () => {
    list.markDone('Buy milk');
    expect(list.findByTitle('Buy milk').isDone()).toBeTruthy();

    list.markDone('Buy milksf');
    expect(list.findByTitle('Buy milksf')).toBeUndefined();
  });

  test('markAllUndone sets the property done of all todo items to false', () => {
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();

    list.markAllUndone();
    expect(list.filter(todo => !todo.isDone()).toArray())
      .toEqual([todo1, todo2, todo3]);
  });

  test('allDone returns a todolist with all items marked done', () => {
    list.markDoneAt(1);
    list.markDoneAt(2);

    let doneList = list.allDone();
    expect(doneList.toArray()).toEqual([todo2, todo3]);
  });

  test('allNotDone returns a todolist with all items marked not done', () => {
    list.markDoneAt(1);
    list.markDoneAt(2);

    let notDoneList = list.allNotDone();
    expect(notDoneList.toArray()).toEqual([todo1]);
  });
});