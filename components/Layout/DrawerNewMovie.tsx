import {
  Alert,
  Button,
  Drawer,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Theme } from '@mui/system'
import { addNewMovie } from 'lib/queries/movies'
import { mutate } from 'swr'

type Props = {
  openDrawer: boolean
  toggleDrawer: (value: boolean) => void
}

const DrawerNewMovie = ({ openDrawer, toggleDrawer }: Props) => {
  const theme: Theme = useTheme()

  const [dataForm, setDataForm] = useState({
    title: '',
    description: '',
    year: '',
  })

  const [picture, setPicture] = useState(null)
  const [errorPicture, setErrorPicture] = useState(false)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    })
  }

  const handlePicture = (e: ChangeEvent<HTMLInputElement> & DragEvent) => {
    let files: any
    if (e.dataTransfer) {
      // usefull for DragAndDrop files
      files = e.dataTransfer.files
    } else if (e.target) {
      // normal input file
      files = e.target.files
    }

    setPicture(files[0])
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!picture) {
      setErrorPicture(true)
      return
    }

    const newMovie = await addNewMovie({ ...dataForm, picture })

    if (newMovie) {
      toggleDrawer(false)
      mutate(
        'getMovies',
        (data: []) => {
          return [newMovie[0], ...data]
        },
        false
      )
    }
  }

  return (
    <Drawer
      anchor={'right'}
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            Add new movie
          </Typography>

          <TextField
            id="outlined-basic"
            label="Movie name"
            variant="outlined"
            margin="dense"
            required
            value={dataForm.title}
            name="title"
            onChange={handleInputChange}
          />

          <TextareaAutosize
            aria-label="Movie description"
            placeholder="Movie description"
            value={dataForm.description}
            style={{
              width: 300,
              background: 'transparent',
              padding: '1rem',
              borderRadius: '3px',
              fontSize: '16px',
              marginTop: '0.7rem',
              marginBottom: '0.7rem',
              color: theme.palette.mode == 'light' ? 'inherit' : '#ddd',
            }}
            name="description"
            onChange={handleInputChange}
            required
          />

          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            type="number"
            margin="dense"
            inputProps={{ min: '1900', max: '2022' }}
            placeholder="Ex: 2010"
            name="year"
            value={dataForm.year}
            onChange={handleInputChange}
            required
          />

          <Button
            variant="outlined"
            component="label"
            style={{ marginTop: '0.7rem' }}
          >
            Movie picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handlePicture}
            />
          </Button>
          {errorPicture && (
            <Alert sx={{ marginTop: '1rem' }} severity="error">
              Please add a picture for the movie
            </Alert>
          )}
          <Button
            variant="contained"
            component="button"
            type="submit"
            style={{ marginTop: '2rem' }}
          >
            Create movie
          </Button>
        </Box>
      </form>
    </Drawer>
  )
}

export default DrawerNewMovie
