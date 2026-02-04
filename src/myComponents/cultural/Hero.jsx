import React from 'react'

const Hero = () => {
  return (
    <>
    
    <section id="hero" className="relative min-h-screen flex items-center bg-no-repeat bg-center w-full bg-cover justify-center bg-[url(/performers-colorful-stage-background.png)] flex-col overflow-hidden py-20">
        <div className='h-20 flex justify-center z-10 items-center self-start -mt-185 md:-mt-155 gap-50 md:gap-330 sticky w-full'>
          <img className='rounded-full h-15  ' src="/logo.jpg" alt="logo" />
          <img className='rounded-4xl h-full  ' src="/cultural-2026.png" alt="cultural image" />
        </div>    
        <div className='flex items-center bg-no-repeat bg-center w-full bg-cover justify-center'><div className="absolute inset-0 bg-black/60 sm:bg-black/80 md:bg-black/60"></div>
        <div className="relative z-10 md:mb-10 mt-12 flex flex-col sm:gap-10 gap-10 sm:pt-8 md:gap-5">
          <h1 className='text-5xl md:text-9xl sm:text-7xl text-gray-200 font-bold text-center'>OJUS-2026</h1>
          <p className='text-wrap w-85 md:text-lg sm:text-sm sm:w-125 text-[10px] p-2 sm:-mt-10 md:w-250 text-center text-gray-300'>Step into a realm where imagination transcends boundaries. Experience three days of cultural brilliance,
            where art, music, and performance converge in a dreamlike celebration of creativity and talent.</p>
            <div className='flex md:flex-row flex-col gap-3 md:gap-10 sm:flex-row justify-center items-center pt-5 md:pt-5'>
              <button className='rounded-4xl bg-white md:text-[16.5px] text-black md:pt-2 md:pb-2 md:pl-3 text-[14px] p-2 md:pr-3 border-2 md:border-3 hover:bg-gray-200 transition duration-300 ease-out cursor-pointer hover:text-black hover:scale-105'>Book your seats</button>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" className="fill-purple-950"></path>
          </svg>
        </div></div>
      </section>
    </>
  )
}

export default Hero
