import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { firebaseUid, email, name, role } = await req.json();

    if (!firebaseUid || !email || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (role !== "CLIENT" && role !== "ADMIN") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        id: firebaseUid,
        email,
        password: "FIREBASE_AUTH", // Placeholder since Firebase handles auth
        name,
        role,
      },
    });

    // Create the associated profile
    if (role === "CLIENT") {
      await prisma.clientProfile.create({
        data: {
          userId: user.id,
          businessName: name + "'s Business",
          industry: "Unspecified",
          goals: "",
        },
      });
    } else {
      await prisma.adminProfile.create({
        data: {
          userId: user.id,
          skills: "[]",
        },
      });
    }

    return NextResponse.json({ message: "User created successfully", user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
