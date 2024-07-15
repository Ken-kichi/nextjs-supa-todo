"use client"

import { Button,Card,CardActions,CardContent,Typography } from "@mui/material"
import { useEffect,useState } from "react"
import getTodoList from "../server-action/getTodoList"
import { TodoDetailProps,TodoListProps } from "../types"

const TodoList = () =>{
    const [todoListContents,setTodoListContents] = useState<TodoDetailProps[]>()

    useEffect(()=>{
        const fetchData = async ()=>{
            const {todos} = await getTodoList()
            setTodoListContents(todos)
        }
        fetchData()
    },[])

    if(!todoListContents){
        return <p>データがありません。</p>
    }

    return (
        <>
        {todoListContents.length === 0 && <p>データがありません。</p>}
        {todoListContents.map((todo:TodoListProps)=>(
            <Card key={todo.id} sx={{m:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {todo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {todo.description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button href={`/todo-list/${todo.id}`} variant="contained" color="success" size="small">
                        詳細
                    </Button>
                </CardActions>
            </Card>
        ))}
        </>
    )
}

export default TodoList
