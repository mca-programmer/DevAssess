"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/features/auth/hooks";

const getDashboardPath = (role: string) => {
  if (role === "CANDIDATE") return "/candidate";
  if (role === "RECRUITER") return "/recruiter";
  if (role === "ADMIN") return "/admin";

  return "/";
};

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();

  const { data, isPending } = useGetMe();

  useEffect(() => {
    if(isPending) return;
    if (!data?.success || !data.data) return;

    router.replace(getDashboardPath(data.data.role));
  }, [data, router, isPending]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (data?.success && data.data) {
    return null;
  }

  return children;
};

export default GuestGuard;
