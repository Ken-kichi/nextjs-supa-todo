'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoDetailProps,TodoIdProps } from "../types"

const getTodo = async ({id}:TodoIdProps):Promise<{todo:TodoDetailProps}>=>{
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        alert('認証されていないユーザーはTODOを表示できません。')
        return {
            todo:{} as TodoDetailProps
        }
    }

    const {data,error} = await supabase
        .from('todos')
        .select('*')
        .match({id:id,user_id:user.id})

    if(error){
        console.error('情報の取得に失敗しました。：',error)
        return {
            todo:{} as TodoDetailProps
        }
    }

    if(!data){
        console.error('情報の取得に失敗しました。')
        return {
            todo:{} as TodoDetailProps
        }
    }

    revalidatePath(`/todo-list/${id}`)
    return {
        todo:data[0] as TodoDetailProps
    }
}

export default getTodo
