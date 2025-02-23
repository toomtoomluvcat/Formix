"use client"

import React, { useEffect, useState } from 'react'

function page() {
  const [token,setToken] = useState<string|null>(null)
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    removeToken()
  },[])
  const removeToken=():void=>{
    localStorage.removeItem("token")
  }
  return (
    
    <div>{token}</div>
  )
}

export default page