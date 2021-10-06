import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import Link from 'src/Link'

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            With 💖 By{' '}
            <Link
              underline="always"
              href="https://julianux.com"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              style={{ color: '#fff' }}
            >
              Julián David
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Footer
