import {Router} from 'express'
import {Todo} from '../models/todo'

const router=Router()

let todos: Todo[]=[]

router.get('/',(req,res,next)=>{
    res.status(200).json({todos : todos})
})

router.post('/todo',(req,res,next)=>{
     const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
     }

     todos.push(newTodo)

     res.status(200).json({newtodo: newTodo})
})

router.put('/edit/:id',(req,res,next)=>{
    const id=req.params.id
    const index=todos.findIndex((todo)=> todo.id===id)
    if(index>=0){
        todos[index]={
            id: todos[index].id,
            text: req.body.text
        }
        return res.status(201).json({message:'todo updated',todo: todos})
    }

    res.status(404).json({message:'to do not found'})
})

router.delete('/deletetodo/:id',(req,res,next)=>{
     const id=req.params.id
    //  const updatedtodo=[]
     if(id){
        // for(let i=0;i<todos.length;i++){
        //     if(id==todos[i].id){
        //         continue
        //     }
        //     updatedtodo.push(todos[i])
        // }
        // todos=[...updatedtodo]
        todos=todos.filter((todo)=>
            todo.id!==id
        )
        res.status(200).json({message:"success",todos: todos})
     }
     else{
        res.status(404).json({message:"id not found"})
     }
})

export default router