import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import theme from './global/theme'

import GlobalStyle from './global/GlobalStyle'

import SchedulePage from '../pages/SchedulePage'

export default function App() {
   return (
      <>
         <ThemeProvider theme={theme}>
            <Routes>
               <Route path="/" element={<h1>Home</h1>} />
               <Route path="/schedule" element={<SchedulePage />} />
            </Routes>
            <GlobalStyle />
         </ThemeProvider>
      </>
   )
}
