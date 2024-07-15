import TodoDetail from "@/app/components/TodoDetail";

const TodoDetailPage = async ({params}:{params:{id:string}})=>{
    const {id} = params

    return <TodoDetail id={Number(id)} />
}

export default TodoDetailPage
