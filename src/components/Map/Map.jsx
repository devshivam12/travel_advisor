import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Rating } from '@mui/material';

import mapStyles from './mapStyles'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {

  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className="h-screen w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        center={coordinates}
        defaultCenter={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {places?.map((place, i) => (

          <div
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            className=' absolute transform -translate-x-2/4 -translate-y-2/4 z-1 hover:z-2'
          >

            {
              !isDesktop ? (
                <LocationOnIcon color='primary' fontSize='large' />

              ) : (

                <div className=" bg-white p-3 flex flex-col justify-center w-28">

                  <h3 className=" text-base font-medium text-gray-700 mb-2">
                    {place.name}
                  </h3>
                  <img
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                    className=" cursor-pointer"
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly></Rating>
                </div>
              )
            }

          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
