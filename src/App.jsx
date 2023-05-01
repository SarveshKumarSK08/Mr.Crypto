import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CoinDetails from './Components/CoinDetails/CoinDetails'
import Headers from './Components/Header/Headers'
import Home from './Components/Home/Home'
import Coins from './Components/Coins/Coins'
import Exchanges from './Components/Exchanges/Exchanges'
import Footer from './Components/Footer/Footer'
import Search, { ExchangeCard, SearchCard } from './Components/Search/Search'


const App = () => {
  return (
    <Router>
    <Headers />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/coins' element={<Coins/>} />
      <Route path='/exchange' element={<Exchanges/>} />
      <Route path='/coin/:id' element={<CoinDetails/>} />
      <Route path='/search' element={<Search/>} />

    </Routes>
    <Footer />
    </Router>
  )
}

export default App