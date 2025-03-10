import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest,NextResponse } from "next/server";

export const middleware = async (req:NextRequest)=>{
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req,res})

    const {data:{user}} = await supabase.auth.getUser()

    if(user && req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/todo-list',req.url))
    }

    if(!user && req.nextUrl.pathname !== '/'){
        return NextResponse.redirect(new URL('/',req.url))
    }

    return res
}

export const config = {
    matcher:['/','/todo-list']
}
