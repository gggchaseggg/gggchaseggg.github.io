import { createHashRouter, redirect } from 'react-router'

import { Layout } from '@tt/layout'
import { MainPage, MatchPage } from '@tt/pages'

export const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: MainPage, loader: () => redirect('/match') },
      { path: 'match', Component: MatchPage },
    ],
  },
])
