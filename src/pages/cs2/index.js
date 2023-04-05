import CS2Layout from "@/src/components/layout/CS2Layout";
import React from "react";

function CS2() {
  return <div>CS2</div>;
}

export default CS2;

CS2.getLayout = function getLayout(page) {
  return <CS2Layout>{page}</CS2Layout>;
};
