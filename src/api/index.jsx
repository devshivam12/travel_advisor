import axios from "axios";

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'



export const getPlaceData = async (type,sw, ne) => {
    try {
        const { data: { data } } = await axios.get( `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {

            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
        
            },
            headers: {
                'X-RapidAPI-Key': 'd2f703cfbfmshae3def0ad12a8f1p17a80ajsn06e9d98e790a',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        })
        return data
    } catch (error) {
        console.error(error);
    }
}
