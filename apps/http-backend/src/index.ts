import express from "express";
import jwt from "jsonwebtoken";
import { JWTTOKENSECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, RoomSchema, SignInSchema } from "@repo/common/types";
import {prismaClient} from "@repo/db/client";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors())


app.post("/signup",async (req, res) => {
  const parseData = CreateUserSchema.safeParse(req.body);
  if (!parseData.success) {
    console.log(parseData.error);
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  try{

   const user = await prismaClient.user.create({
      data:{
        email : parseData.data.username,
        //hashing the password
        password : parseData.data.password,
        name : parseData.data.name
      }
    })
  
    res.json({
      userId: user.id,
    });
  }catch(e){
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
const parseData = SignInSchema.safeParse(req.body);
  if (!parseData.success) {
    console.log(parseData.error);
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where:{
      email: parseData.data.username,
      password: parseData.data.password
    }
  });
  if(!user){
    res.status(401).json({
      message: "Invalid credentials",});
      return;
  }
  const token = jwt.sign(
    {
      userId : user.id
    },
    JWTTOKENSECRET
  );
  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  //db call
  const parseData = RoomSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
   //@ts-ignore
  const userId = req.userId;
  try{

    const room = await prismaClient.room.create({
      data : {
        slug : parseData.data.name + "-room",
        adminId : userId
      }
    });
    res.json({
      roomId: room.id,
      slug: room.slug
    });
  }catch(e){
    res.status(411).json({
      message: "Room already exists",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  // console.log(roomId)

  const messages = await prismaClient.chat.findMany({
    where:{
      roomId
    },
    orderBy:{
      id : 'asc'
    },
    take:1000
  });

  res.json({
    messages
  });


});
app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where:{
      slug
    }
  });

  console.log(room);

  res.json({
     room
  })

});


app.listen(3001);
