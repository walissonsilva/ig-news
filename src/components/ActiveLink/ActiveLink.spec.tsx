import { render } from '@testing-library/react'

import { ActiveLink } from './'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink Component', () => {
  it('should renders correctly', () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText("Home")).toBeInTheDocument();
  })
  
  it('should adds active class', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Home")).toHaveClass("active");
  })
})