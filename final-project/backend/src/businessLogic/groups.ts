
import { Group } from '../models/Group'

import { GroupAccess } from '../dataLayer/groupsAccess'
import { CreateGroupRequest } from '../requests/CreateGroupRequest'

const groupAccess = new GroupAccess()

export async function createGroup(createGroupRequest: CreateGroupRequest, userId: string): Promise<Group> {

  createGroupRequest['userId'] = userId
  createGroupRequest['timestamp'] = new Date().toISOString()

  return await groupAccess.createGroup(createGroupRequest)

}

export async function getAllGroups(): Promise<Group[]> {
  return groupAccess.getAllGroups()
}


// models and requests
// import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate} from '../models/TodoUpdate'
//
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//
// // data layer
// import { TodoAccess } from '../dataLayer/todosAccess'
//
// // load the data interface
// const todoAccess = new TodoAccess()
//
// export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem>{
//     createTodoRequest['userId'] = userId
//     return await todoAccess.createTodo(createTodoRequest)
// }
//
// export async function updateTodo(updateTodoRequest: UpdateTodoRequest, userId: string, todoId: string): Promise<TodoUpdate>{
//     return await todoAccess.updateTodo(updateTodoRequest, userId, todoId)
// }
//
// export async function updateTodoUrl(userId: string, todoId: string){
//     return await todoAccess.setTodoImageUrl(userId, todoId)
// }
//
// export async function deleteTodo(userId: string, todoId: string){
//     return await todoAccess.deleteTodo(userId, todoId)
// }
//
// export async function getTodo(userId: string, todoId: string): Promise<TodoItem[]>{
//     return todoAccess.getTodo(userId, todoId)
// }
//
// export async function getAllTodos(userId: string): Promise<TodoItem[]>{
//     return todoAccess.getAllTodos(userId)
// }
