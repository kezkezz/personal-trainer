import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Outlet } from "react-router"
import Box from "@mui/material/Box";

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2}}>
        <Link to={"/"}>Customer List</Link>
        <Link to={"/TrainingList"}>Training List</Link>
      </Box>
    </nav>
      <Outlet />
    </Container>
    </>
  )
}

export default App
