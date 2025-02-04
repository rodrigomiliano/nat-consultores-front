import { useEffect, useState } from "react";
import { getTasks, deleteTask, Task, updateTask } from "../services/TaskService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Box, Typography, TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Tareas por página
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleComplete = async (id: number) => {
    const taskToUpdate = tasks.find(task => task.id === id);
  
    if (!taskToUpdate) {
      console.error(`Tarea con ID ${id} no encontrada`);
      return;
    }
  
    await updateTask(id, { ...taskToUpdate, status: "COMPLETED" });
    fetchTasks(); // Recarga la lista de tareas después de actualizar
  };
  
  // Filtros combinados
  let filteredTasks = tasks.filter(task => 
    (filterStatus ? task.status === filterStatus : true) &&
    (filterPriority ? task.priority === filterPriority : true) &&
    (filterCategory ? task.category === filterCategory : true) &&    
    (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     task.description?.toLowerCase().includes(searchQuery.toLowerCase())) // Usar '?.' para asegurar que no sea undefined
  );

  // Ordenar tareas según selección
  if (sortOrder) {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (sortOrder === "dateAsc") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortOrder === "dateDesc") return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      if (sortOrder === "priorityHigh") return a.priority === "HIGH" ? -1 : 1;
      if (sortOrder === "priorityLow") return a.priority === "LOW" ? -1 : 1;
      return 0;
    });
  }

  // Calcular las tareas que se mostrarán en la página actual
  const paginatedTasks = filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Cambiar página
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Cambiar cantidad de tareas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Regresar a la primera página
  };

  return (    
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/nueva-tarea")}
        sx={{ marginBottom: 2 }}>
        Agregar Tarea
      </Button>      
      
      <Box sx={{ padding: 2 }}>      
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
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>      
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            <Box display="inline-flex" alignItems="center">
              <SearchIcon sx={{ marginRight: 1 }} />
              Búsqueda
            </Box>
          </Typography>
          <TextField
            label="Buscar por Título o Descripción"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </Paper>

      <TableContainer component={Paper}>      
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha Límite</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description || "-"}</TableCell>
                <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.category || "-"}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => handleComplete(task.id)}>
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
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTasks.length} // Número total de tareas filtradas
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
      </Box>
    </div>
  );
};

export default TaskTable;
