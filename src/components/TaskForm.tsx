import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, Task } from "../services/TaskService";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";

const initialTask: Omit<Task, "id"> = {
  title: "",
  description: "",
  dueDate: new Date().toISOString().split("T")[0],
  status: "PENDING",
  priority: "MEDIUM",
  category: "",
};

const TaskForm = () => {
  const [task, setTask] = useState(initialTask);
  const [dateError, setDateError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Si el campo que cambia es la fecha, validar antes de actualizar
    if (name === "dueDate") {
      const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato YYYY-MM-DD
      if (value < today) {
        setDateError("La fecha límite no puede ser anterior a hoy.");
      } else {
        setDateError(null);
      }
    }
    // Actualizar el estado de la tarea
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return; // Evita enviar el formulario si hay un error
    await createTask(task);
    navigate("/");   };

  return (
    <Box
      sx={{        
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto", 
        paddingTop: 4,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Crear Tarea
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      >
        <TextField name="title" label="Título" value={task.title} onChange={handleChange} required />      
        <TextField name="description" label="Descripción" value={task.description} onChange={handleChange} multiline />      
        <TextField
          name="dueDate"
          label="Fecha Límite"
          type="date"
          value={task.dueDate}
          onChange={handleChange}        
          error={Boolean(dateError)}
          helperText={dateError || ""}
          fullWidth        
        />
        <TextField select name="status" label="Estado" value={task.status} onChange={handleChange}>
          <MenuItem value="PENDING">Pendiente</MenuItem>
          <MenuItem value="IN_PROGRESS">En Progreso</MenuItem>
          <MenuItem value="COMPLETED">Completada</MenuItem>
        </TextField>
        <TextField select name="priority" label="Prioridad" value={task.priority} onChange={handleChange}>
          <MenuItem value="HIGH">Alta</MenuItem>
          <MenuItem value="MEDIUM">Media</MenuItem>
          <MenuItem value="LOW">Baja</MenuItem>
        </TextField>
        <TextField name="category" label="Categoría" value={task.category} onChange={handleChange} />
        
        <Button type="submit" variant="contained" color="primary">Agregar Tarea</Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
