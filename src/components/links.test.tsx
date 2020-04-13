import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, getNodeText } from '../../test/render'
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/foo',
  }),
}))
import {
  RouteLink,
  OutgoingLink,
  ButtonRouteLink,
  NavLink,
  navLinkMatch,
} from '../index'

describe('Links', () => {
  test('RouteLink', () => {
    const { getByTestId } = render(<RouteLink to="/foo" data-testid="link" />)
    const element = getByTestId('link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href', '/foo')
  })

  test('OutgoingLink', () => {
    const { getByTestId } = render(
      <OutgoingLink href="/foo" data-testid="link" />
    )
    const element = getByTestId('link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href', '/foo')
  })

  test('ButtonRouteLink', () => {
    const { getByTestId } = render(
      <ButtonRouteLink to="/foo" data-testid="link">
        Go to Foo
      </ButtonRouteLink>
    )
    const element = getByTestId('link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href', '/foo')
    expect(getNodeText(element)).toEqual('Go to Foo')
  })

  test('NavLink - Matching route', () => {
    const { getByTestId } = render(
      <NavLink to="/foo" data-testid="link">
        Current Route
      </NavLink>
    )
    const element = getByTestId('link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href', '/foo')
    const style = getComputedStyle(element)
    expect(style.textDecoration).toEqual('underline')
  })

  test('NavLink - startsWith by default', () => {
    const { getByTestId } = render(
      <NavLink
        to="/f"
        data-testid="link"
        active={{
          textDecoration: 'strikethrough',
        }}
      >
        Current Route
      </NavLink>
    )
    const element = getByTestId('link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href', '/f')
    const style = getComputedStyle(element)
    expect(style.textDecoration).toEqual('strikethrough')
  })

  test('NavLink - Non-matching route', () => {
    const { getByTestId } = render(
      <NavLink
        to="/bar"
        data-testid="link"
        active={{
          textDecoration: 'strikethrough',
        }}
      >
        Current Route
      </NavLink>
    )
    const element = getByTestId('link')
    const style = getComputedStyle(element)
    expect(style.textDecoration).not.toEqual('strikethrough')
  })

  test('NavLink - exact', () => {
    const { getByTestId } = render(
      <NavLink
        to="/"
        data-testid="link"
        shouldBeActive={navLinkMatch.exact}
        active={{
          textDecoration: 'strikethrough',
        }}
      >
        Current Route
      </NavLink>
    )
    const element = getByTestId('link')
    const style = getComputedStyle(element)
    expect(style.textDecoration).not.toEqual('strikethrough')
  })

  test('NavLink - custom matcher', () => {
    const { getByTestId } = render(
      <NavLink
        to="/blop"
        data-testid="link"
        shouldBeActive={() => true}
        active={{
          textDecoration: 'strikethrough',
        }}
      >
        Current Route
      </NavLink>
    )
    const element = getByTestId('link')
    const style = getComputedStyle(element)
    expect(style.textDecoration).toEqual('strikethrough')
  })
})
