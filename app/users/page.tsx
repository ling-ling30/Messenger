import React, { useEffect } from "react";
import LogoutButton from "./_components/LogoutButton";
import { useSession } from "next-auth/react";

type Props = {};

const Page = (props: Props) => {

  return (
    <div>
      Users
      <LogoutButton />
    </div>
  );
};

export default Page;
