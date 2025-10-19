import { createBrowserRouter, redirect } from 'react-router'

import { Layout } from '@tt/layout'
import { MainPage, MatchPage } from '@tt/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: MainPage, loader: () => redirect('/match') },
      { path: 'match', Component: MatchPage },
    ],
  },
])
