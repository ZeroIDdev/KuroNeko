/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import Card from "../components/Card";
import Fav from "./Fav";
import useAuthContext from "../hooks/useAuthContext";
import TopAnime from "./TopAnime";
import Movie from "./Movie";
import Ongoing from "./Ongoing";
export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className="">
      <Ongoing/>
    </div>
  );
}
