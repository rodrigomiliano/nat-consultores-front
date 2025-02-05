import { useEffect, useState } from "react";
import { getTasks, deleteTask, Task, updateTask } from "../services/TaskService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskFilters from "./tasks/TaskFilters"; 
import TaskRow from "./tasks/TaskRow";
import TaskPagination from './tasks/TaskPagination';
import SearchIcon from '@mui/icons-material/Search';

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
      
      <TaskFilters 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tasks={tasks}
      />

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
              {paginatedTasks.map(task => (
                <TaskRow
                  key={task.id}
                  task={task}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
        </Table>
        
      </TableContainer>
      <TaskPagination
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TaskTable;
