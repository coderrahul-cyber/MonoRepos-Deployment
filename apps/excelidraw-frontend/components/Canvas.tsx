"use client";
// import { initDraw } from "@/drawLogic";
import { useEffect, useRef, useState } from "react";
import { IconButton} from "./IconsButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/drawLogic/Game";

export type tool = "circle" | "rect" | "pencil"

export default function Canvas({roomId , socket} : {roomId : string , socket : WebSocket} ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool , setSelectedTool]  =  useState<tool>("circle");
    const [game , setGame] = useState<Game>();

    useEffect(()=>{
       game?.setShape(selectedTool);
    },[selectedTool , game]);


    useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current , roomId , socket);
      setGame(g);
      //bad approach
      // const canvass = canvasRef.current;
      // initDraw(canvass,roomId , socket);
      return (()=>{
        g.destroy();
      })
    }
  }, [canvasRef])
  return (
    <div style={{
      height : "100vh",
      overflow : "hidden"
    }}>
        <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth} ></canvas>
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
    
  )
}

function TopBar({selectedTool , setSelectedTool}:{
  selectedTool : tool,
  setSelectedTool : (s :tool)=> void
}){
  return         <div style={{
          position : "fixed",
          top:10,
          left:10
        }}>
          <div className="flex gap-2 ">

          <IconButton icon={<Pencil />} activated={selectedTool === "pencil"} onClick={()=>{
            setSelectedTool("pencil")
          }} />
          <IconButton icon={<RectangleHorizontalIcon />} activated={selectedTool === "rect"} onClick={()=>{
            setSelectedTool("rect")
          }} />
          <IconButton icon={<Circle />} activated={selectedTool === "circle"}  onClick={()=>{
            setSelectedTool("circle")
          }} />
          </div>

        </div>
}