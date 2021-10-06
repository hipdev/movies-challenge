import { useCallback, useContext, useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Container from '@mui/material/Container'
import { ColorModeContext } from '../../pages/_app'
import { useTheme } from '@mui/material/styles'
import { Theme } from '@mui/system'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DrawerNewMovie from './DrawerNewMovie'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import Link from 'src/Link'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function Header({
  searchWord,
}: {
  searchWord: string | string[] | undefined
}) {
  const [searchText, setSearchText] = useState(searchWord || undefined)
  const colorMode = useContext(ColorModeContext)
  const theme: Theme = useTheme()
  const router = useRouter()

  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = (value: boolean) => {
    setOpenDrawer(value)
  }

  useEffect(() => {
    setSearchText(searchWord)
  }, [searchWord, router.query])

  const handleSearch = useCallback(
    debounce(async (e) => {
      if (e.target.value != '') {
        router.push(`/search/${e.target.value}`)
      } else {
        router.push('/')
      }
    }, 1000),

    []
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DrawerNewMovie openDrawer={openDrawer} toggleDrawer={toggleDrawer} />

      <AppBar position="static">
        <Container>
          <Toolbar>
            <Link
              href="/"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: '2rem',
                textDecoration: 'none',
              }}
              color="inherit"
            >
              Movify
            </Link>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                defaultValue={searchText ? searchText : ''}
                onChange={handleSearch}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="Add a new movie"
                aria-haspopup="true"
                color="inherit"
                sx={{ marginRight: '10px' }}
                onClick={() => toggleDrawer(true)}
              >
                <ControlPointIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={colorMode.toggleColorMode}
              >
                {theme.palette.mode == 'light' ? (
                  <DarkModeIcon />
                ) : (
                  <LightModeIcon />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
