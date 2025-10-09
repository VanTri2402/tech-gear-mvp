import React from "react";
import { menuMacInfo } from "@/Data/MacInfo";
import Image from "next/image";
import { Separator } from "../ui/separator";
const MacDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const idDb = await prisma?.category.findUnique({
    where: { name: "Macbook" },
  });
  if (idDb?.id !== id) return <>Id not match</>;
  return (
    <div className="text-[#1D1D1F] flex flex-col items-center justify-center w-full h-auto px-15">
      <div className="h-[144px] bg-gray-50 pt-[4px] px-[0px] pb-[49px]"></div>
      <div className="h-[54px] py-[16px] text-[14px] text-gray-800 bg-[#F5F5F7]  flex items-center justify-center w-full">
        Thanh toán hàng tháng thật dễ dàng. Bao gồm lựa chọn lãi suất 0%.
        <span className="text-blue-500">Tìm hiểu thêm</span>
      </div>

      <div className="h-[244px] flex py-[80px] w-full items-center justify-between  font-sans">
        <div className=" text-[80px] font-bold">Mac</div>
        <div className="text-end text-[28px] font-semibold">
          Bạn nghĩ được <br /> Mac làm được.
        </div>
      </div>
      <div className="w-full py-[50px]">
        <video
          src="https://www.apple.com/assets-www/en_WW/mac/welcome/xd7bd68573_large_2x.mp4"
          className="object-cover object-center rounded-3xl mx-auto min-w-full max-h-[745px]"
        ></video>
      </div>

      <Separator />
      <Image
        src="https://www.apple.com/vn/mac/?focus=performance-and-battery"
        alt="Mac Performance and Battery"
        fill
        width={405}
        height={740}
      />

      <div className="flex flex-col mt-6 w-full justify-center">
        <h1 className="text-left font-bold text-[70px] ml-[">
          {menuMacInfo[0].title}
        </h1>
        <div className="flex overflow-x-scroll gap-6 mt-4 pb-4">
          {menuMacInfo[0].cards?.map((item, index) => (
            <div
              key={item.title}
              // 💡 Đặt kích thước cố định min-w/h cho thẻ cha
              className="relative min-w-[405px] h-[740px] rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition duration-300"
            >
              <Image
                src={menuMacInfo[0]?.cards?.[index]?.imageUrl}
                fill
                style={{ objectFit: "cover" }}
                className="absolute"
                alt={item.title}
              />
              {/* Thêm lớp phủ overlay để hiển thị text phía trên ảnh */}
              <div className="absolute right-2 top-2 text-right p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-3xl font-bold">{item.title}</h3>
                <p className="text-lg mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold my-10">Help Me Choose</h1>
        <div className="max-w-[800px] min-h-[580px] rounded-2xl bg-[#F5F5F7] "></div>
      </div>
    </div>
  );
};

export default MacDetail;
