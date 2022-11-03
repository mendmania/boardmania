import axios from '@/libs/axios';
import Task from '@/models/task/Task';

export default {
  getDashboard({ commit }) {
    commit('moduleLoading/SET_IS_LOADING', true, { root: true });
    return new Promise((resolve, reject) => {
      axios
        .get('tasks')
        .then((response) => {
          if (response) {
            commit('SET_DASHBOARD_COLUMNS', response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('moduleLoading/SET_IS_LOADING', false, { root: true });
        });
    });
  },
  postTaskByStatus({ commit }, data) {
    const newTask = new Task();
    newTask.title = data.title;
    newTask.assignedTo = data.assignedTo;
    newTask.editing = false;

    return new Promise((resolve, reject) => {
      axios
        .post('tasks', newTask, {
          config: {
            showToast: true,
            responseToast: {
              text: 'Added successfully',
              variant: 'success',
            },
          },
        })
        .then((response) => {
          if (response.data) {
            commit('UPDATE_EDITING_ON_ADD_NEW_TASK', response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  putTaskByStatusByColumn({ commit }, { data, newState }) {
    const updateTo = {
      ...data,
    };
    updateTo.state = newState;

    return new Promise((resolve, reject) => {
      axios
        .put(`tasks/${data.id}`, updateTo, {
          config: {
            showToast: true,
            responseToast: {
              text: 'Added successfully',
              variant: 'success',
            },
          },
        })
        .then((response) => {
          if (response.data) {
            commit('SET_TASK_TO_NEW_STATE', response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTaskById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`tasks/${id}`)
        .then((response) => {
          if (response) {
            commit('SET_TASK_DETAILS_BY_ID', response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  removeTaskById({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`tasks/${data}`, {
          config: {
            showToast: true,

            responseToast: {
              text: 'Successfully',
              variant: 'success',
            },
            errorToast: {
              text: 'Failed',
              variant: 'danger',
            },
          },
        })
        .then((response) => {
          commit('REMOVE_TASK_FROM_COLUMN', data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
