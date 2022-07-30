import type { NextPage } from 'next'
import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Input, Col, Container, Button } from '@nextui-org/react'
import Swal from 'sweetalert2'
import action from 'action'

import {
  ADD_BOOK_LIST_SUCCESS,
  BOOK_LIST_CLEAR,
} from 'redux/Constants/Book/Add'

//type
import storeTypes from 'redux/types'

const Home: NextPage = () => {
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

  const addBookList = () => {
    let bookData = {
      bookName,
      authorName,
      finishDate,
      durationTime,
      coverImage,
    }
    dispatch(action.AddBookList(bookData))
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
    if (eventDetail.type === ADD_BOOK_LIST_SUCCESS) {
      Swal.fire('', 'Add book list successfully!', 'success')
      dispatch({
        type: BOOK_LIST_CLEAR,
      })
    }
  }, [eventDetail])

  return (
    <Container css={{ paddingInline: '24px' }}>
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
        <Col
          css={{
            d: 'flex',
            mt: '10px',
            justifyContent: 'end',
            gridColumn: 'span 2',
          }}
        >
          <Button onClick={addBookList} disabled={validateAddBook()}>
            ADD BOOK LIST
          </Button>
        </Col>
      </Col>
    </Container>
  )
}

export default Home
