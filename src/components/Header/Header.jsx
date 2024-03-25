import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { Box, Typography, InputBase } from '@mui/material';
import { FaUser } from 'react-icons/fa'
import { padding } from '@mui/system';


const Header = ({ setCoordinates, handleLogout, userDetails }) => {

  const [autoComplete, setAutoComplete] = useState(null)

  const onLoad = (autoC) => {
    setAutoComplete(autoC)
  }

  const onPlaceChanged = () => {
    if (autoComplete !== null) {

      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();

      setCoordinates({ lat, lng })
    }
  }
  return (

    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl hidden sm:block">Travel Advisor</h1>

        <div className='m-auto flex flex-col justify-center'>
          <FaUser color='black' size={10} className=' w-8 h-8 p-1 rounded-full bg-white' />
          <p className='text-xl text-white text-center'>{userDetails.name}</p>
        </div>

        <nav className='flex item-center justify-center'>
          <ul className="flex space-x-4 items-center">
            <li className="text-2xl text-white hidden sm:block">Explore New Places</li>

            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <InputBase
                placeholder='Search....'
                className='px-3 py-2 rounded-md focus:outline-none '
                style={{ backgroundColor: ' white', color: 'black' }}
              />
            </Autocomplete>
          </ul>
          <button onClick={handleLogout} className='px-3 py-2 bg-white rounded-md ml-2'>Log out</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;


