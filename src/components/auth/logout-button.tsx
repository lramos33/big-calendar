"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function LogoutButton() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
