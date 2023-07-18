import createTask from '@/Tasks/api/createTask';
import deleteTask from '@/Tasks/api/deleteTask';
import getAllTask from '@/Tasks/api/getAllTask';
import searchApi from '@/Tasks/api/searchApi';
import FindtaskById from '@/Tasks/api/taskById';
import updateTask from '@/Tasks/api/updateTask';
import authMiddleware from '@/middlewares/authMiddleware';
import expres from 'express'

const taskRouter = expres.Router();

taskRouter.post('/api/create/task',authMiddleware,createTask)
taskRouter.get('/api/read/task/:id',authMiddleware,FindtaskById)
taskRouter.put('/api/update/task', authMiddleware,updateTask)
taskRouter.delete('/api/delete/task/:id',authMiddleware,deleteTask)
taskRouter.get('/api/read/task',authMiddleware,getAllTask)
taskRouter.get('/api/search/task',searchApi)
export default taskRouter