import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
    })
    : compose;

const configureStore = () =>  createStore(
    rootReducer,
    composeEnhancers(...enhancers)
);

type StoreType = ReturnType<typeof configureStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default configureStore;