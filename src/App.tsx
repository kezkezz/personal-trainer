import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomerList from "./components/CustomerList";

function App() {
  
  return (
     <Container maxWidth="lg">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Customer List</Typography>
        </Toolbar>
      </AppBar>
      <CustomerList />
      <CssBaseline />
    </Container>
  )
}

export default App
