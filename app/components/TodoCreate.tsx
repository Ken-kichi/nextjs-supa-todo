'use client'

import { createTodo } from "../server-action/createTodo"
import { Box,Button,TextField, useStepContext } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const TodoCreate = ()=>{
    const router = useRouter()
    const [title,setTitle] = useState<string>('')
    const [description,setDescription] = useState<string>('')

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const message = await createTodo({title,description})
            if(message){
                router.push('/todo-list')
            }
        } catch (error) {
            console.error('Todoの作成に失敗しました。')
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Box display='flex' sx={{flexDirection:"column",gap:2}}>
                <TextField type="text" label="タイトル" value={title} required onChange={(e)=>setTitle(e.target.value)} />
                <TextField type="text" label="説明" value={description} required onChange={(e)=>setDescription(e.target.value)} />

                <Box display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" color="success" sx={{px:4,py:1}}>TODOを作成</Button>
                </Box>
            </Box>
        </form>
    )
}

export default TodoCreate
