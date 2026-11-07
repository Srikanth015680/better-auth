
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/generated/prisma/enums";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

export const UserRoleSelect = ({
  userId,
  role,
}: UserRoleSelectProps) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRole = event.target.value as UserRole;

    if (newRole === role) return;

    setIsUpdating(true);

    try {
      const { error } = await authClient.admin.setRole({
        userId,
        role: newRole,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("User role updated successfully!");

      router.refresh();
    } catch {
      toast.error("Something went wrong while updating the role.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={isUpdating}
      className="p-2 text-sm border rounded-md bg-background disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value={UserRole.USER}>USER</option>
      <option value={UserRole.ADMIN}>ADMIN</option>
    </select>
  );
};
