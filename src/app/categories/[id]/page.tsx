import WatchDetail from "@/components/CategoryDetail/WatchDeatail";
import IPadDetail from "@/components/CategoryDetail/IpadDetail";
import IPhoneDetail from "@/components/CategoryDetail/IphoneDetail";
import MacDetail from "@/components/CategoryDetail/MacDetail";
import React from "react";
import AirPodsDetail from "@/components/CategoryDetail/AirpodsDetail";

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
