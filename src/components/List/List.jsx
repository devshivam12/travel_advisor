import React, { createRef, useEffect, useState } from 'react'

import { CircularProgress, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
 
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    if (places && places.length) {
      setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }
  }, [places]);
  
  return (
    <div className='py-4 px-3 w-full flex flex-col h-full'>

      <h5 className='text-xl font-normal mb-2 text-slate-900'>
        Hotel, Restaurants and Attrection around you
      </h5>

      {isLoading ? (
        <div className=''>
          <CircularProgress size='5rem'/>
        </div>
      ) : (
        <>
      <div className='flex items-center mb-4'>
        <div className='mr-10 flex flex-col'>

          <label htmlFor='type' className=' text-xs mb-2'>Type</label>

          <select
            id='type'
            className=' w-36 py-2 border-b-2 focus:outline-none focus:underline focus:border-blue-500'
            value={type}
            onChange={(e) => setType(e.target.value)} >
            <option value='restaurants'>Restaurants</option>
            <option value='hotels'>Hotels</option>
            <option value='attractions'>Attractions</option>
          </select>
        </div>

        <div className='mb-4 flex flex-col ml-10'>

          <label htmlFor='type' className=' text-xs mb-2'>Rating</label>

          <select
            id='type'
            className=' w-28 py-2 border-b-2 focus:outline-none focus:underline focus:border-blue-500'
            value={rating}
            onChange={(e) => setRating(e.target.value)} >
            <option value={0}>All</option>
            <option value={3}>Above 3.0</option>
            <option value={4}>Above 4.0</option>
            <option value={4.5}>Above 4.5</option>
          </select>
        </div>
      </div>

      <div className=' h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 '  >
        <Grid container spacing={3} >
          {places?.map((place, i) => (
            <Grid item key={i} xs={12}>
              <PlaceDetails ref={elRefs[i]} place={place}
                selected={Number(childClicked) === i}
                refProp={elRefs[i]}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      
      </>
      )}
    </div>
  )
}

export default List
