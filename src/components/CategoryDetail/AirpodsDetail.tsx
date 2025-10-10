import React from "react";
import {
  Headphones,
  Volume2,
  Mic,
  Radio,
  Zap,
  Shield,
  Music,
  Sparkles,
  ShoppingCart,
  Play,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SmoothScrollContainer } from "../ComponentDetailCategories/smooth";
import { AirPodsTopNav } from "../ComponentDetailCategories/Nav";
import { menuAirPodsInfo } from "../../Data/AirPodsInfo";
// Icon mapping (thêm hearing nếu cần)
const iconMap: { [key: string]: React.ReactNode } = {
  magic_audio: <Sparkles className="w-12 h-12 text-[#0066CC]" />,
  seamless_switch: <Radio className="w-12 h-12 text-[#0066CC]" />,
  audio_sharing: <Volume2 className="w-12 h-12 text-[#0066CC]" />,
  siri_voice: <Mic className="w-12 h-12 text-[#0066CC]" />,
  long_battery: <Zap className="w-12 h-12 text-[#0066CC]" />,
  premium_sound: <Music className="w-12 h-12 text-[#0066CC]" />,
  sweat_water: <Shield className="w-12 h-12 text-[#0066CC]" />,
  hearing: <Headphones className="w-12 h-12 text-[#0066CC]" />,
};

const AirPodsDetail = () => (
  <div className="w-full bg-white text-[#1D1D1F]">
    {/* Top Spacer */}
    <div className="h-[52px]">
      <AirPodsTopNav />
    </div>

    {/* Promotional Banner - Giữ informational */}
    <div className="w-full bg-[#F5F5F7] py-3 px-4">
      <div className="max-w-[980px] mx-auto text-center">
        <p className="text-[14px] leading-[1.42859]">
          Khám phá AirPods với công nghệ mới nhất.{" "}
          <Link href="#" className="text-[#0066CC] hover:underline">
            Tìm hiểu thêm.
          </Link>
        </p>
      </div>
    </div>

    {/* Hero Section - Video only */}
    <div className="w-full mx-auto px-4 md:px-15">
      <div className="flex items-center justify-between py-16 md:py-20">
        <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.05] tracking-tight">
          AirPods
        </h1>
        <div className="text-right">
          <h2 className="text-[21px] md:text-[28px] font-semibold leading-[1.14286] tracking-tight">
            Âm thanh <br />
            cách mạng.
          </h2>
        </div>
      </div>

      <div className="relative w-full rounded-[28px] overflow-hidden mb-12">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-auto"
          poster="https://www.apple.com/v/airpods/a/images/overview/hero/airpods_hero_poster__l2j3k8m3k8m_large.jpg"
        >
          <source
            src="https://www.apple.com/v/airpods/a/videos/hero/airpods_hero_large.mp4"
            type="video/mp4"
          />
          <img
            src="https://www.apple.com/v/airpods/a/images/overview/hero/airpods_hero_poster__l2j3k8m3k8m_large.jpg"
            alt="AirPods Hero"
            className="w-full h-auto"
          />
        </video>
      </div>
    </div>

    <div className="w-full border-t border-gray-200 my-12"></div>

    {/* Section 1: Tính Năng Chính */}
    <section className="w-full py-12 md:py-20 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
          {menuAirPodsInfo[0].title}
        </h2>
        <div className="space-y-20">
          {menuAirPodsInfo[0].immersiveFeatures?.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/3]">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[14px] uppercase tracking-wider text-gray-400 mb-3">
                  {feature.subtitle}
                </p>
                <h3 className="text-[32px] md:text-[48px] font-semibold leading-[1.08349] mb-6">
                  {feature.title}
                </h3>
                <p className="text-[17px] md:text-[19px] leading-[1.47059] text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="w-full border-t border-gray-200 my-12"></div>

    {/* Section 2: So Sánh - No buy buttons */}
    <section className="w-full py-12 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.07143] tracking-tight text-center">
          {menuAirPodsInfo[1].title}
        </h2>
        <div className=" pb-6 overflow-x-auto scrollbar-hide">
          <SmoothScrollContainer>
            {menuAirPodsInfo[1].comparisonTable?.products.map(
              (product, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] md:w-[340px] bg-[#F5F5F7] rounded-[28px] p-6 md:p-8 snap-center"
                >
                  <h3 className="text-[21px] md:text-[24px] font-semibold leading-[1.16667] mb-6">
                    {product.name}
                  </h3>
                  <div className="space-y-5">
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <div key={i}>
                        <p className="text-[12px] text-gray-500 uppercase tracking-wide mb-1">
                          {menuAirPodsInfo[1].comparisonTable?.categories[i]}
                        </p>
                        <p className="text-[14px] font-medium leading-[1.42857]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* No buy button */}
                </div>
              )
            )}
          </SmoothScrollContainer>
        </div>
      </div>
    </section>

    <div className="w-full border-t border-gray-200 my-12"></div>

    {/* Section 3: Tại Sao Chọn - No CTAs */}
    <section className="w-full py-12 md:py-20 bg-[#FBFBFD]">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
          {menuAirPodsInfo[2].title}
        </h2>
        <div className=" pb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <SmoothScrollContainer>
            {menuAirPodsInfo[2].whyAirPodsCards?.map((card, index) => (
              <div
                key={index}
                className="text-center min-w-[344px] py-8 px-6 min-h-[312px] rounded-2xl bg-white flex flex-col items-center justify-center shadow-sm border border-gray-100 snap-center"
              >
                <div className="mb-6">{iconMap[card?.icon]}</div>
                <h3 className="text-[21px] font-semibold leading-[1.14286] mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-[1.33333] text-gray-600 max-w-[280px]">
                  {card.description}
                </p>
              </div>
            ))}
          </SmoothScrollContainer>
        </div>
      </div>
    </section>

    <div className="w-full border-t border-gray-200 my-12"></div>

    {/* Section 4: Apple Music - No prices */}
    <section className="w-full py-12 md:py-20 bg-[#F5F5F7]">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
          {menuAirPodsInfo[3].title}
        </h2>
        <div className="space-y-12 md:space-y-16">
          {menuAirPodsInfo[3].musicIntegration?.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white rounded-[28px] p-8 md:p-12"
            >
              <div className="w-full md:w-1/3 text-center md:text-left">
                <Play className="w-16 h-16 mx-auto md:mx-0 mb-4 text-[#0066CC]" />
                <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.125] mb-4">
                  {integration.title}
                </h3>
                <p className="text-[17px] text-gray-700 leading-[1.47059]">
                  {integration.description}
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {integration.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[15px] text-gray-600"
                    >
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="w-full border-t border-gray-200 my-12"></div>

    {/* Section 5: Lifestyle - No buy */}
    <section className="w-full py-12 md:py-20 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-16 leading-[1.07143] tracking-tight text-center">
          {menuAirPodsInfo[4].title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {menuAirPodsInfo[4].lifestyleUseCases?.map((useCase, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/3]">
                  <img
                    src={useCase.imageUrl}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-[14px] uppercase tracking-wider text-gray-400 mb-3">
                  {useCase.scenario}
                </p>
                <h3 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] mb-6">
                  {useCase.title}
                </h3>
                <p className="text-[17px] leading-[1.47059] text-gray-300">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom Spacer */}
    <div className="h-12 md:h-20"></div>

    {/* Footer - Dẹp cột Mua, chỉ 2 col informational */}
    <footer className="w-full bg-[#F5F5F7] py-12 md:py-16">
      <div className="max-w-[980px] pl-10 px-4">
        <h2 className="text-[40px] md:text-[56px] font-semibold mb-8 md:mb-12 leading-[1.05] tracking-tight">
          AirPods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-semibold text-[24px]">
          <div className="space-y-3">
            <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
              Khám Phá AirPods
            </h3>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/airpods" className="hover:underline">
                  Khám Phá Tất Cả AirPods
                </Link>
              </li>
              <li>
                <Link href="/airpods-4" className="hover:underline">
                  AirPods 4
                </Link>
              </li>
              <li>
                <Link href="/airpods-pro" className="hover:underline">
                  AirPods Pro
                </Link>
              </li>
              <li>
                <Link href="/airpods-max" className="hover:underline">
                  AirPods Max
                </Link>
              </li>
            </ul>
            <div className="pt-4 space-y-3 text-[14px]">
              <p>
                <Link href="/airpods/compare" className="hover:underline">
                  So Sánh AirPods
                </Link>
              </p>
              <p>
                <Link href="/airpods/why-airpods" className="hover:underline">
                  Tại Sao Chọn AirPods
                </Link>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-[30px] font-semibold text-gray-500 mb-4">
              Tìm Hiểu Thêm Về AirPods
            </h3>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/airpods/support" className="hover:underline">
                  Hỗ Trợ AirPods
                </Link>
              </li>
              <li>
                <Link href="/applecare" className="hover:underline">
                  AppleCare+
                </Link>
              </li>
              <li>
                <Link href="/apple-music" className="hover:underline">
                  Apple Music
                </Link>
              </li>
              <li>
                <Link href="/ios" className="hover:underline">
                  iOS Tích Hợp
                </Link>
              </li>
              <li>
                <Link href="/icloud" className="hover:underline">
                  iCloud+
                </Link>
              </li>
              <li>
                <Link href="/education/airpods" className="hover:underline">
                  AirPods Cho Giáo Dục
                </Link>
              </li>
              <li>
                <Link href="/business/airpods" className="hover:underline">
                  AirPods Cho Doanh Nghiệp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default AirPodsDetail;
