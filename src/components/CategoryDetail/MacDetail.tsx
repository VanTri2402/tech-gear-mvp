import React from "react";
import { menuMacInfo } from "@/Data/MacInfo";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import {
  Truck,
  MessageCircle,
  CreditCard,
  RefreshCw,
  GraduationCap,
  Settings,
  Tag,
} from "lucide-react";
import { MacTopNav } from "../ComponentDetailCategories/Nav";

// Icon mapping for Why Mac section
const iconMap: { [key: string]: React.ReactNode } = {
  delivery_truck: <Truck className="w-12 h-12" />,
  chat_expert: <MessageCircle className="w-12 h-12" />,
  money_transfer: <CreditCard className="w-12 h-12" />,
  trade_in_arrows: <RefreshCw className="w-12 h-12" />,
  education_cap: <GraduationCap className="w-12 h-12" />,
  customize_gear: <Settings className="w-12 h-12" />,
  financing_tag: <Tag className="w-12 h-12" />,
};

const MacDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const idDb = await prisma.category.findUnique({
    where: { name: "Macbook" },
  });

  if (idDb?.id !== id) return <></>;

  return (
    <div className="w-full bg-white text-[#1D1D1F] ">
      {/* Top Spacer */}
      <div className="h-[52px] ">
        <MacTopNav />
      </div>

      {/* Promotional Banner */}
      <div className="w-full mt-17 py-3 px-4">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-[14px] leading-[1.42859]">
            Thanh toán hàng tháng thật dễ dàng. Bao gồm lựa chọn lãi suất 0%.{" "}
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
            Mac
          </h1>
          <div className="text-right">
            <h2 className="text-[21px] md:text-[28px] font-semibold leading-[1.14286] tracking-tight">
              Bạn nghĩ được <br />
              Mac làm được.
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
            poster="/mac-hero-poster.jpg"
          >
            <source
              src="https://www.apple.com/105/media/us/mac/family/2024/60fc0159-4236-4a03-8534-f5ba07e538c5/anim/welcome/large_2x.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* Section 1: Tìm Hiểu Mac */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuMacInfo[0].title}
          </h2>

          {/* Horizontal Scroll Cards */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4">
            <div
              className="flex gap-4 md:gap-6"
              style={{ width: "max-content" }}
            >
              {menuMacInfo[0].cards?.map((card, index) => (
                <Link
                  href={card.imageUrl}
                  key={index}
                  className="group relative flex-shrink-0 w-[340px] md:w-[405px] h-[580px] md:h-[700px] rounded-[28px] overflow-hidden bg-[#F5F5F7]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={card.imageUrl || "/placeholder.jpg"}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 2: Chuyển Sang Mac */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuMacInfo[1].title}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuMacInfo[1].cards?.map((card, index) => (
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

      {/* Section 3: Tại Sao Chọn Mac */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
            {menuMacInfo[2].title}
          </h2>

          <div className="flex gap-8 md:gap-12 overflow-x-scroll">
            {menuMacInfo[2].WhyMacCards?.map((card, index) => (
              <div
                key={index}
                className="text-center min-w-[344px] py-4 px-8 min-h-[312px] rounded-2xl bg-[#F5F5F7]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 text-gray-600">
                  {iconMap[card.icon] || <Settings className="w-12 h-12" />}
                </div>
                <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[17px] leading-[1.47059] text-gray-600 max-w-[340px] mx-auto">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Section 4: Phụ Kiện Thiết Yếu */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight">
            {menuMacInfo[3].title}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {menuMacInfo[3].cards?.map((card, index) => (
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
            Cần trợ giúp chọn Mac của bạn?
          </h2>
          <p className="text-[19px] md:text-[21px] leading-[1.381] text-gray-700 mb-8">
            Trả lời một vài câu hỏi và chúng tôi sẽ giúp bạn tìm Mac phù hợp
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
            Mac
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-semibold text-[24px]">
            {/* Column 1: Khám Phá Mac */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Khám Phá Mac
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/mac" className=" hover:underline">
                    Khám Phá Tất Cả Mac
                  </Link>
                </li>
                <li>
                  <Link href="/mac/macbook-air" className=" hover:underline">
                    MacBook Air
                  </Link>
                </li>
                <li>
                  <Link href="/mac/macbook-pro" className=" hover:underline">
                    MacBook Pro
                  </Link>
                </li>
                <li>
                  <Link href="/mac/imac" className=" hover:underline">
                    iMac
                  </Link>
                </li>
                <li>
                  <Link href="/mac/mac-mini" className=" hover:underline">
                    Mac mini
                  </Link>
                </li>
                <li>
                  <Link href="/mac/mac-studio" className=" hover:underline">
                    Mac Studio
                  </Link>
                </li>
                <li>
                  <Link href="/mac/mac-pro" className=" hover:underline">
                    Mac Pro
                  </Link>
                </li>
                <li>
                  <Link href="/mac/displays" className=" hover:underline">
                    Màn Hình
                  </Link>
                </li>
              </ul>
              <div className="pt-4 space-y-3 text-[14px]">
                <p>
                  <Link href="/mac/compare" className=" hover:underline">
                    So Sánh Mac
                  </Link>
                </p>
                <p>
                  <Link href="/mac/switch" className=" hover:underline">
                    Chuyển Từ PC Sang Mac
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 2: Mua Mac */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Mua Mac
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/shop/mac" className=" hover:underline">
                    Mua Mac
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/mac/accessories"
                    className=" hover:underline"
                  >
                    Phụ Kiện Mac
                  </Link>
                </li>
                <li>
                  <Link href="/trade-in" className=" hover:underline">
                    Apple Trade In
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className=" hover:underline">
                    Tài Chính
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Tìm Hiểu Thêm Về Mac */}
            <div className="space-y-3">
              <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
                Tìm Hiểu Thêm Về Mac
              </h3>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/mac/support" className=" hover:underline">
                    Hỗ Trợ Mac
                  </Link>
                </li>
                <li>
                  <Link href="/applecare" className=" hover:underline">
                    AppleCare+
                  </Link>
                </li>
                <li>
                  <Link href="/macos" className=" hover:underline">
                    macOS Tahoe
                  </Link>
                </li>
                <li>
                  <Link href="/apple-intelligence" className=" hover:underline">
                    Apple Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/apps" className=" hover:underline">
                    Các Ứng Dụng Của Apple
                  </Link>
                </li>
                <li>
                  <Link href="/continuity" className=" hover:underline">
                    Tính Liên Tục
                  </Link>
                </li>
                <li>
                  <Link href="/icloud" className=" hover:underline">
                    iCloud+
                  </Link>
                </li>
                <li>
                  <Link href="/business/mac" className=" hover:underline">
                    Mac Cho Doanh Nghiệp
                  </Link>
                </li>
                <li>
                  <Link href="/education/mac" className=" hover:underline">
                    Giáo Dục
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

export default MacDetail;
