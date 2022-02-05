import once from 'lodash/once';

import AuthStore from './AuthStore';
import ViewModeStore from './ViewModeStore';

const VIEWMODESTORE = 'ViewModeStore';
const AUTHSTORE = 'AuthStore';

export const STORE_KEYS = {
  AUTHSTORE,
  VIEWMODESTORE,
};

export default once(() => {
  const authStore = AuthStore();
  const viewModeStore = ViewModeStore();

  return {
    [STORE_KEYS.AUTHSTORE]: authStore,
    [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
  };
});
