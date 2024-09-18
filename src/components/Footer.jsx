/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-[#212121] h-full text-white flex'>
      <div className='w-fit h-full border-r-2 border-white flex items-center'>
        <img src="./logo.webp" className='w-12 h-12 rounded-full inline' alt="" />
        <p className='font-[cursive] p-4 text-sm '>You can express anything here..!!</p>
      </div>
      <div className='min-w-fit px-4 flex items-center border-r-2 border-white'>
        <p className='text-lg p-4'>Contact me!</p>
        <div className='w-full flex justify-left gap-10 items-center'>
          <div id='Mail' className='after:content-["Email"] after:hidden hover:after:block after:text-xs after:animate-pulse after:pt-2 after:text-white' >
            <Link to='mailto:makhaldeepra@outlook.com'>
            <svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" className='border-2 border-white w-10 h-10 cursor-pointer rounded-full hover:scale-125'>
            <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0H26.5C38.9264 0 49 10.0736 49 22.5V22.5C49 34.9264 38.9264 45 26.5 45H22.5C10.0736 45 0 34.9264 0 22.5V22.5Z" fill="white"/>
            <path d="M8.16667 37.5C7.04375 37.5 6.08246 37.1328 5.28281 36.3984C4.48316 35.6641 4.08333 34.7813 4.08333 33.75V11.25C4.08333 10.2187 4.48316 9.33594 5.28281 8.60156C6.08246 7.86719 7.04375 7.5 8.16667 7.5H40.8333C41.9563 7.5 42.9175 7.86719 43.7172 8.60156C44.5168 9.33594 44.9167 10.2187 44.9167 11.25V33.75C44.9167 34.7813 44.5168 35.6641 43.7172 36.3984C42.9175 37.1328 41.9563 37.5 40.8333 37.5H8.16667ZM24.5 24.375L8.16667 15V33.75H40.8333V15L24.5 24.375ZM24.5 20.625L40.8333 11.25H8.16667L24.5 20.625ZM8.16667 15V11.25V33.75V15Z" fill="#1D1B20"/>
            </svg>
            </Link>
          </div>
          <div id='Facebook' className='after:content-["Facebook"] after:hidden hover:after:block after:text-xs after:animate-pulse after:pt-2 after:text-white' >
            <Link to='https://www.facebook.com/deepramakhal22' target='_blank'>
            <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg" className='border-2 border-white w-10 h-10 cursor-pointer rounded-full hover:scale-125'>
            <path d="M51.9999 27.158C51.9999 12.7102 40.5825 0.998047 26.4984 0.998047C12.4143 0.998047 0.996948 12.7102 0.996948 27.158C0.996948 40.2151 10.3225 51.0376 22.5138 53.0001V34.7198H16.0388V27.158H22.5138V21.3946C22.5138 14.8383 26.321 11.2168 32.1461 11.2168C34.9362 11.2168 37.8546 11.7277 37.8546 11.7277V18.1655H34.6389C31.471 18.1655 30.4831 20.182 30.4831 22.2508V27.158H37.5557L36.4251 34.7198H30.4831V53.0001C42.6744 51.0376 51.9999 40.2151 51.9999 27.158Z" fill="white"></path>
            </svg>
            </Link>
          </div>
          <div id="Instagram" className='after:content-["Instagram"] after:hidden hover:after:block after:text-xs after:animate-pulse after:pt-2 after:text-white' >
            <Link to='https://www.instagram.com/deepramakhal22' target='_blank'>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className='border-2 border-white w-10 h-10 cursor-pointer rounded-full hover:scale-125'>
            <path fillRule="evenodd" clipRule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM25 39.3918C25 31.4558 31.4566 25 39.3918 25H60.6082C68.5442 25 75 31.4566 75 39.3918V60.8028C75 68.738 68.5442 75.1946 60.6082 75.1946H39.3918C31.4558 75.1946 25 68.738 25 60.8028V39.3918ZM60.6082 70.4317C65.9174 70.4317 70.2371 66.1121 70.2371 60.8028V39.3918C70.2371 34.0826 65.9174 29.7629 60.6082 29.7629H39.3918C34.0826 29.7629 29.7629 34.0826 29.7629 39.3918V60.8028C29.7629 66.1121 34.0826 70.4317 39.3918 70.4317H60.6082ZM36.9883 50.0054C36.9883 42.8847 42.8438 37.0922 50.0397 37.0922C57.2356 37.0922 63.0911 42.8847 63.0911 50.0054C63.0911 57.1252 57.2356 62.9177 50.0397 62.9177C42.843 62.9177 36.9883 57.1252 36.9883 50.0054ZM41.7422 50.0054C41.7422 54.5033 45.4641 58.1638 50.0397 58.1638C54.6153 58.1638 58.3372 54.5041 58.3372 50.0054C58.3372 45.5066 54.6145 41.8469 50.0397 41.8469C45.4641 41.8469 41.7422 45.5066 41.7422 50.0054ZM63.3248 39.6355C65.0208 39.6355 66.3956 38.2606 66.3956 36.5646C66.3956 34.8687 65.0208 33.4938 63.3248 33.4938C61.6288 33.4938 60.2539 34.8687 60.2539 36.5646C60.2539 38.2606 61.6288 39.6355 63.3248 39.6355Z" fill="white"></path>
            </svg>
            </Link>
          </div>
          <div id="linkedin" className='after:content-["linkedin"] after:hidden hover:after:block after:text-xs after:animate-pulse after:pt-2 after:text-white'>
            <Link to='https://www.linkedin.com/in/deepra-makhal' target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className='border-2 border-white w-10 h-10 cursor-pointer rounded-full hover:scale-125 fill-white '>
                <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z"></path>
            </svg>
            </Link>
          </div>
          <div id='Whatsapp' className='after:content-["Whatsapp"] after:hidden hover:after:block after:text-xs after:animate-pulse after:pt-2 after:text-white'>
            <Link to='https://wa.me/7980760590' target='_blank'>
            <svg
            className='border-2 border-white w-10 h-10 cursor-pointer rounded-full hover:scale-125 bg-white ' 
            viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="black"/>
            </svg>
            </Link>
          </div>
        </div>
      </div>
        <div className='h-full w-[20%] flex justify-center items-center'>
          <p className='text-white text-xs '>Copyright © 2024-25. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer