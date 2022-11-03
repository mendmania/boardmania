import Task from '../task/Task';

class Column {
  constructor() {
    this.id = 0;
    this.title = null;
    this.tasks = [];
  }

  fromData(data, title, id) {
    this.title = title;
    this.id = id;

    this.tasks = data.map((t) => {
      const task = new Task();
      task.fromData(t);
      return task;
    });
  }
}

export default Column;
