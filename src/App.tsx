import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import EditTask from "./components/EditTask";

function App() {
  return (
    <Router>        
      <Routes>
        <Route element={<Layout />}> {/* Layout envolviendo todas las rutas */}
          <Route path="/" element={<TaskTable />} /> 
          <Route path="/nueva-tarea" element={<TaskForm />} />
          <Route path="/editar/:id" element={<EditTask />} />
        </Route>
      </Routes>      
    </Router>
  );
}

export default App;
