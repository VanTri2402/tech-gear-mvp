import React, { JSX } from "react";
// import Image from "next/image"; // Không cần dùng Image của Next.js nếu dùng <img> thường
import { menuWatchInfo } from "@/Data/WatchInfo"; // Đảm bảo đường dẫn đúng
import { WatchTopNav } from "../ComponentDetailCategories/Nav";
import { SmoothScrollContainer } from "../ComponentDetailCategories/smooth";
import {
  Heart,
  Activity,
  Shield,
  Droplets,
  Battery,
  Smartphone,
  Watch,
  Headphones,
  Gift,
  Zap, // Zap có vẻ không dùng trong iconMap?
} from "lucide-react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "../ui/button";

// Icon mapping (giữ nguyên)
const iconMap: Record<string, JSX.Element> = {
  heart_health: <Heart className="w-12 h-12 text-gray-600" />, // Thêm màu mặc định
  fitness_activity: <Activity className="w-12 h-12 text-gray-600" />,
  safety_sos: <Shield className="w-12 h-12 text-gray-600" />,
  water_resistant: <Droplets className="w-12 h-12 text-gray-600" />,
  battery_optimized: <Battery className="w-12 h-12 text-gray-600" />,
  cellular_lte: <Smartphone className="w-12 h-12 text-gray-600" />,
  customize_faces: <Watch className="w-12 h-12 text-gray-600" />,
};

const WatchDetail = async ({ params }: { params: { id: string } }) => {
  const idDb = await prisma.category.findUnique({
    where: { name: "Watch" },
    include: { products: true },
  });
  if (idDb?.id !== params.id) {
    return <></>;
  }
  return (
    <div className="w-full bg-white text-[#1D1D1F]">
      {/* Top Navigation */}
      <div className="h-[52px]">
        <WatchTopNav />
      </div>
      {/* Promotional Banner */}
      <div className="w-full bg-[#F5F5F7] py-3 px-4 mt-16">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-[14px] leading-[1.42859]">
            Mua Apple Watch và nhận ưu đãi đặc biệt. Trả góp 0% lãi suất.{" "}
            <a href="#" className="text-[#0066CC] hover:underline">
              Tìm hiểu thêm
            </a>
          </p>
        </div>
      </div>
      {/* Hero Section */}
      <div className="w-full mx-auto px-4 md:px-15">
        <div className="flex items-center justify-between py-16 md:py-20">
          <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.05] tracking-tight">
            Apple Watch
          </h1>
          <div className="text-right">
            <h2 className="text-[21px] md:text-[28px] font-semibold leading-[1.14286] tracking-tight">
              Sức khỏe <br />
              trên cổ tay.
            </h2>
          </div>
        </div>

        {/* Product Display Section */}
        <section className="w-full pb-12 md:pb-20">
          {" "}
          {/* Bỏ py */}
          <div className="max-w-[1440px] mx-auto px-4 text-center">
            {/* Bỏ tiêu đề "Apple Watch" ở đây vì đã có ở Hero */}
            <div className="flex items-center justify-center gap-4 md:gap-6 ">
              {idDb?.products?.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  {/* Card Sản phẩm lấy từ DB (Giữ nguyên cấu trúc cũ vì khác card thông tin)*/}
                  <div className="bg-white rounded-[28px] min-h-[650px] min-w-[405px] max-w-[370px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div
                      className={`relative h-[420px] bg-gradient-to-br bg-[#A5B4FC] flex items-center justify-center`}
                    >
                      <div className="relative w-full h-full">
                        {/* Sử dụng thẻ <img> thường */}
                        <img
                          src={product.imageUrl || "/placeholder.jpg"}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy" // Thêm lazy loading
                        />
                      </div>
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-2xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="mb-6">
                        <p className="text-sm ">
                          Từ{" "}
                          <span className="font-semibold">
                            ${product.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm py-5">
                          Mua ngay
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Tìm hiểu thêm
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {(!idDb?.products || idDb.products.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Chưa có sản phẩm Watch nào trong hệ thống
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      {/* --- CÁC SECTION DÙNG LAYOUT ẢNH NỀN --- */}
      {/* Section 1: Khám Phá Apple Watch */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[0].title}
          </h2>
          <div className=" overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4">
            <SmoothScrollContainer>
              {menuWatchInfo[0].cards?.map((card, index) => (
                <div // Đổi <a> thành <div> vì có link bên trong
                  key={index}
                  className="relative group flex-shrink-0 w-[340px] md:w-[405px] h-[580px] md:h-[700px] rounded-[28px] overflow-hidden snap-center flex flex-col" // Thêm flex flex-col
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  <div className="relative z-20 p-6 md:p-8 text-white flex flex-col justify-end flex-grow">
                    <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[17px] md:text-[19px] leading-[1.42105] opacity-90 whitespace-pre-line mb-4">
                      {card.description}
                    </p>
                    {/* Link Tìm hiểu thêm nếu cần */}
                    {/* <Link href="#" className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start">...</Link> */}
                  </div>
                </div>
              ))}
            </SmoothScrollContainer>
          </div>
        </div>
      </section>
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 2: Sức Khỏe Và Thể Thao */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[1].title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuWatchInfo[1].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[400px] md:min-h-[500px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Dùng URL ảnh đã thay thế
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-12 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[17px] md:text-[19px] leading-[1.47059] opacity-90 mb-6">
                    {card.description}
                  </p>
                  <Link // Dùng Link thay vì <a>
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 3: Tập Luyện Và Hoạt Động */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[2].title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {menuWatchInfo[2].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[380px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Dùng URL ảnh đã thay thế
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-10 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] opacity-90 mb-5">
                    {card.description}
                  </p>
                  <Link // Dùng Link thay vì <a>
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bỏ Section 4: So Sánh (Không có ảnh) */}
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 5: Tại Sao Chọn Apple Watch (Chỉ có Icon) */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
            {menuWatchInfo[4].title} {/* Sử dụng title từ index 4 */}
          </h2>
          <div className=" pb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <SmoothScrollContainer>
              {/* Lặp qua WhyWatchCards từ index 4 */}
              {menuWatchInfo[4].WhyWatchCards?.map((card, index) => (
                <div
                  key={index}
                  className="text-center min-w-[344px] py-8 px-8 min-h-[312px] rounded-2xl bg-[#F5F5F7] flex flex-col items-center justify-center snap-center" // Tăng padding py-8
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 text-gray-600">
                    {" "}
                    {/* Tăng mb-6 */}
                    {iconMap[card.icon] || (
                      <Watch className="w-12 h-12 text-gray-600" />
                    )}
                  </div>
                  <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-3 text-gray-900">
                    {" "}
                    {/* Màu chữ */}
                    {card?.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] text-gray-600 max-w-[300px] mx-auto">
                    {" "}
                    {/* Giảm max-w */}
                    {card?.description}
                  </p>
                </div>
              ))}
            </SmoothScrollContainer>
          </div>
        </div>
      </section>
      <div className="w-full border-t border-gray-200 my-12"></div>{" "}
      {/* Separator sau section 5 */}
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 6: Dây Đeo Apple Watch */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[5].title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {menuWatchInfo[5].cards?.map((card, index) => (
              <div // Đổi <a> thành <div>
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[420px] group hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Dùng URL ảnh đã thay thế
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-10 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] opacity-90 mb-6">
                    {card.description}
                  </p>
                  <Link // Dùng Link
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 7: Apple Watch Trong Cuộc Sống */}
      <section className="w-full py-12 md:py-20 bg-[#FBFBFD]">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[6].title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuWatchInfo[6].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[380px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
                style={{ backgroundColor: "white" }} // Thêm nền trắng nếu cần
              >
                <img
                  src={card.imageUrl} // Dùng URL ảnh đã thay thế
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-12 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[17px] md:text-[19px] leading-[1.47059] opacity-90 mb-6">
                    {card.description}
                  </p>
                  <Link // Dùng Link thay vì <a>
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full border-t border-gray-200 my-12"></div>
      {/* Section 8: Apple Fitness+ */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[7].title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuWatchInfo[7].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[400px] md:min-h-[500px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Dùng URL ảnh đã thay thế
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-12 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[17px] md:text-[19px] leading-[1.47059] opacity-90 mb-6">
                    {card.description}
                  </p>
                  <Link // Dùng Link thay vì <a>
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Help Me Choose Section */}
      <section className="w-full py-12 md:py-20 bg-[#F5F5F7]">
        <div className="max-w-[980px] mx-auto px-4 text-center">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-6 leading-[1.07143] tracking-tight">
            Cần trợ giúp chọn Apple Watch của bạn?
          </h2>
          <p className="text-[19px] md:text-[21px] leading-[1.381] text-gray-700 mb-8">
            Trả lời một vài câu hỏi và chúng tôi sẽ giúp bạn tìm Apple Watch phù
            hợp nhất.
          </p>
          <button className="bg-[#0066CC] hover:bg-[#0055B3] text-white px-8 py-3 rounded-full text-[17px] font-medium transition-colors">
            Bắt đầu
          </button>
        </div>
      </section>
      {/* Bottom Spacer */}
      <div className="h-12 md:h-20"></div>
      {/* Footer Navigation Section (giữ nguyên) */}
      <footer className="w-full bg-[#F5F5F7] py-12 md:py-16">
        <div className="max-w-[980px] pl-10 px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.05] tracking-tight">
            Apple Watch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-semibold text-[24px]">
            {/* ... Nội dung footer ... */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Khám Phá Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <a href="/watch" className="hover:underline">
                    Khám Phá Tất Cả Apple Watch
                  </a>
                </li>
                <li>
                  <a
                    href="/watch/apple-watch-ultra-2"
                    className="hover:underline"
                  >
                    Apple Watch Ultra 2
                  </a>
                </li>
                <li>
                  <a
                    href="/watch/apple-watch-series-9"
                    className="hover:underline"
                  >
                    Apple Watch Series 9
                  </a>
                </li>
                <li>
                  <a href="/watch/apple-watch-se" className="hover:underline">
                    Apple Watch SE
                  </a>
                </li>
                <li>
                  <a href="/watch/nike" className="hover:underline">
                    Apple Watch Nike
                  </a>
                </li>
                <li>
                  <a href="/watch/hermes" className="hover:underline">
                    Apple Watch Hermès
                  </a>
                </li>
              </ul>
              <div className="pt-4 space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <p>
                  <a href="/watch/compare" className="hover:underline">
                    So Sánh Apple Watch
                  </a>
                </p>
                <p>
                  <a href="/watch/why-apple-watch" className="hover:underline">
                    Tại Sao Chọn Apple Watch
                  </a>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Mua Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <a href="/shop/watch" className="hover:underline">
                    Mua Apple Watch
                  </a>
                </li>
                <li>
                  <a href="/shop/watch/bands" className="hover:underline">
                    Dây Đeo Apple Watch
                  </a>
                </li>
                <li>
                  <a href="/shop/watch/accessories" className="hover:underline">
                    Phụ Kiện Apple Watch
                  </a>
                </li>
                <li>
                  <a href="/airpods" className="hover:underline">
                    AirPods
                  </a>
                </li>
                <li>
                  <a href="/trade-in" className="hover:underline">
                    Apple Trade In
                  </a>
                </li>
                <li>
                  <a href="/financing" className="hover:underline">
                    Tài Chính
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Tìm Hiểu Thêm Về Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <a href="/watch/support" className="hover:underline">
                    Hỗ Trợ Apple Watch
                  </a>
                </li>
                <li>
                  <a href="/applecare" className="hover:underline">
                    AppleCare+
                  </a>
                </li>
                <li>
                  <a href="/watchos" className="hover:underline">
                    watchOS 11
                  </a>
                </li>
                <li>
                  <a href="/apple-fitness-plus" className="hover:underline">
                    Apple Fitness+
                  </a>
                </li>
                <li>
                  <a href="/watch/health" className="hover:underline">
                    Sức Khỏe
                  </a>
                </li>
                <li>
                  <a href="/watch/family-setup" className="hover:underline">
                    Thiết Lập Gia Đình
                  </a>
                </li>
                <li>
                  <a href="/apple-pay" className="hover:underline">
                    Apple Pay
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WatchDetail;
