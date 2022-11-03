import cardState from '@/constants/cardState';
import Column from './Column';

class Columns {
  constructor() {
    this.columns = [];
  }

  fromData(data) {
    const newTasks = data.filter((t) => t.state === cardState.NEW);
    const activeTasks = data.filter((t) => t.state === cardState.ACTIVE);
    const toTestTasks = data.filter((t) => t.state === cardState.TO_TEST);
    const completedTasks = data.filter((t) => t.state === cardState.COMPLETED);

    const buildColumns = [
      { tasks: newTasks, title: 'New', id: cardState.NEW },
      { tasks: activeTasks, title: 'Active', id: cardState.ACTIVE },
      { tasks: toTestTasks, title: 'To Test', id: cardState.TO_TEST },
      { tasks: completedTasks, title: 'Completed', id: cardState.COMPLETED },
    ];

    this.columns = buildColumns.map((c) => {
      const column = new Column();
      column.fromData(c.tasks, c.title, c.id);
      return column;
    });
  }
}

export default Columns;
