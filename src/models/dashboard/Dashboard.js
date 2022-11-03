import Columns from '../column/Columns';

class Dashboard {
  constructor() {
    this.columns = [];
  }

  fromData(data) {
    const columns = new Columns();
    columns.fromData(data);
    this.columns = columns;
  }
}

export default Dashboard;
