import styles from './Homepage.module.css'
import {PageContainer} from '../PageContainer'
import SearchHeader from '../SearchHeader'


export const Homepage = () => {
  return (
    <PageContainer>
      <SearchHeader className={styles.search_header_component} />
    </PageContainer>
  )
}
