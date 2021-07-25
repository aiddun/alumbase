import React from "react";

export const PaddingContainer = ({ children }: {children: React.ReactNode}) => (
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 md:pt-10">
      {children}
  </div>
);
