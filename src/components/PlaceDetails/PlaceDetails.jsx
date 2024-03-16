import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, Chip, CardActions } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Rating } from '@mui/material';

const PlaceDetails = ({ place, selected, refProp }) => {

  if(selected) refProp?.current?.scrollIntoView({behavior : 'smooth', block: 'start'})

  return (
    <Card elevation={6}>
      <CardMedia style={{ height: 330 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {place.name}
        </Typography>
        <Box display='flex' justifyContent='space-between'>
         <Rating value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant='subtitle1'>
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1' >
            Ranking
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name}
              style={{ marginRight: '5px', height: "20px" }}
            />
            <Typography variant='subtitle2' color='textSecondary'>
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size='small' label={name}
            style={{ marginRight: '5px', marginBottom: '5px' }} />
        ))}

        {place?.address && (
          <Typography gutterBottom variant='body2' color="textSecondry"
            style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between',  marginTop: '10px', }}>
            <LocationOnIcon style={{ marginRight: '5px' }} />{place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography variant="body2" color="textSecondry"
            style={{ display: 'flex', alignItems: 'center',  marginTop: '10px' }}>
            <PhoneIcon style={{ marginRight: '5px' }} /> {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>

          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  )
}

export default PlaceDetails
