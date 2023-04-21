import BlogLayout from "@/src/components/layout/BlogLayout";
import React from "react";

function Updates() {
  return (
    <div className="container mx-auto h-28 flex flex-col justify-center items-center">
      <p>Counter-Strike Updates</p>
      <p>We're working on it.</p>
    </div>
  );
}

export default Updates;

Updates.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
