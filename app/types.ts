export type TodoDetailProps = {
    id:number
    user_id:string
    title:string
    description:string
    created_at:string
    updated_at:string | null
}

export type TodoListProps = Pick<TodoDetailProps,'id' | 'title' | 'description'>

export type TodoIdProps = Pick<TodoDetailProps,'id'>

export type TodoCreateProps = Pick<TodoDetailProps,'title' | 'description'>

export type TodoUpdateProps = Pick<TodoDetailProps,'id' | 'title' | 'description'>

export type TodoResponseProps = {
    message:string
}
