import { HTTP_ENDPOINT } from "@/config";
import axios from "axios";

type Shape = {
    type: 'rect';
    x:number;
    y:number;
    width: number;
    height: number;
} | {
    type : 'circle';
    centerX :number;
    centerY : number;
    radius : number;
} | {
    type : 'pencil';
    startX : number;
    startY : number;
    endX:number;
    endY : number;
}
//canvas works on 20fps that already better for the performance that ;s why we are not use the react
export async function initDraw(canvass : HTMLCanvasElement , roomId  : string , socket : WebSocket) {
    const ctx = canvass.getContext('2d');
    const existingShapes : Shape[] = await getExistingShapes(roomId);
    if(!ctx) return;

    socket.onmessage = (event)=>{
        const message = JSON.parse(event.data);
        if(message.type == 'chat'){
            const paresedShape= JSON.parse(message.message);
            existingShapes.push(paresedShape.shape);
            clearCanvas(existingShapes , ctx , canvass);
        }
    }


    clearCanvas(existingShapes , ctx , canvass);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0,0,canvass.width,canvass.height);
    let clicked = false;
      let startX = 0 ;
      let startY = 0 ;
      canvass.addEventListener('mousedown' , (e)=>{
       clicked = true;
       startX = e.clientX;
       startY = e.clientY;
      })


      canvass.addEventListener('mouseup' , (e)=>{
       clicked = false;
       const width = e.clientX - startX;
       const height = e.clientY - startY;
       
       //@ts-ignore
       const selectedTool = window.selectedTool;
       let shape : Shape  | null = null ; 
       if(selectedTool === 'rect'){

            shape = {
            type :"rect",
            x : startX,
            y : startY,
            width,
            height
           };
        }else if(selectedTool === 'circle'){
            const radius = Math.max(width , height) / 2 ;
            
            shape = {
             type :"circle",
              radius : radius ,
              centerX : startX + radius,
              centerY : startY + radius,
            };
       }
       if(!shape) return;
        existingShapes.push(shape);

       socket.send(JSON.stringify({
         type : 'chat',
         message : JSON.stringify({
            shape
         }),
         roomId
       }))
      })
      //1:14


      canvass.addEventListener('mousemove' , (e)=>{
       if(clicked){
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        ctx.clearRect(0,0,canvass.width,canvass.height);// clearing before every render
        clearCanvas(existingShapes , ctx , canvass);
        ctx.strokeStyle = 'red';
        //@ts-ignore
        const selectedTool = window.selectedTool;
        if(selectedTool === "rect"){
            ctx.strokeRect(startX , startY , width , height);
        }else if(selectedTool === "circle"){
            const radius = Math.max(width , height) / 2;
            const centerX = startX + radius ;
            const centerY = startY + radius ;
            ctx.beginPath();
            ctx.arc(centerX , centerY , radius , 0 , Math.PI *2 );
            ctx.stroke();
            ctx.closePath();
        }
       }
      })
}

//fuunction to redraw all shapes
function clearCanvas(existingShapes : Shape[] , ctx : CanvasRenderingContext2D , canvass : HTMLCanvasElement ){
    ctx.clearRect(0,0,canvass.width,canvass.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0,0,canvass.width,canvass.height);
    existingShapes.map((shape)=>{
        if(shape.type === 'rect'){
            ctx.strokeStyle = 'red';
            ctx.strokeRect(shape.x , shape.y , shape.width , shape.height);
        }else if(shape.type === "circle"){
            ctx.beginPath();
            ctx.arc(shape.centerX , shape.centerY , shape.radius , 0 , Math.PI *2 );
            ctx.stroke();
            ctx.closePath();
        }
    })
}

async function getExistingShapes(roomId : string): Promise<Shape[]> {
    const res = await axios.get(`${HTTP_ENDPOINT}/chats/${roomId}`);
    const messages = res.data.messages; 
    console.log(messages);
    const shapes = messages.map((x : {message : string})=>{
        const messageData = JSON.parse(x.message);
        return messageData.shape ;
    });

    return shapes;
}