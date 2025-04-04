import { wrapHof } from '../../h-flow'
import { useEffect } from 'react'
import useHooks from '../../hooks/useHooks'
import HomePropType from './HomePropType'
import HomeView from './HomeView'



function HomeContainder() {

  const props = useHooks([
    wrapHof(useEffect, [() => [], []])
  ])
  return <HomeView {...props} />
} 

export default HomeContainder