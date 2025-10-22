"use client";

import { useParams } from "next/navigation";
import RoomCanvas from "@/components/RoomCanvas";

export default function Page() {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;

  console.log(roomId);

  return (
    <div>
      <RoomCanvas roomId={roomId} />
    </div>
  );
}
