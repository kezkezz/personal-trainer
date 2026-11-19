import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Outlet } from "react-router"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function App() {
  
  return (
    <>
     <Container maxWidth="lg">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Personal Trainer App</Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />

    <nav>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>

        <Button component={Link} to="/" variant="contained">Customer List</Button>
        <Button component={Link} to="/TrainingList" variant="contained">Training List</Button>
        <Button component={Link} to="/Calendar" variant="contained">Calendar</Button>
        <Button component={Link} to="/Statistics" variant="contained">Statistics</Button>

      </Box>
    </nav>
      <Outlet />
    </Container>
    </>
  )
}

export default App
