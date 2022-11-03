export default {
  getEventsToListen: (state) => (searchTerm) => {
    if (!searchTerm) {
      return state.events;
    }

    return [];
  },
};
