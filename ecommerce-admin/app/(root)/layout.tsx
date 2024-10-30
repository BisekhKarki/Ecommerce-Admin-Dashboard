

import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function SetupLayout({
    children
}:{
    children:React.ReactNode
}) {


    const { userId } = auth()

    if(!userId){
        redirect('/sign-in')
    }

    const billboard = await prismadb.billboard.findFirst({
        where: {
            id:userId
        }
    })

    const store = await prismadb.store.findFirst({
        where:{
            userId
        }
    })

    

    if(store){
        redirect(`/${store.id}`)
    }

  return (
   <>
   {children}
   </>
  )
}