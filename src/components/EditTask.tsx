import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, Task } from "../services/TaskService";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      const data = await getTaskById(parseInt(id));
      setTask(data);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!task) return;
    const { name, value } = e.target;

    if (name === "dueDate") {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) {
        setDateError("La fecha límite no puede ser anterior a hoy.");
      } else {
        setDateError(null);
      }
    }

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !id || dateError) return;
    await updateTask(parseInt(id), task);
    navigate("/");
  };

  if (!task) return <p>Cargando...</p>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "0 auto", paddingTop: 4 }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Editar Tarea
      </Typography>
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
      
      <Button type="submit" variant="contained" color="primary">Guardar cambios</Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
    </Box>
  );
};

export default EditTask;
