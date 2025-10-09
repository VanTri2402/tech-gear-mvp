import MacDetail from "@/components/CategoryDetail/MacDetail";
import React from "react";

const DetailCategory = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MacDetail params={params} />
    </div>
  );
};

export default DetailCategory;
