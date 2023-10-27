import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = { Icon: LucideIcon; onClick: () => void; disabled: boolean };

export const AuthSocialButton = ({ Icon, onClick, disabled }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="bg-white border border-muted-foreground w-full hover:bg-gray-200"
      disabled={disabled}
    >
      <Icon className="text-muted-foreground" />
    </Button>
  );
};
