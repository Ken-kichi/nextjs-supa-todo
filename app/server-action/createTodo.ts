'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoResponseProps,TodoCreateProps } from "../types"

export const createTodo = async ({title,description}:TodoCreateProps):Promise<TodoResponseProps>=>{
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        console.log('認証されていないユーザーはTODOを作成できません。')
        return {} as TodoResponseProps
    }

    const {error} = await supabase
        .from('todos')
        .insert([
            {
                title,
                description,
                user_id:user.id
            }
        ])

    if(error){
        console.log('データの挿入に失敗しました。',error)
        return {} as TodoResponseProps
    }

    revalidatePath('/todo-create')

    return {message:'成功しました。'}
}
