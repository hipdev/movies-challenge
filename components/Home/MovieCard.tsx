import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Movie } from 'types/movie'

const MovieCard = ({ movie }: { movie?: Movie }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={`https://gmscppgyvozrsjrmyftk.supabase.in/storage/v1/object/public/${movie?.picture}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {movie?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {movie?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
export default MovieCard
