'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoDetailProps } from "../types"

const getTodoList = async ():Promise<{todos:TodoDetailProps[]}>=>{
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        alert('認証されていないユーザーはTODOを表示できません。')
        return {
            todos:[] as TodoDetailProps[]
        }
    }

    const {data,error} = await supabase
        .from('todos')
        .select('*')
        .eq('user_id',user.id)
        .order('title',{ascending:true})

    if(error){
        console.error('情報の取得に失敗しました。：',error)
        return {
            todos:[] as TodoDetailProps[]
        }
    }

    if(!data){
        console.error("情報の取得に失敗しました。")
        return {
            todos:[] as TodoDetailProps[]
        }
    }

    revalidatePath('/todo-list')
    return {
        todos:data
    }
}

export default getTodoList
