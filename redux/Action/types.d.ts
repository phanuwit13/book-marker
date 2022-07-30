import { Action as ReduxAction } from 'redux'

export default interface IAction<T> extends ReduxAction {
  payload?: T
}
