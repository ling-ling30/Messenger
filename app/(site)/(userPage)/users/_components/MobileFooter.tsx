"use client";
import React from "react";
import useRoutes from "../hooks/useRoutes";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {};

function MobileFooter({}: Props) {
  const routes = useRoutes();
  return (
    <div className="fixed w-full bg-white lg:hidden border-t-2 bottom-0 text-center flex justify-evenly items-center z-10">
      {routes.map((route) => (
        <div
          className="w-full h-full text-center "
          key={route.label}
          onClick={route.onClick}
        >
          <Link
            href={route.href}
            className={cn(
              "group flex gap-x-3 p-3 w-full h-full text-sm  justify-center items-center leading-6 font-semibold text-muted-foreground hover:text-black hover:bg-gray-200",
              route.active && "bg-gray-200 text-black"
            )}
          >
            <route.icon className="w-8 h-8" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MobileFooter;
