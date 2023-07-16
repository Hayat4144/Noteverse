import createTask from '@/Tasks/api/createTask';
import deleteTask from '@/Tasks/api/deleteTask';
import FindtaskById from '@/Tasks/api/taskById';
import updateTask from '@/Tasks/api/updateTask';
import expres from 'express'

const taskRouter = expres.Router();

taskRouter.post('/api/create/task',createTask)
taskRouter.get('/api/read/task/:id',FindtaskById)
taskRouter.put('/api/update/task',updateTask)
taskRouter.delete('/api/delete/task/:id',deleteTask)


export default taskRouter