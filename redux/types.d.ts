import reduxBookListTypes from 'redux/Reducers/Book/types'

declare namespace storeTypes {
  interface Props {
    bookList: reduxBookListTypes.BookList
  }
}

export default storeTypes
