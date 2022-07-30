import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Text, Input, Col, Image } from '@nextui-org/react'
import action from 'action'
import Swal from 'sweetalert2'

import { BOOK_LIST_CLEAR } from 'redux/Constants/Book/Add'

import { UPDATE_BOOK_LIST_SUCCESS } from 'redux/Constants/Book/Update'

//type
import reduxBookListTypes from 'redux/Reducers/Book/types'
import storeTypes from 'redux/types'

const ModalEditBook = ({
  visible,
  closeHandler,
}: {
  visible: { item: reduxBookListTypes.Book; index: number } | null
  closeHandler: () => void
}) => {
  const dispatch = useDispatch()
  const eventDetail = useSelector((state: storeTypes.Props) => state.bookList)

  const [bookName, setBookName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [finishDate, setFinishDate] = useState('')
  const [durationTime, setDurationTime] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const validateAddBook = () => {
    return (
      !bookName || !authorName || !finishDate || !durationTime || !coverImage
    )
  }

  const editBookList = () => {
    if (visible) {
      let bookData = {
        bookName,
        authorName,
        finishDate,
        durationTime,
        coverImage,
      }
      dispatch(action.UpdateBookList(bookData, visible.index))
    }
  }

  const renderImage = useMemo(() => {
    return (
      <Image
        showSkeleton
        src={
          coverImage ||
          'https://tuambassador.org/wp-content/uploads/2019/06/no-image.jpg'
        }
        objectFit='cover'
        alt='Default Image'
        width='80%'
        height={240}
        css={{ borderRadius: '12px' }}
      />
    )
  }, [coverImage])

  useEffect(() => {
    if (visible) {
      setBookName(visible.item.bookName)
      setAuthorName(visible.item.authorName)
      setCoverImage(visible.item.coverImage)
      setDurationTime(visible.item.durationTime)
      setFinishDate(visible.item.finishDate)
    }
  }, [visible])

  useEffect(() => {
    if (eventDetail.type === UPDATE_BOOK_LIST_SUCCESS) {
      Swal.fire('', 'Update book list successfully!', 'success').then(()=>{
        dispatch({
          type: BOOK_LIST_CLEAR,
        })
        closeHandler()
      })
     
    }
  }, [eventDetail])

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible ? true : false}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text b id='modal-title' size={18}>
          Edit Book List
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div>
          {renderImage}
          <Col
            css={{
              mt: '20px',
              d: 'grid',
              gridTemplateColumns: '1fr 1fr',
              flexDirection: 'row',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <Input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              id='bookName'
              animated={false}
              label='Book Name'
              placeholder='ex. How Beautiful We Were'
            />
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              id='authorName'
              animated={false}
              label='Author Name'
              placeholder='ex. Imbolo Mbue'
            />
            <Input
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              id='finish'
              animated={false}
              type='date'
              label='Finish Reading'
            />
            <Input
              value={durationTime}
              onChange={(e) => setDurationTime(e.target.value)}
              id='duration'
              animated={false}
              label='Duration'
              placeholder='ex. 2 Weeks'
            />
            <Input
              id='Cover'
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              css={{ gridColumn: 'span 2' }}
              animated={false}
              label='Book Cover'
              placeholder='ex. https://example/image/public.jepg'
            />
          </Col>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='error' onClick={closeHandler}>
          Close
        </Button>
        <Button onClick={editBookList} disabled={validateAddBook()}>
          Confirm Edit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditBook
