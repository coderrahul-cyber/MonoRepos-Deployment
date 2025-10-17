"use client";
import { WS_ENDPOINT } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";


export default  function RoomCanvas({roomId} : {roomId : string}) {
   const [loading , setLoading] =  useState(false);
   const [socket , setSocket] = useState<WebSocket>();
// For canvas we should put in different js floder
useEffect(()=>{
    const ws = new WebSocket(`${WS_ENDPOINT}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YjMyZDUxMS1kMzI5LTRjY2UtYTcwYS1hNGVjOWE3ODA0N2EiLCJpYXQiOjE3NTc3NzkwNzV9.XANfSqf_gH_1UKgsTozD4yN6WYOTCfcYcgPNqKZjHLI`);
    ws.onopen = ()=>{
        setSocket(ws);
        ws.send(JSON.stringify({
          type : "join_room",
          roomId :roomId
        }))
        console.log("WebSocket connected");
        setLoading(true);
    }
} , [])
  

  return loading ?  (
      <div>
        <Canvas roomId={roomId} socket={socket}  />
    {/* <canvas ref={canvasRef} height={1080} width={1080} > */}
      </div>
  ) : <div>Loading...</div>
}