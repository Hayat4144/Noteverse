import createTask from '@/Tasks/api/createTask';
import deleteTask from '@/Tasks/api/deleteTask';
import FindtaskById from '@/Tasks/api/taskById';
import updateTask from '@/Tasks/api/updateTask';
import authMiddleware from '@/middlewares/authMiddleware';
import expres from 'express'

const taskRouter = expres.Router();

taskRouter.post('/api/create/task',authMiddleware,createTask)
taskRouter.get('/api/read/task/:id',authMiddleware,FindtaskById)
taskRouter.put('/api/update/task', authMiddleware,updateTask)
taskRouter.delete('/api/delete/task/:id',authMiddleware,deleteTask)


export default taskRouter