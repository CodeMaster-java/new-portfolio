import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { Header } from './Header'

export const RootLayout = () => (
  <div className="min-h-screen bg-surface-900">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)
