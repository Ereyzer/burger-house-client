import { useState } from 'react';
import './App.css';
import TimerOverlay from './components/timerOverlay/TimerOverlay';
import Header from './components/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart/Cart.page';
import ExplorePage from './pages/Explore.page';
import LikePage from './pages/Like.page';
import NotificationPage from './pages/Notification.page';
import Main from './components/main/Main.page';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/Home.page';
import CartContextProvider from './components/cartContextProvider/CartContextProvider';

// const openDate = new Date(2025, 11, 1, 8, 0, 0);
const openDate = new Date(2025, 9, 8, 16, 33, 0);
const dateNow = new Date();

function App() {
  const [isTimer, setIsTimer] = useState(openDate > dateNow);

  return (
    <>
      {isTimer ? (
        <TimerOverlay timeTo={openDate} onClose={() => setIsTimer(false)} dateNow={dateNow} />
      ) : (
        <>
          <CartContextProvider>
            <BrowserRouter>
              <Header />
              <Main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/like" element={<LikePage />} />
                  <Route path="/notification" element={<NotificationPage />} />
                </Routes>
              </Main>
            </BrowserRouter>
          </CartContextProvider>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
