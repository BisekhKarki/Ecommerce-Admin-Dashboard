import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"


export default async function DashboardLayout({
   params,
   children
}:{
    params: {storeId: string},
    children:React.ReactNode
}) {

    const { userId } =auth()
    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }


    return(
        <>
       <Navbar  />
        {children}
        </>
    )


}