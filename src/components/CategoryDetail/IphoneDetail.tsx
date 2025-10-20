import React from "react";
import { menuIPhoneInfo } from "@/Data/IphoneInfo"; // Đảm bảo đường dẫn đúng
// Bỏ import Image nếu dùng thẻ img thường
// import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import getCategories from "@/Data/getCategory";
import {
  Camera,
  Shield,
  Cpu,
  Battery,
  Smartphone,
  Zap, // Zap có vẻ không dùng trong iconMap?
  DollarSign,
} from "lucide-react";
import { IPhoneTopNav, IPadTopNav } from "../ComponentDetailCategories/Nav"; // Import IPhoneTopNav nếu có, hoặc dùng IPadTopNav như cũ
import { SmoothScrollContainer } from "../ComponentDetailCategories/smooth"; // Import SmoothScrollContainer

// Icon mapping for Why iPhone section (giữ nguyên)
const iconMap: { [key: string]: React.ReactNode } = {
  camera_pro: <Camera className="w-12 h-12 text-gray-600" />, // Thêm màu mặc định
  security_shield: <Shield className="w-12 h-12 text-gray-600" />,
  ecosystem_devices: <Smartphone className="w-12 h-12 text-gray-600" />,
  performance_chip: <Cpu className="w-12 h-12 text-gray-600" />,
  battery_life: <Battery className="w-12 h-12 text-gray-600" />,
  durability_cert: <Shield className="w-12 h-12 text-gray-600" />,
  trade_in_value: <DollarSign className="w-12 h-12 text-gray-600" />,
};

// Hàm tạo màu gradient theo tên sản phẩm (giữ nguyên)
function getProductGradient(productName: string) {
  const name = productName.toLowerCase();
  if (name.includes("pro max")) return "from-gray-800 to-gray-900";
  if (name.includes("pro")) return "from-gray-700 to-gray-800";
  if (name.includes("plus")) return "from-blue-400 to-blue-500";
  if (name.includes("15")) return "from-pink-300 to-pink-400";
  if (name.includes("14")) return "from-purple-300 to-purple-400";
  if (name.includes("se")) return "from-red-500 to-red-600";
  return "from-gray-300 to-gray-400";
}

const IPhoneDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Get iPhone category (giữ nguyên)
  const idDb = await prisma?.category.findUnique({
    where: { name: "Iphone" },
    include: {
      products: true,
    },
  });

  if (idDb?.id !== id) return <></>;

  // Get all categories for comparison (giữ nguyên)
  const categories = await getCategories();

  return (
    <div className="w-full bg-white text-[#1D1D1F]">
      {/* Top Spacer & Nav */}
      <div className="h-[52px]">
        {/* Nên dùng IPhoneTopNav nếu có, hoặc IPadTopNav như cũ */}
        <IPadTopNav />
      </div>

      {/* Promotional Banner (giữ nguyên) */}
      <div className="w-full mt-17 py-3 px-4">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-[14px] leading-[1.42859]">
            Đặt trước iPhone mới nhất và nhận ưu đãi đặc biệt.{" "}
            <Link href="#" className="text-[#0066CC] hover:underline">
              Tìm hiểu thêm
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section (giữ nguyên) */}
      <div className="max-w-full px-15 mx-auto pt-10 md:pt-16 ">
        <div className="flex items-center justify-between py-16 md:py-20">
          <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.05] tracking-tight">
            iPhone
          </h1>
          <div className="text-right">
            <h2 className="text-[21px] md:text-[28px] font-semibold leading-[1.14286] tracking-tight">
              Bạn nghĩ được <br />
              iPhone làm được.
            </h2>
          </div>
        </div>
        <div className="relative w-full rounded-[28px] flex items-center justify-center overflow-hidden mb-12 mx-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="min-w-[1400px] min-h-[500px] object-cover object-center rounded-4xl"
          >
            <source
              src="https://www.apple.com/105/media/us/iphone/family/2024/cf19f185-dd7e-4350-97ff-e44860713b54/anim/welcome/large_2x.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* Section: Khám Phá Sản Phẩm iPhone (From Database - giữ nguyên) */}
      <section className="w-full py-12 md:py-20 bg-[#FBFBFD]">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            Khám Phá Sản Phẩm iPhone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {idDb?.products?.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group block"
              >
                <div className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div
                    className={`relative h-[420px] bg-gradient-to-br ${getProductGradient(
                      product.name
                    )} flex items-center justify-center`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-6 text-center bg-white">
                    <h3 className="text-2xl font-semibold  mb-2">
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
                Chưa có sản phẩm iPhone nào trong hệ thống
              </p>
            </div>
          )}
        </div>
      </section>

      <Separator className="my-12" />

      {/* --- CÁC SECTION DÙNG LAYOUT ẢNH NỀN --- */}

      {/* Section 1: Khám Phá Dòng iPhone */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPhoneInfo[0].title}
          </h2>
          {/* Áp dụng SmoothScrollContainer */}
          <div className="overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4">
            <SmoothScrollContainer>
              {menuIPhoneInfo[0].cards?.map((card, index) => (
                <div // Đổi Link thành div
                  key={index}
                  className="relative group flex-shrink-0 w-[340px] md:w-[405px] h-[580px] md:h-[700px] rounded-[28px] overflow-hidden snap-center flex flex-col"
                >
                  <img
                    src={card.imageUrl || "/placeholder-iphone.jpg"} // Sử dụng ảnh đã cập nhật
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
                    {/* Link Tìm hiểu thêm nếu cần, href nên trỏ đến trang chi tiết */}
                    {/* <Link href="#" className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start">Tìm hiểu thêm</Link> */}
                  </div>
                </div>
              ))}
            </SmoothScrollContainer>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 2: Công Nghệ Đột Phá */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPhoneInfo[1].title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {menuIPhoneInfo[1].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[400px] md:min-h-[500px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Sử dụng ảnh đã cập nhật
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
                  <Link
                    href={card.imageUrl} // Xem lại href này
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

      <Separator className="my-12" />

      {/* Section 3: iPhone Và Hệ Sinh Thái */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPhoneInfo[2].title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {menuIPhoneInfo[2].cards?.map((card, index) => (
              <div
                key={index}
                className="relative rounded-[28px] overflow-hidden min-h-[350px] group hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Sử dụng ảnh đã cập nhật
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[24px] font-semibold leading-[1.16667] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] opacity-90">
                    {card.description}
                  </p>
                  {/* Link Tìm hiểu thêm nếu cần */}
                  {/* <Link href="#" className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start">...</Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 4: Tại Sao Chọn iPhone (Layout Icon + Text) */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
            {menuIPhoneInfo[4].title}
          </h2>
          {/* Container cho các card, có thể dùng SmoothScrollContainer nếu muốn cuộn ngang */}
          <div className="overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4">
            <SmoothScrollContainer>
              {menuIPhoneInfo[4].WhyIPhoneCards?.map((card, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 w-[300px] sm:w-[344px] min-h-[400px] rounded-2xl overflow-hidden snap-center flex flex-col border border-gray-100 shadow-sm" // Thêm border, shadow
                >
                  {/* Ảnh nền */}
                  {card.imageUrl && (
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  {/* Nội dung Icon + Text */}
                  <div className="relative z-20 p-8 flex flex-col items-center justify-center flex-grow text-center text-white">
                    {" "}
                    {/* items-center justify-center */}
                    {card.icon && iconMap[card.icon] ? (
                      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-white/10 rounded-full text-white">
                        {" "}
                        {/* Nền nhẹ cho icon */}
                        {React.cloneElement(
                          iconMap[card.icon] as React.ReactElement,
                          { className: "w-10 h-10 md:w-12 md:h-12" }
                        )}
                      </div>
                    ) : (
                      <div className="h-16 md:h-20 mb-6"></div> // Giữ khoảng trống nếu không có icon
                    )}
                    <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[14px] md:text-[17px] leading-[1.47059] opacity-90 max-w-[300px] mx-auto">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </SmoothScrollContainer>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 5: Phụ Kiện iPhone */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPhoneInfo[5].title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {menuIPhoneInfo[5].cards?.map((card, index) => (
              <div // Đổi Link thành div
                key={index}
                className="relative group rounded-[28px] overflow-hidden min-h-[400px] hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Sử dụng ảnh đã cập nhật
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                <div className="relative z-20 p-8 flex flex-col justify-end flex-grow text-white">
                  <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] leading-[1.47059] opacity-90 mb-6">
                    {card.description}
                  </p>
                  <Link // Giữ Link ở đây vì có chữ "Mua ngay"
                    href={card.imageUrl} // Xem lại href
                    className="text-white text-[17px] hover:underline inline-flex items-center mt-auto font-medium self-start"
                  >
                    Mua ngay
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

      {/* Section 6: Apple Care+ (Tương tự Section 5) */}
      <section className="w-full py-12 md:py-20 bg-[#FBFBFD]">
        {" "}
        {/* Thêm bg nếu muốn */}
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPhoneInfo[6]?.title || "Apple Care+ Cho iPhone"}{" "}
            {/* Title dự phòng */}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuIPhoneInfo[6]?.cards?.map((card, index) => (
              <div
                key={index}
                className="relative group rounded-[28px] overflow-hidden min-h-[400px] hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={card.imageUrl} // Sử dụng ảnh đã cập nhật
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
                  <Link
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

      {/* Bottom Spacer */}
      <div className="h-12 md:h-20"></div>

      {/* Footer Navigation Section (giữ nguyên) */}
      <footer className="w-full bg-[#F5F5F7] py-12 md:py-16">
        <div className="max-w-[980px] flex flex-col pl-10">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.05] tracking-tight">
            iPhone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-semibold">
            {/* ... Nội dung footer ... */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Khám Phá iPhone
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <Link href="/iphone" className=" hover:underline">
                    Khám Phá Tất Cả iPhone
                  </Link>
                </li>
                <li>
                  <Link href="/iphone-15-pro" className=" hover:underline">
                    iPhone 15 Pro
                  </Link>
                </li>
                <li>
                  <Link href="/iphone-15" className=" hover:underline">
                    iPhone 15
                  </Link>
                </li>
                <li>
                  <Link href="/iphone-14" className=" hover:underline">
                    iPhone 14
                  </Link>
                </li>
                <li>
                  <Link href="/iphone-se" className=" hover:underline">
                    iPhone SE
                  </Link>
                </li>
              </ul>
              <div className="pt-4 space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <p>
                  <Link href="/iphone/compare" className=" hover:underline">
                    So Sánh iPhone
                  </Link>
                </p>
                <p>
                  <Link href="/iphone/switch" className=" hover:underline">
                    Chuyển Sang iPhone
                  </Link>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Mua iPhone
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <Link href="/shop/iphone" className=" hover:underline">
                    Mua iPhone
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/iphone/accessories"
                    className=" hover:underline"
                  >
                    Phụ Kiện iPhone
                  </Link>
                </li>
                <li>
                  <Link href="/apple-card" className=" hover:underline">
                    Apple Card
                  </Link>
                </li>
                <li>
                  <Link href="/trade-in" className=" hover:underline">
                    Apple Trade In
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Tìm Hiểu Thêm
              </h3>
              <ul className="space-y-3 text-[14px] font-normal">
                {" "}
                {/* font-normal */}
                <li>
                  <Link href="/iphone/support" className=" hover:underline">
                    Hỗ Trợ iPhone
                  </Link>
                </li>
                <li>
                  <Link href="/applecare" className=" hover:underline">
                    AppleCare+ cho iPhone
                  </Link>
                </li>
                <li>
                  <Link href="/ios" className=" hover:underline">
                    iOS 18
                  </Link>
                </li>
                <li>
                  <Link href="/apple-intelligence" className=" hover:underline">
                    Apple Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/iphone/privacy" className=" hover:underline">
                    Quyền Riêng Tư
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IPhoneDetail;
