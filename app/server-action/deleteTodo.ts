'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoIdProps,TodoResponseProps } from "../types"

const deleteTodo = async ({id}:TodoIdProps):Promise<TodoResponseProps>=>{
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        alert('認証されていないユーザーはTODOを削除できません。')
        return {} as TodoResponseProps
    }

    const {error} = await supabase
        .from('todos')
        .delete()
        .match({id:id,user_id:user.id})

    if(error){
        console.error('削除に失敗しました。:',error)
        return {} as TodoResponseProps
    }

    revalidatePath(`/todo-list/${id}`)
    return {message:'成功しました。'}
}

export default deleteTodo
