<<<<<<< HEAD
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
=======
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   console.log(token);
//   if (token == "") {
//     console.log("aaaaaaaa")
//     navigate("/");
//   }else{
//     console.log("bbbbbbbb")
//   }
//   return (
//     <>
//       <h1>HOJEEEEEEEEEEEE</h1>
//     </>
//   );
>>>>>>> 2ce0f68c035833700745dea0e2ece13ec3301da5
};

export default Home;
