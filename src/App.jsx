import { useEffect, useState } from 'react'
import Grid from '@mui/system/Unstable_Grid/Grid'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlaceData } from './api/index'

function App() {

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})

  const [filterdPlaces, setFilterdPlaces] = useState();

  const [bounds, setBounds] = useState(null)
  const [childClicked, setChildClicked] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filterd = places.filter((place) => place.rating > rating);
    setFilterdPlaces(filterd)
  }, [rating])

  useEffect(() => {
    if (bounds) {
      setIsLoading(true)

      getPlaceData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilterdPlaces([])
          setIsLoading(false)
        })
    }
  }, [type, coordinates, bounds])
  return (
    <div className='min-h-screen '>
      <header className='bg-white shadow'>
        <div className="">
          <Header setCoordinates={setCoordinates} />
        </div>
      </header>

      <main>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <List
              places={filterdPlaces?.length ? filterdPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              setBounds={setBounds}
              places={filterdPlaces?.length ? filterdPlaces : places}
              setChildClicked={setChildClicked} />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default App
