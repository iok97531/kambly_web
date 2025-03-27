import HomePropType from './HomePropType'
import HomeView from './HomeView'



function HomeContainder(props: HomePropType) {
  return <HomeView {...props} />
} 

export default HomeContainder