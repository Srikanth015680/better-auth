
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type UserRole = "USER" | "ADMIN";

type ActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

// DELETE USER
export async function deleteUserAction(
  userId: string
): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, message: "You must sign in first." };
    }

    if (session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to delete users.",
      };
    }

    if (!userId || typeof userId !== "string") {
      return { success: false, message: "Invalid user ID." };
    }

    if (userId === session.user.id) {
      return {
        success: false,
        message: "You cannot delete your own account.",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Protect every ADMIN account
    if (user.role === "ADMIN") {
      return {
        success: false,
        message: "Admin accounts cannot be deleted.",
      };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error("Delete user error:", error);

    return {
      success: false,
      message: "Unable to delete user. Please try again.",
    };
  }
}

// UPDATE USER ROLE
export async function updateUserRoleAction(
  userId: string,
  newRole: UserRole
): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, message: "You must sign in first." };
    }

    if (session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "Admin access required.",
      };
    }

    if (
      !userId ||
      typeof userId !== "string" ||
      !["USER", "ADMIN"].includes(newRole)
    ) {
      return {
        success: false,
        message: "Invalid user ID or role.",
      };
    }

    if (userId === session.user.id) {
      return {
        success: false,
        message: "You cannot change your own role.",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Protect every ADMIN account from role changes
    if (user.role === "ADMIN") {
      return {
        success: false,
        message: "Admin accounts cannot be modified.",
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `User role updated to ${newRole}.`,
    };
  } catch (error) {
    console.error("Update role error:", error);

    return {
      success: false,
      message: "Unable to update user role. Please try again.",
    };
  }
}
