import { tool } from "@/components/Canvas";
import getExistingShapes from "./http";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShape: Shape[];
  private roomId: string;
  socket: WebSocket;
  private clicked : boolean; 
  private startX : number = 0 ;
  private startY : number = 0;
  private selectedTool : tool = "circle";
  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShape = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandler();
    this.initMouseHandlers();
  }
  setShape(tool: "circle" | "pencil" | "rect" ){
    this.selectedTool =tool;
  }

  async init() {
    this.existingShape = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type == "chat") {
        const paresedShape = JSON.parse(message.message);
        this.existingShape.push(paresedShape.shape);
        this.clearCanvas();
      }
    };
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShape.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }
  mouseUpHandler= (e)=>{

        this.clicked = false;
       const width = e.clientX - this.startX;
       const height = e.clientY - this.startY;
       
       const selectedTool = this.selectedTool;
       let shape : Shape  | null = null ; 
       if(selectedTool === 'rect'){

            shape = {
            type :"rect",
            x : this.startX,
            y : this.startY,
            width,
            height
           };
        }else if(selectedTool === 'circle'){
            const radius = Math.max(width , height) / 2 ;
            
            shape = {
             type :"circle",
              radius : radius ,
              centerX : this.startX + radius,
              centerY : this.startY + radius,
            };
       }
       if(!shape) return;
        this.existingShape.push(shape);

       this.socket.send(JSON.stringify({
         type : 'chat',
         message : JSON.stringify({
            shape
         }),
         roomId : this.roomId
       }))

  }


  mouseDownHandler = (e)=>{
      this.clicked = true ;
        this.startX = e.clientX;
        this.startY = e.clientY;

  }

  mouseMoveHandler = (e)=>{
 if(this.clicked){
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);// clearing before every render
        this.clearCanvas();
       this.ctx.strokeStyle = 'red';
        const selectedTool = this.selectedTool;
        if(selectedTool === "rect"){
            this.ctx.strokeRect(this.startX , this.startY , width , height);
        }else if(selectedTool === "circle"){
            const radius = Math.max(width , height) / 2;
            const centerX = this.startX + radius ;
            const centerY = this.startY + radius ;
            this.ctx.beginPath();
            this.ctx.arc(centerX , centerY , Math.abs(radius) , 0 , Math.PI *2 );
            this.ctx.stroke();
            this.ctx.closePath();
        }
       }
  }

  destroy(){
      this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
     this.canvas.removeEventListener('mouseup' ,this.mouseUpHandler);

      this.canvas.removeEventListener('mousemove' , this.mouseMoveHandler);
  }
  initMouseHandlers(){
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
     this.canvas.addEventListener('mouseup' ,this.mouseUpHandler);

      this.canvas.addEventListener('mousemove' , this.mouseMoveHandler);
  }
}

//Add pencil functionality 
// add panning and the zoom like the excildraw
// more class like for the circle , rect and pencil for more structure 
