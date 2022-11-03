import { createStore } from 'vuex';
import moduleDashboard from './dashboard/moduleDashboard';
import moduleLoading from './loading/moduleLoading';

export default createStore({
  modules: {
    moduleDashboard,
    moduleLoading,
  },
});
