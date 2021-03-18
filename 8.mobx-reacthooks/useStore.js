import React from 'react';
import { storeContext } from './Context';

// context api로 묶어주기 위해서 씀.. app 컴포넌트와 묶어주기 위함...
function useStore() {
  const { userStore, postStore } = React.useContext(storeContext);

  return { useStore, postStore};
}

export default useStore;