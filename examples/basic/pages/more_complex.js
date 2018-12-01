import {withRouter} from 'next/router'
import Nav from '../components/nav'
const Page = ({router}) => {
  const {
    query
  } = router

  const {day, month, year, slug} = query
  return (
    <>
    <Nav />
    <div>Slug is {slug}</div>
    <div>You requested {year}-{month}-{day}</div>
    </>
  )
}

export default withRouter(Page)
