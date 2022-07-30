import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from 'redux/Reducers'

export default function configStore() {
  let middleWares = []
  if (process.env.REACT_APP_RUN_ON === 'production') {
    middleWares = [thunkMiddleware]
  } else {
    middleWares = [thunkMiddleware, createLogger()]
  }

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleWares))
  )

  return store
}
