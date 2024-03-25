import { useEffect, useState } from 'react'
import Grid from '@mui/system/Unstable_Grid/Grid'
import Header from '../Header/Header'
import List from '../List/List'
import Map from '../Map/Map'
import { getPlaceData } from '../../api/index'


import { useNavigate } from 'react-router-dom'
import { account } from '../../authentication/AuthConfig'
import { Link } from 'react-router-dom'


function Home() {

  // for logout session 

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    const getData = account.get()

    getData.then(
      function (response) {
        setUserDetails(response)
        // console.log(response)
      },
      function (error) {
        console.log(error)
      }
    )
  }, [])

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  // For main components

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

    <>
      {
        userDetails ?
        
          <div className='min-h-screen '>

            < header className='bg-white shadow' >
              <div className="">
                <Header setCoordinates={setCoordinates} handleLogout={handleLogout} userDetails={userDetails}/>
              </div>
            </header >

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
          </div >
          : (
            <p className="mt-4">
              Please Login To see Profile{" "}
              <Link to="/">
                <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
                  Login
                </span>
              </Link>
            </p>
          )
      }
    </>

  )
}

export default Home;
