"use client";
import { LogOutIcon, MessageCircle, Users2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useRoutes from "../hooks/useRoutes";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    <div className="hidden lg:flex">
      <aside className="h-full flex flex-col border-r-2">
        {routes.map((route) => {
          return (
            <div key={route.label} onClick={route.onClick}>
              <Link
                href={route.href}
                className={cn(
                  "group flex gap-x-3 space-y-5 p-3 m-2 text-sm leading-6 font-semibold text-muted-foreground hover:text-black hover:bg-gray-100 rounded-md",
                  route.active && "bg-gray-200 text-black"
                )}
              >
                <route.icon className="w-7 h-7" />
              </Link>
            </div>
          );
        })}
      </aside>
      <div>
        <h1>Headers</h1>
        <div>collapse button</div>
      </div>
      <div>Divider</div>
    </div>
  );
};

export default Sidebar;
