import React from "react";
import { menuIPadInfo } from "@/Data/IpadInfo";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import {
  Tablet,
  Pencil,
  AppWindow,
  Maximize,
  Palette,
  Zap,
  Shield,
} from "lucide-react";
import { IPadTopNav } from "../ComponentDetailCategories/Nav";
import { SmoothScrollContainer } from "../ComponentDetailCategories/smooth";

// Icon mapping for Why iPad section
const iconMap: { [key: string]: React.ReactNode } = {
  tablet_performance: <Zap className="w-12 h-12" />,
  pencil_creative: <Pencil className="w-12 h-12" />,
  apps_ecosystem: <AppWindow className="w-12 h-12" />,
  display_quality: <Maximize className="w-12 h-12" />,
  portability: <Tablet className="w-12 h-12" />,
  multitasking: <AppWindow className="w-12 h-12" />,
  camera_video: <Palette className="w-12 h-12" />,
};

// Hàm tạo màu gradient theo tên sản phẩm
function getProductGradient(productName: string) {
  const name = productName.toLowerCase();
  if (name.includes("pro")) return "from-gray-700 to-gray-900";
  if (name.includes("air")) return "from-blue-300 to-purple-300";
  if (name.includes("mini")) return "from-purple-400 to-pink-400";
  return "from-blue-200 to-blue-300";
}

const IPadDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const idDb = await prisma.category.findUnique({
    where: { name: "Ipad" },
    include: {
      products: true,
    },
  });

  if (idDb?.id !== id) return <></>;

  return (
    <div className="w-full bg-white text-[#1D1D1F]">
      {/* Top Spacer */}
      <div className="h-[52px]">
        <IPadTopNav />
      </div>

      {/* Promotional Banner */}
      <div className="w-full mt-16  py-3 px-4">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-[14px] leading-[1.42859]">
            Mua iPad mới và nhận ưu đãi đặc biệt. Trả góp 0% lãi suất.{" "}
            <Link href="#" className="text-[#0066CC] hover:underline">
              Tìm hiểu thêm
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full mx-auto px-15">
        <div className="flex items-center justify-between py-16 md:py-20">
          <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.05] tracking-tight">
            iPad
          </h1>
          <div className="text-right">
            <h2 className="text-[21px] md:text-[28px] font-semibold leading-[1.14286] tracking-tight">
              Chạm tới <br />
              tuyệt vời.
            </h2>
          </div>
        </div>

        {/* Hero Video */}
        <div className="relative w-full rounded-[28px] overflow-hidden mb-12">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
            poster="https://www.apple.com/v/ipad/home/ck/images/overview/hero/ipad_hero__ecv0mfm95eie_large.jpg"
          >
            <source src="https://www.apple.com/assets-www/en_WW/ipad/welcome/x642ce92dd_large_2x.mp4" />
          </video>
        </div>
      </div>

      {/* Section: Khám Phá Sản Phẩm iPad (From Database) */}
      <section className="w-full py-12 md:py-20 bg-[#FBFBFD]">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            Khám Phá Sản Phẩm iPad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {idDb?.products?.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group block"
              >
                <div className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image with Gradient */}
                  <div
                    className={`relative h-[420px] bg-gradient-to-br ${getProductGradient(
                      product.name
                    )} flex items-center justify-center`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          product.imageUrl ||
                          "https://www.apple.com/v/ipad/home/ck/images/overview/select/product-tile/pt_ipad_pro__6bgrkek0jnm2_large.png"
                        }
                        alt={product.name}
                        fill
                        className="object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
                        quality={90}
                      />
                    </div>
                  </div>

                  {/* Product Info */}
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
                      <p className="text-sm">
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
                Chưa có sản phẩm iPad nào trong hệ thống
              </p>
            </div>
          )}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 1: Tìm Hiểu iPad */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPadInfo[0].title}
          </h2>

          {/* Horizontal Scroll Cards */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4">
            <div
              className="flex gap-4 md:gap-6"
              style={{ width: "max-content" }}
            >
              <SmoothScrollContainer>
                {" "}
                {menuIPadInfo[0].cards?.map((card, index) => (
                  <Link
                    href={card.imageUrl}
                    key={index}
                    className="group relative flex-shrink-0 w-[340px] md:w-[405px] h-[580px] md:h-[700px] rounded-[28px] overflow-hidden bg-[#F5F5F7]"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`https://www.apple.com/v/ipad/home/ck/images/overview/select/product-tile/pt_ipad_pro__6bgrkek0jnm2_large.png`}
                        alt={card.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
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
                  </Link>
                ))}
              </SmoothScrollContainer>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 2: iPad Làm Được Gì */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPadInfo[1].title}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuIPadInfo[1].cards?.map((card, index) => (
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
                <Link
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 3: Tại Sao Chọn iPad */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
            {menuIPadInfo[3].title}
          </h2>

          <div className="flex gap-8 md:gap-12 overflow-x-scroll">
            <SmoothScrollContainer>
              {menuIPadInfo[3].WhyIPadCards?.map((card, index) => (
                <div
                  key={index}
                  className="text-center min-w-[344px] py-4 px-8 min-h-[312px] rounded-2xl bg-[#F5F5F7]"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 text-gray-600">
                    {iconMap[card.icon] || <Tablet className="w-12 h-12" />}
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

      <Separator className="my-12" />

      {/* Section 4: Phụ Kiện iPad */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuIPadInfo[4].title}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 ">
            {menuIPadInfo[4].cards?.map((card, index) => (
              <Link
                href={card.imageUrl}
                key={index}
                className="group relative rounded-[28px] overflow-hidden bg-[#F5F5F7] min-h-[400px] md:min-h-[500px] flex flex-col justify-end p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-3">
                  {card.title}
                </h3>
                <p className="text-[17px] md:text-[19px] leading-[1.47059] text-gray-700 mb-6">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Me Choose Section */}
      <section className="w-full py-12 md:py-20 bg-[#F5F5F7]">
        <div className="max-w-[980px] mx-auto px-4 text-center">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-6 leading-[1.07143] tracking-tight">
            Cần trợ giúp chọn iPad của bạn?
          </h2>
          <p className="text-[19px] md:text-[21px] leading-[1.381] text-gray-700 mb-8">
            Trả lời một vài câu hỏi và chúng tôi sẽ giúp bạn tìm iPad phù hợp
            nhất.
          </p>
          <Button
            size="lg"
            className="bg-[#0066CC] hover:bg-[#0055B3] text-white px-8 py-6 rounded-full text-[17px] font-medium"
          >
            Bắt đầu
          </Button>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-12 md:h-20"></div>

      {/* Footer Navigation Section */}
      <footer className="w-full bg-[#F5F5F7] py-12 md:py-16">
        <div className="max-w-[980px] pl-10 px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.05] tracking-tight">
            iPad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-semibold text-[24px]">
            {/* Column 1: Khám Phá iPad */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Khám Phá iPad
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/ipad" className="hover:underline">
                    Khám Phá Tất Cả iPad
                  </Link>
                </li>
                <li>
                  <Link href="/ipad-pro" className="hover:underline">
                    iPad Pro
                  </Link>
                </li>
                <li>
                  <Link href="/ipad-air" className="hover:underline">
                    iPad Air
                  </Link>
                </li>
                <li>
                  <Link href="/ipad-10-9" className="hover:underline">
                    iPad
                  </Link>
                </li>
                <li>
                  <Link href="/ipad-mini" className="hover:underline">
                    iPad mini
                  </Link>
                </li>
                <li>
                  <Link href="/apple-pencil" className="hover:underline">
                    Apple Pencil
                  </Link>
                </li>
                <li>
                  <Link href="/ipad-keyboards" className="hover:underline">
                    Bàn Phím
                  </Link>
                </li>
              </ul>
              <div className="pt-4 space-y-3 text-[14px]">
                <p>
                  <Link href="/ipad/compare" className="hover:underline">
                    So Sánh iPad
                  </Link>
                </p>
                <p>
                  <Link href="/ipad/why-ipad" className="hover:underline">
                    Tại Sao Chọn iPad
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 2: Mua iPad */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Mua iPad
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/shop/ipad" className="hover:underline">
                    Mua iPad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/ipad/accessories"
                    className="hover:underline"
                  >
                    Phụ Kiện iPad
                  </Link>
                </li>
                <li>
                  <Link href="/trade-in" className="hover:underline">
                    Apple Trade In
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className="hover:underline">
                    Tài Chính
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Tìm Hiểu Thêm Về iPad */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Tìm Hiểu Thêm Về iPad
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/ipad/support" className="hover:underline">
                    Hỗ Trợ iPad
                  </Link>
                </li>
                <li>
                  <Link href="/applecare" className="hover:underline">
                    AppleCare+
                  </Link>
                </li>
                <li>
                  <Link href="/ipados" className="hover:underline">
                    iPadOS
                  </Link>
                </li>
                <li>
                  <Link href="/apple-intelligence" className="hover:underline">
                    Apple Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/ipad/apps" className="hover:underline">
                    Ứng Dụng Cho iPad
                  </Link>
                </li>
                <li>
                  <Link href="/icloud" className="hover:underline">
                    iCloud+
                  </Link>
                </li>
                <li>
                  <Link href="/education/ipad" className="hover:underline">
                    iPad Cho Giáo Dục
                  </Link>
                </li>
                <li>
                  <Link href="/business/ipad" className="hover:underline">
                    iPad Cho Doanh Nghiệp
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

export default IPadDetail;
