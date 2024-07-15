'use server'

import { cookies } from "next/headers"
import { TodoResponseProps,TodoUpdateProps } from "../types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

const updateTodo = async ({id,title,description}:TodoUpdateProps):Promise<TodoResponseProps>=>{
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        alert('認証されていないユーザーはTODOを更新できません。')
        return {} as TodoResponseProps
    }

    const {error} = await supabase
        .from('todos')
        .update({
            title,
            description,
            updated_at:new Date()
        })
        .match({id:id,user_id:user.id})

    if(error){
        console.error('情報の更新に失敗しました。：',error)
        return {} as TodoResponseProps
    }

    return {message:'成功しました。'}
}

export default updateTodo
