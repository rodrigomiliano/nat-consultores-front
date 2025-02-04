import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Sistema de Gestión de Tareas - NAT Consultores SRL
          </Link>
        </Typography>          
      </Toolbar>
    </AppBar>
  );
};

export default Header;
