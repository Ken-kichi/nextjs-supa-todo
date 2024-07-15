'use client'

import { Box,Button,FormControlLabel,Switch,TextField } from "@mui/material"
import {format} from 'date-fns'
import { useEffect,useState } from "react"
import deleteTodo from "../server-action/deleteTodo"
import getTodo from "../server-action/getTodo"
import updateTodo from "../server-action/updateTodo"
import { TodoDetailProps,TodoIdProps } from "../types"
import { useRouter } from "next/navigation"

const TodoDetail = ({id}:TodoIdProps)=>{
    const router = useRouter()
    const [todoContents,setTodoContents] = useState<TodoDetailProps>()
    const [isEdit,setIsEdit] = useState<boolean>(false)

    useEffect(()=>{
        const fetchData = async ()=>{
            const {todo} = await getTodo({id:Number(id)})
            setTodoContents(todo)
        }
        fetchData()
    },[id,router])

    if(!todoContents){
        router.push('/todo-list')
        return
    }

    const onUpdateSubmit = async ()=>{
        const {message} = await updateTodo({
            id:todoContents.id,
            title:todoContents.title,
            description:todoContents.description
        })

        if(message){
            alert(message)
            router.push('/todo-list')
        }
    }

    const onDeleteSubmit = async ()=>{
        const confirmed:boolean = confirm('削除しますか？')

        if(confirmed){
            const {message} = await deleteTodo({
                id:todoContents.id
            })

            if(message){
                router.push('/todo-list')
            }
        }
    }

    if(!id){
        return <div>IDが指定されていません。</div>
    }

    return (
        <>
        <FormControlLabel
            sx={{m:2}}
            control={
                <Switch
                    checked={isEdit}
                    onChange={()=>setIsEdit(!isEdit)}
                    inputProps={{'aria-label':'controlled'}}
                />
            }
            label="編集"
        />
        <form onSubmit={isEdit?onUpdateSubmit:onDeleteSubmit}>
            <Box display='flex' flexDirection='column' gap={2}>
                <TextField
                type="text"
                disabled={!isEdit}
                label="タイトル"
                value={todoContents.title}
                onChange={(e)=>{
                    setTodoContents({
                        ...todoContents,
                        title:e.target.value
                    })
                }}
                required
                />
                <TextField
                type="text"
                disabled={!isEdit}
                label="説明"
                value={todoContents.description}
                onChange={(e)=>{
                    setTodoContents({
                        ...todoContents,
                        description:e.target.value
                    })
                }}
                required
                />
                <Box>作成日：{format(new Date(todoContents.created_at),'yyy/MM/dd')}</Box>
                <Box>更新日：{todoContents.updated_at?format(new Date(todoContents.updated_at),'yyy/MM/dd'):'更新なし'}</Box>

                <Box display='flex' justifyContent='center' sx={{px:4,py:1}}>
                    <Button type="submit" variant="contained" disabled={!isEdit} color="info" >TODOを更新</Button>
                    <Button type="submit" variant="outlined" disabled={isEdit} color="inherit" sx={{ml:2}} >TODOを削除</Button>
                    <Button href={`/todo-list`} variant="outlined" color="inherit" sx={{ml:2}} >戻る</Button>
                </Box>
            </Box>
        </form>

        </>
    )
}

export default TodoDetail
