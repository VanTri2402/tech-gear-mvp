import WatchDetail from "@/features/categories/components/WatchDeatail";
import IPadDetail from "@/features/categories/components/IpadDetail";
import IPhoneDetail from "@/features/categories/components/IphoneDetail";
import MacDetail from "@/features/categories/components/MacDetail";
import React from "react";
import AirPodsDetail from "@/features/categories/components/AirpodsDetail";
import prisma from "@/lib/prisma";

const DetailCategory = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MacDetail params={params} />
      <IPhoneDetail params={params} />
      <IPadDetail params={params} />
      <WatchDetail params={params} />
      <AirPodsDetail params={params} />
    </div>
  );
};

export default DetailCategory;
