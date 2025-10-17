import { HTTP_ENDPOINT } from "@/config";
import axios from "axios";

export default async function getExistingShapes(roomId : string): Promise<Shape[]> {
    const res = await axios.get(`${HTTP_ENDPOINT}/chats/${roomId}`);
    const messages = res.data.messages; 
    console.log(messages);
    const shapes = messages.map((x : {message : string})=>{
        const messageData = JSON.parse(x.message);
        return messageData.shape ;
    });

    return shapes;
}