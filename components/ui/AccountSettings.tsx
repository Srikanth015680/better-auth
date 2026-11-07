
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  LockKeyhole,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountSettingsProps {
  initialName: string;
  initialImage: string;
}

export function AccountSettings({
  initialName,
  initialImage,
}: AccountSettingsProps) {
  const router = useRouter();

  // Profile states
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [profilePending, setProfilePending] = useState(false);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);

  // Update profile
  async function handleProfileUpdate(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setProfilePending(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setProfilePending(false);
    }
  }

  // Change password
  async function handlePasswordUpdate(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 12) {
      toast.error("Password must contain at least 12 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("Choose a different password");
      return;
    }

    setPasswordPending(true);

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setPasswordPending(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Update Profile */}
      <form
        onSubmit={handleProfileUpdate}
        className="p-5 space-y-4 border rounded-xl"
      >
        <div className="flex items-center gap-2">
          <UserRound className="w-5 h-5 text-primary" />

          <h2 className="text-lg font-semibold">
            Update Profile
          </h2>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>

          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={profilePending}
          />
        </div>

        {/* Profile Image URL */}
        <div className="space-y-2">
          <Label htmlFor="profile-image">
            Profile Image URL
          </Label>

          <Input
            id="profile-image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/profile.jpg"
            disabled={profilePending}
          />
        </div>

        {/* Image Preview */}
        {image.trim() && (
          <div className="space-y-2">
            <Label>Image Preview</Label>

            <Image
              src={image.trim()}
              alt="Profile preview"
              width={80}
              height={80}
              unoptimized
              className="object-cover w-20 h-20 border rounded-full"
            />
          </div>
        )}

        {/* Save Profile */}
        <Button type="submit" disabled={profilePending}>
          {profilePending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </form>

      {/* Change Password */}
      <form
        onSubmit={handlePasswordUpdate}
        className="p-5 space-y-4 border rounded-xl"
      >
        <div className="flex items-center gap-2">
          <LockKeyhole className="w-5 h-5 text-primary" />

          <h2 className="text-lg font-semibold">
            Change Password
          </h2>
        </div>

        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="current-password">
            Current Password
          </Label>

          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            disabled={passwordPending}
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="new-password">
            New Password
          </Label>

          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            disabled={passwordPending}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">
            Confirm New Password
          </Label>

          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            disabled={passwordPending}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Your new password must contain at least 12 characters.
        </p>

        {/* Change Password Button */}
        <Button type="submit" disabled={passwordPending}>
          {passwordPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </div>
  );
}
