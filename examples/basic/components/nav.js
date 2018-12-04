import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import mkLink from 'next-routes-middleware/get-client-link'
import {FormattedMessage} from 'react-intl'
import LanguageSwitcher from './language-switcher'
import config from '../now.config.js'
const getClientLink = mkLink(config)

const NextLink = ({href, className, children, ...rest}) => {
  const as = getClientLink(href)
  return <Link href={as} as={href} {...rest}>
    <a className={className} href={as}>{children}</a>
  </Link>
}

const StyledLink = styled(NextLink)`
  color: #067df7;
  text-decoration: none;
  font-size: 13px;
`

const Nav = styled.nav`
  text-align: center;
`

const Ul = styled.ul`  
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
`
const Li = styled.li`
  display: flex;
  padding: 6px 8px;
`

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const NavBar = () => (
  <Nav>
    <Ul>
      <Li>
        <StyledLink prefetch passHref href="/">
          <FormattedMessage id='nav.home' defaultMessage='Home' />
        </StyledLink>
      </Li>
      <Li>
        <StyledLink prefetch passHref href="/about">
          <FormattedMessage id='nav.about' defaultMessage='About' />
        </StyledLink>
      </Li>
      <Li>
        <LanguageSwitcher />
      </Li>
      <Li>
        <StyledLink href='/w/test' passHref>Work</StyledLink>
      </Li>
      <Li>
        <StyledLink prefetch href="/resource/202eb9d7-feb3-407c-922e-e749159cb3ec" passHref>Resource</StyledLink>
      </Li>
      <Li>
        <StyledLink prefetch href="/t/hello-world/1999-12-31" passHref>More resource</StyledLink>
      </Li>
      <Ul>
        {links.map(({ key, href, label }) => (
          <Li key={key}>
            <StyledLink href={href}>{label}</StyledLink>
          </Li>
        ))}
      </Ul>
    </Ul>
  </Nav>
)

export default NavBar
