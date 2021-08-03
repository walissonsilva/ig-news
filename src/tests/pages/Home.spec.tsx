import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe';
import { mocked } from 'ts-jest/utils';

import Home, { getStaticProps } from '../../pages/index'

jest.mock('../../services/stripe')

describe("Home page", () => {
  it('renders correctly', () => {
    render(
      <Home
        product={{
          priceId: 'fake-price-id',
          amount: 'R$ 20,00',
        }}
      />
    )

    expect(screen.getByText(/R\$ 20,00/i)).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve)

    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          }
        }
      })
    )
  })
})