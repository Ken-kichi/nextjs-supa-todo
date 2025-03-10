import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";

export const GET = async (req:NextRequest)=>{
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies:()=>cookieStore})

    const {searchParams} = new URL(req.url)

    const code = searchParams.get('code')

    if(code){
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL('/todo-list',req.url))
}
