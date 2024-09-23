import React from "react";

export const NotFound: React.FC = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
      <h1 className="uppercase tracking-widest text-gray-500 dark:text-gray-400">
        404 | Not Found
      </h1>
    </div>
  );
};
