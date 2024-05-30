import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutCoontainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutCoontainer>
      <Header />
      <Outlet />
    </LayoutCoontainer>
  )
}
