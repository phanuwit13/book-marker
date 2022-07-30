import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Col,
  Card,
  Grid,
  Text,
  Image,
  Row,
  Button,
} from '@nextui-org/react'
import action from 'action'

import EditBook from 'components/modal'

//type
import storeTypes from 'redux/types'
import reduxBookListTypes from 'redux/Reducers/Book/types'

const ListPage: NextPage = () => {
  const dispatch = useDispatch()

  const eventDetail = useSelector((state: storeTypes.Props) => state.bookList)

  const [visible, setVisible] = useState<{
    item: reduxBookListTypes.Book
    index: number
  } | null>(null)

  const closeHandler = () => {
    setVisible(null)
  }
  const openModalEdit = (item: reduxBookListTypes.Book, index: number) => {
    setVisible({ item, index })
  }

  const deleteBook = (index: number) => {
    dispatch(action.DeleteBookList(index))
  }

  return (
    <>
      <Container css={{ paddingInline: '24px' }}>
        <Col css={{ d: 'flex', flexDirection: 'column', gap: '10px' }}>
          {eventDetail.list &&
            eventDetail.list.map((item, index) => {
              return (
                <Card variant='flat' css={{ p: '$2' }} key={index}>
                  <Card.Header>
                    <Image
                      alt='nextui logo'
                      src={item.coverImage}
                      width='80px'
                      height='80px'
                    />
                    <Grid.Container css={{ pl: '$6' }}>
                      <Grid xs={12}>
                        <Text css={{ lineHeight: '$xs', fontWeight: '600' }}>
                          Name : {item.bookName}
                        </Text>
                      </Grid>
                      <Grid xs={12}>
                        <Text css={{ color: '$accents8' }}>
                          Author : {item.authorName}
                        </Text>
                      </Grid>
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ py: '$1' }}>
                    <Row justify='space-between'>
                      <Text css={{ color: '$accents8' }}>Finish Reading</Text>
                      <Text css={{ color: '$accents8' }}>
                        {item.finishDate}
                      </Text>
                    </Row>
                    <Row justify='space-between'>
                      <Text css={{ color: '$accents8' }}>Duration Time</Text>
                      <Text css={{ color: '$accents8' }}>
                        {item.durationTime}
                      </Text>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row justify='flex-end' css={{ gap: '10px' }}>
                      <Grid>
                        <Button
                          onClick={() => {
                            openModalEdit(item,index)
                          }}
                          size='sm'
                          flat
                          color='warning'
                          auto
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          onClick={() => {
                            deleteBook(index)
                          }}
                          size='sm'
                          light
                          color='error'
                          auto
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Row>
                  </Card.Footer>
                </Card>
              )
            })}
        </Col>
      </Container>
      <EditBook visible={visible} closeHandler={closeHandler} />
    </>
  )
}

export default ListPage
