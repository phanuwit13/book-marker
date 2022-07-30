import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { CustomContainer } from 'styles/page/home'
import { Button, Col } from '@nextui-org/react'
import { useRouter } from 'next/router'

const Layout: React.FunctionComponent<any> = ({ children }): JSX.Element => {
  const router = useRouter()

  const checkActive = (pathname: string) => {
    return router.pathname === pathname
  }

  const goPath = (pathname: string) => {
    router.push(pathname)
  }

  return (
    <CustomContainer>
      <>
        <Col css={{paddingBlock:'16px',position:'sticky',top:'0' ,zIndex:'10',background:'$white'}}>
          <Button.Group css={{width:"-webkit-fill-available"}}  color='primary' flat>
            <Button
              onClick={() => {
                goPath('/')
              }}
              css={{
                w: '100%',
                background: `${checkActive('/') ? '$primary' : 'unset'}`,
                color: `${checkActive('/') ? '$white' : 'unset'}`,
              }}
            >
              ADD BOOK
            </Button>
            <Button
              onClick={() => {
                goPath('/list')
              }}
              css={{
                w: '100%',
                background: `${checkActive('/list') ? '$primary' : 'unset'}`,
                color: `${checkActive('/list') ? '$white' : 'unset'}`,
              }}
            >
              LIST BOOK
            </Button>
          </Button.Group>
        </Col>
        {children}
      </>
    </CustomContainer>
  )
}

export default Layout
