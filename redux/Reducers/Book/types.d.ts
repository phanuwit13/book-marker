declare namespace reduxBookListTypes {
  export interface Book {
    bookName: string
    authorName: string
    finishDate: string
    durationTime: string
    coverImage: string
  }

  export interface BookList {
    type: string
    list: Book[]
  }

  interface Props {
    bookList?: BookList
  }
}

export default reduxBookListTypes
