import { Group } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Loader } from 'tabler-icons-react'
import MainHeader from '../navigation/MainHeader'

function HomeContainer() {
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {
    setPageLoad(true)
  }, [])

  return pageLoad ? (
    <div>
      <MainHeader />
      <p>{`Welcome`}</p>
    </div>
  ) : (
    <Group sx={{ justifyContent: 'center', height: '100vh' }}>
      <Loader size="100" variant="bars" />
    </Group>
  )
}

export default HomeContainer
