class Task {
  constructor() {
    this.id = 0;
    this.title = 'no title';
    this.assignedTo = null;
    this.state = 1;
    this.imgUrl = null;
    this.editing = true;
  }

  fromData(data) {
    this.id = data.id;
    this.title = data.title;
    this.assignedTo = data.assignedTo;
    this.state = data.state;
    this.imgUrl = data.imgUrl;
    this.editing = false;
  }
}

export default Task;
