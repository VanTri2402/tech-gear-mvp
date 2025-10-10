import React from "react";
import Image from "next/image";
import { menuWatchInfo } from "@/Data/WatchInfo";
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
  Zap,
} from "lucide-react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "../ui/button";
// Icon mapping
const iconMap = {
  heart_health: <Heart className="w-12 h-12" />,
  fitness_activity: <Activity className="w-12 h-12" />,
  safety_sos: <Shield className="w-12 h-12" />,
  water_resistant: <Droplets className="w-12 h-12" />,
  battery_optimized: <Battery className="w-12 h-12" />,
  cellular_lte: <Smartphone className="w-12 h-12" />,
  customize_faces: <Watch className="w-12 h-12" />,
};

// Top Navigation Component

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

        <section className="w-full py-12 md:py-20">
          <div className="max-w-[1440px] mx-auto px-4 text-center">
            <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
              Apple Watch
            </h2>

            <div className="flex items-center justify-center gap-4 md:gap-6 ">
              {idDb?.products?.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="bg-white rounded-[28px] min-h-[650px] min-w-[405px] max-w-[370px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image with Gradient */}
                    <div
                      className={`relative h-[420px] bg-gradient-to-br bg-[#A5B4FC] flex items-center justify-center`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={product.imageUrl || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
                          quality={90}
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 text-center bg-white">
                      {/* Product Name */}
                      <h3 className="text-2xl font-semibold  mb-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="mb-6">
                        <p className="text-sm ">
                          Từ{" "}
                          <span className="font-semibold">
                            ${product.price.toFixed(2)}
                          </span>
                        </p>
                      </div>

                      {/* Action Buttons */}
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

            {/* Show message if no products */}
            {(!idDb?.products || idDb.products.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Chưa có sản phẩm iPhone nào trong hệ thống
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Section 1: Khám Phá Apple Watch */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[0].title}
          </h2>

          <div className=" overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4">
            <SmoothScrollContainer>
              {menuWatchInfo[0].cards?.map((card, index) => (
                <a
                  href="#"
                  key={index}
                  className="group relative flex-shrink-0 w-[340px] md:w-[405px] h-[580px] md:h-[700px] rounded-[28px] overflow-hidden bg-[#F5F5F7] snap-center"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[17px] md:text-[19px] leading-[1.42105] opacity-90 whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                </a>
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
                className="relative rounded-[28px] overflow-hidden bg-[#F5F5F7] p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-end hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                  {card.title}
                </h3>
                <p className="text-[17px] md:text-[19px] leading-[1.47059] text-gray-700 mb-6">
                  {card.description}
                </p>
                <a
                  href={card.imageUrl}
                  className="text-[#0066CC] text-[17px] hover:underline inline-flex items-center"
                >
                  Tìm hiểu thêm
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
                </a>
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
                className="relative rounded-[28px] overflow-hidden bg-[#F5F5F7] p-8 md:p-10 min-h-[380px] flex flex-col justify-end hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[17px] leading-[1.47059] text-gray-700 mb-5">
                  {card.description}
                </p>
                <a
                  href={card.imageUrl}
                  className="text-[#0066CC] text-[17px] hover:underline inline-flex items-center"
                >
                  Tìm hiểu thêm
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full border-t border-gray-200 my-12"></div>

      <div className="w-full border-t border-gray-200 my-12"></div>

      {/* Section 5: Tại Sao Chọn Apple Watch */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
            {menuWatchInfo[4].title}
          </h2>

          <div className=" pb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <SmoothScrollContainer>
              {menuWatchInfo[4].WhyWatchCards?.map((card, index) => (
                <div
                  key={index}
                  className="text-center min-w-[344px] py-4 px-8 min-h-[312px] rounded-2xl bg-[#F5F5F7] flex flex-col items-center justify-center snap-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 text-gray-600">
                    {iconMap[card.icon] || <Watch className="w-12 h-12" />}
                  </div>
                  <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] text-gray-600 max-w-[340px] mx-auto">
                    {card.description}
                  </p>
                </div>
              ))}
            </SmoothScrollContainer>
          </div>
        </div>
      </section>

      <div className="w-full border-t border-gray-200 my-12"></div>

      {/* Section 6: Dây Đeo Apple Watch */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuWatchInfo[5].title}
          </h2>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {menuWatchInfo[5].cards?.map((card, index) => (
              <a
                href={card.imageUrl}
                key={index}
                className="group relative rounded-[28px] overflow-hidden bg-[#F5F5F7] min-h-[420px] flex flex-col justify-end p-8 md:p-10 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.14286] mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[17px] leading-[1.47059] text-gray-700 mb-6">
                  {card.description}
                </p>
                <div className="text-[#0066CC] text-[17px] inline-flex items-center">
                  Tìm hiểu thêm
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
                </div>
              </a>
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
                className="relative rounded-[28px] overflow-hidden bg-white p-8 md:p-12 min-h-[380px] flex flex-col justify-end hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                  {card.title}
                </h3>
                <p className="text-[17px] md:text-[19px] leading-[1.47059] text-gray-700 mb-6">
                  {card.description}
                </p>
                <a
                  href={card.imageUrl}
                  className="text-[#0066CC] text-[17px] hover:underline inline-flex items-center"
                >
                  Tìm hiểu thêm
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
                </a>
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
                className="relative rounded-[28px] overflow-hidden bg-[#F5F5F7] p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-end"
              >
                <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                  {card.title}
                </h3>
                <p className="text-[17px] md:text-[19px] leading-[1.47059] text-gray-700 mb-6">
                  {card.description}
                </p>
                <a
                  href={card.imageUrl}
                  className="text-[#0066CC] text-[17px] hover:underline inline-flex items-center"
                >
                  Tìm hiểu thêm
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
                </a>
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

      {/* Footer Navigation Section */}
      <footer className="w-full bg-[#F5F5F7] py-12 md:py-16">
        <div className="max-w-[980px] pl-10 px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.05] tracking-tight">
            Apple Watch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-semibold text-[24px]">
            {/* Column 1: Khám Phá Apple Watch */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Khám Phá Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px]">
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
              <div className="pt-4 space-y-3 text-[14px]">
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

            {/* Column 2: Mua Apple Watch */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Mua Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px]">
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

            {/* Column 3: Tìm Hiểu Thêm */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Tìm Hiểu Thêm Về Apple Watch
              </h3>
              <ul className="space-y-3 text-[14px]">
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

      {/* Custom CSS */}
    </div>
  );
};

export default WatchDetail;
