/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { useEffect, useState } from "react";
import SignUp from "./Pages/Login";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import useAuthContext from "./hooks/useAuthContext";
import FavPage from "./Pages/FavPage";
import AnimeInfo from "./Pages/AnimeInfo";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Search from "./Pages/Search";
import MovieInfo from "./Pages/MovieInfo";
import AnimeEps from "./Pages/AnimeEps";
import OngoingPage from "./Pages/OngoingPage";
import MoviePage from "./Pages/MoviePage";
import CompletePage from "./Pages/CompletePage";
import GenrePage from "./Pages/GenrePage";
export default function App() {
  const { user } = useAuthContext();
  
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
   <div>
    
   </div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/fav" element={user ? <FavPage /> : <Navigate to="/" />} />
        <Route path="/anime/:slug" element={<AnimeInfo />} />
        <Route path="/anime/eps/:slugEps" element={<AnimeEps />} />
        <Route path="/movie/:slug" element={<MovieInfo />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ongoing" element={<OngoingPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/genre/:genreSlug" element={<GenrePage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer/>
    </Router>
  );
}
