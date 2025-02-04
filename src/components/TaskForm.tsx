import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, Task } from "../services/TaskService";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const initialTask: Omit<Task, "id"> = {
  title: "",
  description: "",
  dueDate: "",
  status: "PENDING",
  priority: "MEDIUM",
  category: "",
};

const TaskForm = () => {
  const [task, setTask] = useState(initialTask);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(task);
    navigate("/"); // Redirige a la lista de tareas
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
      <TextField name="title" label="Título" value={task.title} onChange={handleChange} required />
      <TextField name="description" label="Descripción" value={task.description} onChange={handleChange} multiline />
      <TextField name="dueDate" label="Fecha Límite" type="date" value={task.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
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
  );
};

export default TaskForm;
