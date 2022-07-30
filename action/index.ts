import { Dispatch } from 'redux'

// Redux Constants
import {
  ADD_BOOK_LIST_SUCCESS,
  BOOK_LIST_CLEAR,
} from 'redux/Constants/Book/Add'
import {
  DELETE_BOOK_LIST_SUCCESS,
} from 'redux/Constants/Book/Delete'
import {
  UPDATE_BOOK_LIST_SUCCESS
} from 'redux/Constants/Book/Update'

//type
import reduxBookListTypes from 'redux/Reducers/Book/types'

const action = {
  AddBookList:
    (newBook: reduxBookListTypes.Book) =>
    async (dispatch: Dispatch, getState: Function) => {
      let currentList = getState().bookList?.list
        ? [...getState().bookList?.list]
        : []

      currentList.push(newBook)
      let payload = {
        list: currentList,
      }

      dispatch({
        type: ADD_BOOK_LIST_SUCCESS,
        payload,
      })
    },
    DeleteBookList:
    (index: number) =>
    async (dispatch: Dispatch, getState: Function) => {
      let currentList = getState().bookList?.list
        ? [...getState().bookList?.list]
        : []
      currentList.splice(index, 1)
      let payload = {
        list: currentList,
      }

      dispatch({
        type: DELETE_BOOK_LIST_SUCCESS,
        payload,
      })
    },
    UpdateBookList:
    (newBook: reduxBookListTypes.Book,index:number) =>
    async (dispatch: Dispatch, getState: Function) => {
      let currentList = getState().bookList?.list
        ? [...getState().bookList?.list]
        : []
      currentList[index] = {...newBook}
      let payload = {
        list: currentList,
      }

      dispatch({
        type: UPDATE_BOOK_LIST_SUCCESS,
        payload,
      })
    },
}

export default action
