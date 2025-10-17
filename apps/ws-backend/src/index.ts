import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWTTOKENSECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWTTOKENSECRET);

        if (typeof decoded === 'string' || !decoded || !decoded.userId) {
            return null;
        }
        return decoded.userId;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
    // FIX 6: Removed redundant 'return null'
}

// Global variable to store the state of the socket
interface User {
    userId: string;
    rooms: string[]; 
    ws: WebSocket;
}
// Using a Map is more efficient for lookups and deletions than an array
const users = new Map<WebSocket, User>();

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        ws.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if (userId == null) {
        ws.close();
        return;
    }

    const newUser: User = {
        userId,
        rooms: [],
        ws: ws
    };
    users.set(ws, newUser);
    console.log(`User ${userId} connected. Total users: ${users.size}`);

    ws.on('message', async function message(data) {
        let parsedData;
        
        // FIX 1: The 'try...catch' block is ESSENTIAL to prevent server crashes
        try {
            parsedData = JSON.parse(data.toString());
        } catch (error) {
            console.error("Failed to parse incoming message:", data.toString());
            // Optionally send an error back to the client
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON format.' }));
            return;
        }

        const currentUser = users.get(ws);
        if (!currentUser) {
            // Should not happen if connection logic is correct, but a good safeguard
            ws.close();
            return;
        }

        if (parsedData.type === 'join_room') {
            const roomId = parsedData.roomId;
            if (roomId && !currentUser.rooms.includes(roomId)) {
                currentUser.rooms.push(roomId);
                console.log(`User ${currentUser.userId} joined room ${roomId}`);
            }
        }

        if (parsedData.type === 'leave_room') {
            // FIX 3: Corrected the filter logic to remove the room
            const roomId = parsedData.roomId;
            currentUser.rooms = currentUser.rooms.filter(r => r !== roomId);
            console.log(`User ${currentUser.userId} left room ${roomId}`);
        }

        if (parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            
            // FIX 4: Convert roomId to a number before database interaction
            const roomIdAsNumber = parseInt(roomId, 10);
            if (isNaN(roomIdAsNumber)) {
                console.error("Invalid roomId for chat:", roomId);
                return;
            }

            // Save chat to the database -> approach is to use the qeueue
            await prismaClient.chat.create({
                data: {
                    roomId: roomIdAsNumber, // Use the converted number
                    message: message,
                    userId: currentUser.userId
                }
            });

            // Broadcast the message to all users in the same room
            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        roomId,
                        message: message,
                        sender: currentUser.userId
                    }));
                }
            });
        }
    });

    // FIX 2: Added a 'close' event handler to prevent memory leaks
    ws.on('close', () => {
        const leavingUser = users.get(ws);
        if (leavingUser) {
            users.delete(ws);
            console.log(`User ${leavingUser.userId} disconnected. Total users: ${users.size}`);
        }
    });
});

console.log("WebSocket server started on port 8080");