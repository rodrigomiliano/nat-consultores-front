import React from 'react';
import { TablePagination } from '@mui/material';

interface TaskPaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskPagination: React.FC<TaskPaginationProps> = ({ count, rowsPerPage, page, onChangePage, onChangeRowsPerPage }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count} // Número total de tareas filtradas
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
    />
  );
};

export default TaskPagination;
