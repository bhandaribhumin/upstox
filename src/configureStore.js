import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "reducers";

import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults/index";
const reduxOfflineConfig = {
    ...,
    detectNetwork: callback => {
      setInterval(async () => {
        try {
          await fetch('yourbackend.com/ping', { method: 'HEAD' })
          callback({
            online: true
          })
        } catch(e) {
          callback({
            online: false
          })
        }
      }, 2000)
    },
  }

  const followUser = userId => ({
    type: 'FOLLOW_USER_REQUEST',
    payload: { userId },
    meta: {
      offline: {
        // the network action to execute:
        effect: { url: '/api/follow', method: 'POST', body: JSON.stringify({ userId }) },
        // action to dispatch when effect succeeds:
        commit: { type: 'FOLLOW_USER_COMMIT', meta: { userId } },
        // action to dispatch if network action fails permanently:
        rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { userId } }
      }
    }
  });
  
const persistConfig = {
  key: "root",
  storage,
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore,
} = createOffline({
  ...offlineConfig,
  persist: false,
});

const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(reducer)
);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(thunk, offlineMiddleware)
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
}
