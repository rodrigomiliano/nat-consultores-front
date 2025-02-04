import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "10px", backgroundColor: "#f8f8f8" }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Sistema de Gestión de Tareas. Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Desarrollado por Rodrigo Miliano
      </Typography>
    </Box>
  );
};

export default Footer;
