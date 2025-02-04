import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, Task } from "../services/TaskService";
import { TextField, Button, Box, MenuItem } from "@mui/material";

const EditTask = () => {
  const { id } = useParams<{ id: string }>(); // Asegurar que `id` es un string
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null); // Inicialmente null

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return; // Evita que se ejecute si id es undefined
      const data = await getTaskById(parseInt(id)); // Convertir id a número
      setTask(data);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!task) return; // Evita errores si task es null
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !id) return;
    await updateTask(parseInt(id), task);
    navigate("/");
  };

  if (!task) return <p>Cargando...</p>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
      <TextField name="title" label="Título" value={task.title} onChange={handleChange} required />
      <TextField select name="status" label="Estado" value={task.status} onChange={handleChange}>
        <MenuItem value="PENDING">Pendiente</MenuItem>
        <MenuItem value="IN_PROGRESS">En Progreso</MenuItem>
        <MenuItem value="COMPLETED">Completada</MenuItem>
      </TextField>
      <Button type="submit" variant="contained">Guardar cambios</Button>
      <Button variant="outlined" onClick={() => navigate("/")}>Cancelar</Button>
    </Box>
  );
};

export default EditTask;
