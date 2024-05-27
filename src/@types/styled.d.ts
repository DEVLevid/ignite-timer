import { DefaultTheme } from '../assets/styles/theme/default'
import 'styled-components'

type ThemeType = typeof DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
