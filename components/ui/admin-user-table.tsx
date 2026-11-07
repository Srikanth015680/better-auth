
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  ShieldCheck,
  UserRound,
  Save,
  Trash2,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  deleteUserAction,
  updateUserRoleAction,
} from "@/actions/admin.actions";

type UserRole = "USER" | "ADMIN";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AdminUserTableProps = {
  users: AdminUser[];
};

export function AdminUserTable({ users }: AdminUserTableProps) {
  const router = useRouter();

  const [selectedRoles, setSelectedRoles] = useState<
    Record<string, UserRole>
  >({});

  const [isPending, startTransition] = useTransition();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, role: UserRole) => {
    setSelectedRoles((previous) => ({
      ...previous,
      [userId]: role,
    }));
  };

  const handleUpdateRole = (user: AdminUser) => {
    const newRole = selectedRoles[user.id];

    if (!newRole || newRole === user.role) {
      toast.info("No role changes to save.");
      return;
    }

    if (user.role === "ADMIN") {
      toast.error("Admin accounts cannot be modified here.");
      return;
    }

    const confirmed = window.confirm(
      `Change ${user.name}'s role from ${user.role} to ${newRole}?`
    );

    if (!confirmed) return;

    startTransition(async () => {
      setUpdatingId(user.id);

      try {
        const result = await updateUserRoleAction(user.id, newRole);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);

        setSelectedRoles((previous) => {
          const updated = { ...previous };
          delete updated[user.id];
          return updated;
        });

        router.refresh();
      } catch {
        toast.error("Something went wrong while updating the role.");
      } finally {
        setUpdatingId(null);
      }
    });
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.role === "ADMIN") {
      toast.error("Admin accounts cannot be deleted here.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    startTransition(async () => {
      setDeletingId(user.id);

      try {
        const result = await deleteUserAction(user.id);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        router.refresh();
      } catch {
        toast.error("Something went wrong while deleting the user.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="w-full overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-2 px-6 py-5 border-b border-slate-200 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            User Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage user roles and accounts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <UserRound className="w-4 h-4" />
          <span>{users.length} total users</span>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <UserRound className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          <p className="font-medium text-slate-700 dark:text-slate-300">
            No users found
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs tracking-wider uppercase bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Update Role</th>
                <th className="px-6 py-4 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => {
                const isAdmin = user.role === "ADMIN";
                const selectedRole = selectedRoles[user.id] ?? user.role;
                const roleChanged = selectedRole !== user.role;

                const rowBusy =
                  isPending &&
                  (updatingId === user.id || deletingId === user.id);

                return (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-slate-100 dark:bg-slate-800">
                          {isAdmin ? (
                            <ShieldCheck className="w-5 h-5 text-purple-600" />
                          ) : (
                            <UserRound className="w-5 h-5 text-blue-600" />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user.id.slice(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isAdmin
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        }`}
                      >
                        {isAdmin ? (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        ) : (
                          <UserRound className="h-3.5 w-3.5" />
                        )}
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedRole}
                          disabled={isAdmin || isPending}
                          onChange={(event) =>
                            handleRoleChange(
                              user.id,
                              event.target.value as UserRole
                            )
                          }
                          className="px-3 text-sm transition bg-white border rounded-lg outline-none h-9 border-slate-200 text-slate-700 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:disabled:bg-slate-800"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>

                        <Button
                          size="sm"
                          onClick={() => handleUpdateRole(user)}
                          disabled={
                            isAdmin ||
                            !roleChanged ||
                            isPending
                          }
                          className="gap-1.5"
                        >
                          {updatingId === user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          Update
                        </Button>

                        {isAdmin && (
                          <span title="Admin role is locked">
                            <Lock className="w-4 h-4 text-slate-400" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user)}
                        disabled={isAdmin || isPending}
                        className="gap-1.5"
                      >
                        {deletingId === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 px-6 py-4 text-xs border-t border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
          Admin accounts are protected
        </span>
        <span className="flex items-center gap-1.5">
          <UserRound className="h-3.5 w-3.5 text-blue-600" />
          Regular users can be managed
        </span>
      </div>
    </div>
  );
}
