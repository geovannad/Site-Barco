import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]); 

  return (
    <>
      <h1>HOJEEEEEEEEEEEE</h1>
    </>
  );
};

export default Home;
