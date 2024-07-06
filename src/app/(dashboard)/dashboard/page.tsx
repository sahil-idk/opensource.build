import { UserDashboard } from "@/components/component/user-dashboard";
import { currentUser } from "@clerk/nextjs/server";
import React, { Suspense } from "react";

const UserPage = async () => {
  const user = await currentUser();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboard user={user} />
    </Suspense>
  );
};

export default UserPage;
