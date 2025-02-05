// src/components/TaskRow.tsx
import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Task } from "../../services/TaskService";

interface TaskRowProps {
  task: Task;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Si la fecha es válida, formatearla en 'YYYY-MM-DD'
  if (isNaN(date.getTime())) return "-";
  return date.toISOString().split("T")[0]; // Obtiene la fecha en formato 'YYYY-MM-DD'
};


const TaskRow: React.FC<TaskRowProps> = ({ task, handleComplete, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow key={task.id}>
      <TableCell>{task.id}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description || "-"}</TableCell>
      <TableCell>{task.dueDate ? formatDate(task.dueDate) : "-"}</TableCell>

      <TableCell>{task.status}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{task.category || "-"}</TableCell>
      <TableCell>
        <Button variant="contained" color="success" onClick={() => handleComplete(task.id)} disabled={task.status === "COMPLETED"}>
          Completar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={() => navigate(`/editar/${task.id}`)}>
          Editar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => handleDelete(task.id)}>
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
