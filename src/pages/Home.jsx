import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import MainContent from '../components/Maincontent';


function Home() {


  return (
    <div className="bg-black  text-white min-h-screen">
      {/* <Header /> */}
      <div className="flex gap-[5vw] mt-3 px-2  mx-auto ">
        <Sidebar />
        <MainContent />
        
      </div>
    </div>
  );
}

export default Home;