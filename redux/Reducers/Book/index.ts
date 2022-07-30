// Constants
import {
  ADD_BOOK_LIST_SUCCESS,
  BOOK_LIST_CLEAR,
} from 'redux/Constants/Book/Add'
import { UPDATE_BOOK_LIST_SUCCESS } from 'redux/Constants/Book/Update'
import { DELETE_BOOK_LIST_SUCCESS } from 'redux/Constants/Book/Delete'

// Props Types
import IAction from 'redux/Action/types'
import reduxBookListTypes from 'redux/Reducers/Book/types'

const bookList = (
  state: object = {},
  action: IAction<reduxBookListTypes.Props>
) => {
  switch (action.type) {
    case ADD_BOOK_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        type: action.type,
      }
    case DELETE_BOOK_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        type: action.type,
      }
    case UPDATE_BOOK_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        type: action.type,
      }

    case BOOK_LIST_CLEAR:
      return {
        ...state,
        ...action.payload,
        type: action.type,
      }
    default:
      return state
  }
}

export default bookList
