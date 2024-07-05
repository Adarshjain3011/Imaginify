/* eslint-disable camelcase */
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined");
    return new Response("Internal Server Error", { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Bad Request", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Bad Request", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId: id || "",
        email: email_addresses[0].email_address || "",
        username: username! || "",
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
      };

      const newUser = await createUser(user);
      return NextResponse.json({ message: "User created", user: newUser });
    }

    if (eventType === "user.updated") {
      if (!id) {
        console.error("User ID is undefined for user.updated event");
        return new Response("Bad Request", { status: 400 });
      }

      const { image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name || "",
        lastName: last_name || "",
        username: username! || "",
        photo: image_url || "",
      };

      const updatedUser = await updateUser(id, user);
      return NextResponse.json({ message: "User updated", user: updatedUser });
    }

    if (eventType === "user.deleted") {
      if (!id) {
        console.error("User ID is undefined for user.deleted event");
        return new Response("Bad Request", { status: 400 });
      }

      const deletedUser = await deleteUser(id!);
      return NextResponse.json({ message: "User deleted", user: deletedUser });
    }

    console.log(`Unhandled event type: ${eventType}`);
    return new Response("Unhandled event type", { status: 400 });

  } catch (error) {
    console.error("Error processing event:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
