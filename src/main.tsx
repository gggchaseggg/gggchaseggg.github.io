import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from './routes'

import '@tt/styles/global.scss'

// biome-ignore lint/style/noNonNullAssertion: react default
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
