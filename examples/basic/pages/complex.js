import {withRouter} from 'next/router'
import Nav from '../components/nav'
const Page = ({router}) => {
  const {
    query
  } = router

  const {id} = query
  return (
    <>
    <Nav />
    <div>Id Resource is {id}</div>
    </>
  )
}

export default withRouter(Page)
