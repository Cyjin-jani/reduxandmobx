import React from 'react';
import { storeContext } from './Context';
import { userStore, postStore } from './store';


// context api로 묶어주기 위해서 씀.. app 컴포넌트와 묶어주기 위함...
function useStore() {
  // const { userStore, postStore } = React.useContext(storeContext);

  return { userStore, postStore};
}

export default useStore;