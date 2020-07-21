import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "reducers";

import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults/index";
const reduxOfflineConfig = {
  detectNetwork: (callback) => {
    setInterval(async () => {
      try {
        await fetch("http://kaboom.rksv.net/api/ping", { method: "HEAD" });
        callback({
          online: true,
        });
      } catch (e) {
        callback({
          online: false,
        });
      }
    }, 2000);
  },
};

const followStatus = (status) => ({
  type: "KABOOM_API_STATUS_REQUEST",
  payload: { status },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: "http://kaboom.rksv.net/api/status",
        method: "POST",
        body: JSON.stringify({ status }),
      },
      // action to dispatch when effect succeeds:
      commit: { type: "KABOOM_API_COMMIT", meta: { status } },
      // action to dispatch if network action fails permanently:
      rollback: { type: "KABOOM_API_ROLLBACK", meta: { status } },
    },
  },
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
