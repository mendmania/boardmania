import Dashboard from '@/models/dashboard/Dashboard';
import Task from '@/models/task/Task';

export default {
  SET_IS_LOADING(state, data) {
    state.isLoading = data;
  },
  SET_DASHBOARD_COLUMNS(state, data) {
    const dashboard = new Dashboard();
    dashboard.fromData(data);
    state.dashboard = dashboard;
  },
  SET_TASK_TO_NEW_STATE(state, data) {
    const indexFound = state.dashboard.columns.columns[data.state - 1].tasks.findIndex(
      (v) => v.id === data.id,
    );

    if (indexFound > -1) {
      state.dashboard.columns.columns[data.state - 1].tasks[indexFound].state = data.state;
    }
  },
  SET_NEW_TASK_TO_COLUMN(state) {
    const task = new Task();
    state.dashboard.columns.columns[0].tasks.unshift(task);
  },
  REMOVE_FIRST_NEW_TASK_COLUMN_NEW(state) {
    state.dashboard.columns.columns[0].tasks.splice(0, 1);
  },
  UPDATE_EDITING_ON_ADD_NEW_TASK(state, data) {
    state.dashboard.columns.columns[0].tasks.splice(0, 1);
    state.dashboard.columns.columns[0].tasks.unshift(data);
  },
  SET_TASK_DETAILS_BY_ID(state, data) {
    const taskDetails = new Task();
    taskDetails.fromData(data);
    state.taskDetails = taskDetails;
  },
};
