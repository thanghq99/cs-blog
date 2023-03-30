import BlogLayout from "@/components/layout/BlogLayout";
import React from "react";

function Updates() {
  return <div>Counter-Strike Updates</div>;
}

export default Updates;

Updates.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
