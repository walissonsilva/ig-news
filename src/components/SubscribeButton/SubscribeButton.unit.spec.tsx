import { render, screen, fireEvent, getByTestId, getByText } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'

import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton Component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when is not authenticated', () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    const subscribeButtonElement = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButtonElement)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when already has a subscription', () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'john.doe@email.com' },
        expires: 'fake-expires',
        activeSubscription: 'fake-active-subscription',
      } as any,
      false
    ])
    
    const pushMocked = jest.fn()
    useRouterMocked.mockReturnValueOnce(
      { push: pushMocked } as any
    )

    render(<SubscribeButton />)

    const subscriptionButton = screen.getByText('Subscribe now')

    fireEvent.click(subscriptionButton)

    expect(pushMocked).toHaveBeenCalled()
  })
})