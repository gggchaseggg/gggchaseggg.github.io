import { type FC, Fragment } from 'react'
import { Outlet } from 'react-router'

export const Layout: FC = () => {
  return (
    <Fragment>
      <header>header</header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  )
}
