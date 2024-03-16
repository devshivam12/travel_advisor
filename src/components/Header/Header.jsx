import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { Box, Typography, InputBase } from '@mui/material';
const Header = ({ setCoordinates }) => {

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
        <h1 className="text-white text-2xl hidden sm:block">Travel Adviser</h1>

        {/* <Box display='flex'>

      </Box> */}

        <nav>
          <ul className="flex space-x-4">
            <li className="text-lg hidden sm:block">Explore New Places</li>

            <Autocomplete  onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <InputBase 
                placeholder='Search....'
               
              />
            </Autocomplete>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


