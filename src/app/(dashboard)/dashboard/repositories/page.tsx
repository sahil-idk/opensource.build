import React, { Suspense } from "react";
import { UserRepos } from "@/components/component/user-repos";

const UserRepositories = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your GitHub Repositories</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserRepos />
      </Suspense>
    </section>
  );
};

export default UserRepositories;
