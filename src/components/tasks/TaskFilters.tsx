import React from "react";
import { TextField, MenuItem, Box, Paper, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Task } from "../../services/TaskService";

interface TaskFiltersProps {
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  filterPriority: string;
  setFilterPriority: React.Dispatch<React.SetStateAction<string>>;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  tasks: Task[]; // Necesario para obtener las categorías
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
  sortOrder,
  setSortOrder,
  tasks
}) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        <Box display="inline-flex" alignItems="center">
          <FilterAltIcon sx={{ marginRight: 1 }} />
          Filtros y Ordenamiento
        </Box>
      </Typography>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <TextField
          select
          label="Filtrar por Estado"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="PENDING">Pendiente</MenuItem>
          <MenuItem value="IN_PROGRESS">En Progreso</MenuItem>
          <MenuItem value="COMPLETED">Completada</MenuItem>
        </TextField>

        <TextField
          select
          label="Filtrar por Prioridad"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="HIGH">Alta</MenuItem>
          <MenuItem value="MEDIUM">Media</MenuItem>
          <MenuItem value="LOW">Baja</MenuItem>
        </TextField>

        <TextField
          select
          label="Filtrar por Categoría"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {Array.from(new Set(tasks.map(task => task.category).filter(Boolean))).map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Ordenar por"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">Ninguno</MenuItem>
          <MenuItem value="dateAsc">Fecha Ascendente</MenuItem>
          <MenuItem value="dateDesc">Fecha Descendente</MenuItem>
          <MenuItem value="priorityHigh">Prioridad Alta Primero</MenuItem>
          <MenuItem value="priorityLow">Prioridad Baja Primero</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
};

export default TaskFilters;
