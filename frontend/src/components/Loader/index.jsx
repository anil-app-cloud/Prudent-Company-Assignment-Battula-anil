import React from 'react';
import LoaderImg from "../../images/loader.svg";
import "./index.css";

const Loader = () => {
  return (
    <div className='loader flex flex-c'>
      <img src = {LoaderImg} alt = "loader" />
    </div>
  )
}

export default Loader