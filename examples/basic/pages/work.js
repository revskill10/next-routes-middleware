import {withRouter} from 'next/router'
import Nav from '../components/nav'
const Page = ({router}) => {
  const {
    query
  } = router

  const {slug} = query
  return (
    <>
    <Nav />
    <div>Slug is {slug}</div>
    </>
  )
}

export default withRouter(Page)
