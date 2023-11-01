import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { signOut } from "next-auth/react";
import { LogOut, MessageCircle, Users2 } from "lucide-react";
import { useMemo } from "react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: MessageCircle,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/Users",
        icon: Users2,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "",
        onClick: () => signOut(),
        icon: LogOut,
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
