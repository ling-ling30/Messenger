"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

function LogoutButton({}: Props) {

  const handleLogout = async () => {
    signOut();
  };
  return <Button onClick={() => handleLogout()}>LogoutButton</Button>;
}

export default LogoutButton;
