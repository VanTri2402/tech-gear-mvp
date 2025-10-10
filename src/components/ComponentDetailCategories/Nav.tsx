import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Tv,
  Gift,
  Wrench,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

// Top Navigation Component (dùng cho iPad)
export const IPadTopNav = () => {
  const navItems: NavItem[] = [
    {
      name: "iPad Pro",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 56" fill="currentColor">
          <path d="M33.5 0h-27C2.9 0 0 2.9 0 6.5v43C0 53.1 2.9 56 6.5 56h27c3.6 0 6.5-2.9 6.5-6.5v-43C40 2.9 37.1 0 33.5 0zm-13.5 52c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm14-6H6V6h28v40z" />
        </svg>
      ),
      href: "/ipad-pro",
    },
    {
      name: "iPad Air",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 56" fill="currentColor">
          <path d="M33.5 0h-27C2.9 0 0 2.9 0 6.5v43C0 53.1 2.9 56 6.5 56h27c3.6 0 6.5-2.9 6.5-6.5v-43C40 2.9 37.1 0 33.5 0zm-13.5 52c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm14-6H6V6h28v40z" />
        </svg>
      ),
      href: "/ipad-air",
    },
    {
      name: "iPad",
      icon: (
        <svg className="w-9 h-11" viewBox="0 0 36 52" fill="currentColor">
          <path d="M30 0H6C2.7 0 0 2.7 0 6v40c0 3.3 2.7 6 6 6h24c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6zm-12 48c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13-6H5V5h26v37z" />
        </svg>
      ),
      href: "/ipad",
    },
    {
      name: "iPad mini",
      icon: (
        <svg className="w-8 h-11" viewBox="0 0 32 52" fill="currentColor">
          <path d="M26.5 0h-21C2.5 0 0 2.5 0 5.5v41C0 49.5 2.5 52 5.5 52h21c3 0 5.5-2.5 5.5-5.5v-41C32 2.5 29.5 0 26.5 0zM16 48c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11-6H5V5h22v37z" />
        </svg>
      ),
      href: "/ipad-mini",
    },
    {
      name: "So Sánh",
      icon: (
        <svg className="w-11 h-11" viewBox="0 0 44 52" fill="currentColor">
          <path d="M28 0h-12C14.3 0 13 1.3 13 3v46c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zm-6 48c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm7-6H15V5h14v37zM13.5 0h-8C2.5 0 0 2.5 0 5.5v41C0 49.5 2.5 52 5.5 52h8c.8 0 1.5-.7 1.5-1.5v-49c0-.8-.7-1.5-1.5-1.5zm-4 48c-.8 0-1.5-.7-1.5-1.5S8.7 45 9.5 45s1.5.7 1.5 1.5S10.3 48 9.5 48zM38.5 0h-8c-.8 0-1.5.7-1.5 1.5v49c0 .8.7 1.5 1.5 1.5h8c3 0 5.5-2.5 5.5-5.5v-41C44 2.5 41.5 0 38.5 0zm-3.5 48c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
        </svg>
      ),
      href: "/ipad/compare",
    },
    {
      name: "Apple Pencil",
      icon: (
        <svg className="w-3 h-11" viewBox="0 0 12 52" fill="currentColor">
          <path d="M11.5 46l-5-44c-.2-.9-1-.9-1.2 0l-5 44c-.1.5.2 1 .7 1h10c.5 0 .8-.5.7-1zM6 52c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
        </svg>
      ),
      href: "/apple-pencil",
    },
    {
      name: "Bàn Phím",
      icon: (
        <svg className="w-12 h-9" viewBox="0 0 48 36" fill="currentColor">
          <path d="M44 0H4C1.8 0 0 1.8 0 4v28c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM8 8h4v4H8V8zm0 8h4v4H8v-4zm6-8h4v4h-4V8zm0 8h4v4h-4v-4zm6-8h4v4h-4V8zm0 8h4v4h-4v-4zm6-8h4v4h-4V8zm0 8h4v4h-4v-4zm6-8h4v4h-4V8zm0 8h4v4h-4v-4zm-20 8h24v4H12v-4z" />
        </svg>
      ),
      href: "/ipad-keyboards",
    },
    {
      name: "Phụ Kiện",
      icon: (
        <svg className="w-10 h-11" viewBox="0 0 40 44" fill="currentColor">
          <path d="M20 0C9 0 0 9 0 20v16c0 4.4 3.6 8 8 8h24c4.4 0 8-3.6 8-8V20C40 9 31 0 20 0zm12 34c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V20c0-6.6 5.4-12 12-12s12 5.4 12 12v14z" />
        </svg>
      ),
      href: "/shop/ipad/accessories",
    },
    {
      name: "iPadOS 26",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="currentColor">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M20 8v12l8 4" />
        </svg>
      ),
      href: "/ipados",
    },
    {
      name: "Mua sắm iPad",
      icon: (
        <svg className="w-11 h-11" viewBox="0 0 44 52" fill="currentColor">
          <path d="M28 12h-4V8c0-2.2-1.8-4-4-4s-4 1.8-4 4v4h-4c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4zM16 8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4h-8V8zm12 40H12V16h16v32z" />
          <rect
            x="20"
            y="0"
            width="24"
            height="20"
            rx="2"
            fill="currentColor"
          />
          <path d="M32 6l-4 4-2-2" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      ),
      href: "/shop/ipad",
    },
  ];

  return (
    <div className="w-full bg-[#fbfbfd] border-b border-gray-200 sticky top-0 ">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-6 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[80px] group"
            >
              <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                {item.icon}
              </div>
              <span className="text-[12px] font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-center whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// iPhone Top Nav
export const IPhoneTopNav = () => {
  const navItems: NavItem[] = [
    {
      name: "iPhone 15 Pro",
      icon: <Smartphone className="w-10 h-10" />,
      href: "/iphone-15-pro",
    },
    {
      name: "iPhone 15",
      icon: <Smartphone className="w-9 h-10" />,
      href: "/iphone-15",
    },
    {
      name: "iPhone 14",
      icon: <Smartphone className="w-9 h-10" />,
      href: "/iphone-14",
    },
    {
      name: "iPhone SE",
      icon: <Smartphone className="w-8 h-10" />,
      href: "/iphone-se",
    },
    {
      name: "So Sánh",
      icon: (
        <div className="flex gap-1">
          <Smartphone className="w-4 h-8" />
          <Smartphone className="w-4 h-8" />
        </div>
      ),
      href: "/iphone/compare",
    },
    {
      name: "AirPods",
      icon: <Headphones className="w-10 h-10" />,
      href: "/airpods",
    },
    {
      name: "AirTag",
      icon: <div className="w-10 h-10 rounded-full border-2 border-current" />,
      href: "/airtag",
    },
    {
      name: "Phụ Kiện",
      icon: <Gift className="w-10 h-10" />,
      href: "/shop/iphone/accessories",
    },
    {
      name: "iOS 18",
      icon: (
        <div className="w-10 h-10 rounded-lg border-2 border-current flex items-center justify-center text-xs font-bold">
          18
        </div>
      ),
      href: "/ios",
    },
    {
      name: "Mua sắm iPhone",
      icon: (
        <div className="relative">
          <Smartphone className="w-10 h-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full" />
        </div>
      ),
      href: "/shop/iphone",
    },
  ];

  return (
    <div className="w-full bg-[#fbfbfd] border-b border-gray-200 sticky top-0 ">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-6 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[80px] group"
            >
              <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                {item.icon}
              </div>
              <span className="text-[12px] font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-center whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mac Top Nav
export const MacTopNav = () => {
  const navItems: NavItem[] = [
    {
      name: "MacBook Air",
      icon: <Laptop className="w-11 h-8" />,
      href: "/mac/macbook-air",
    },
    {
      name: "MacBook Pro",
      icon: <Laptop className="w-12 h-8" />,
      href: "/mac/macbook-pro",
    },
    { name: "iMac", icon: <Tv className="w-11 h-10" />, href: "/mac/imac" },
    {
      name: "Mac mini",
      icon: <div className="w-10 h-4 bg-current rounded" />,
      href: "/mac/mac-mini",
    },
    {
      name: "Mac Studio",
      icon: <div className="w-10 h-6 bg-current rounded" />,
      href: "/mac/mac-studio",
    },
    {
      name: "Mac Pro",
      icon: (
        <div className="w-10 h-10 bg-current rounded grid grid-cols-3 gap-[2px] p-1">
          <div className="bg-white rounded-full" />
          <div className="bg-white rounded-full" />
          <div className="bg-white rounded-full" />
          <div className="bg-white rounded-full" />
          <div className="bg-white rounded-full" />
          <div className="bg-white rounded-full" />
        </div>
      ),
      href: "/mac/mac-pro",
    },
    {
      name: "So Sánh",
      icon: (
        <div className="flex gap-1">
          <Laptop className="w-5 h-4" />
          <Laptop className="w-5 h-4" />
        </div>
      ),
      href: "/mac/compare",
    },
    {
      name: "Màn Hình",
      icon: <Tv className="w-12 h-9" />,
      href: "/mac/displays",
    },
    {
      name: "Phụ Kiện",
      icon: <Gift className="w-10 h-10" />,
      href: "/shop/mac/accessories",
    },
    {
      name: "macOS",
      icon: (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
      ),
      href: "/macos",
    },
    {
      name: "Mua sắm Mac",
      icon: (
        <div className="relative">
          <Laptop className="w-11 h-8" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full" />
        </div>
      ),
      href: "/shop/mac",
    },
  ];

  return (
    <div className="w-full bg-[#fbfbfd] border-b border-gray-200 sticky top-0 ">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-6 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[80px] group"
            >
              <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                {item.icon}
              </div>
              <span className="text-[12px] font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-center whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Apple Watch Top Nav
export const WatchTopNav = () => {
  const navItems = [
    {
      name: "Apple Watch Ultra 2",
      icon: <Watch className="w-8 h-10" />,
      href: "/watch/apple-watch-ultra-2",
    },
    {
      name: "Apple Watch 9",
      icon: <Watch className="w-8 h-10" />,
      href: "/watch/apple-watch-series-9",
    },
    {
      name: "Apple Watch SE",
      icon: <Watch className="w-8 h-10" />,
      href: "/watch/apple-watch-se",
    },
    {
      name: "So Sánh",
      icon: (
        <div className="flex gap-1">
          <Watch className="w-4 h-8" />
          <Watch className="w-4 h-8" />
        </div>
      ),
      href: "/watch/compare",
    },
    {
      name: "Dây Đeo",
      icon: (
        <svg className="w-8 h-10" viewBox="0 0 32 40" fill="currentColor">
          <path d="M22 0h-12c-1.1 0-2 .9-2 2v36c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-36c0-1.1-.9-2-2-2zm-2 36h-8v-32h8v32z" />
        </svg>
      ),
      href: "/shop/watch/bands",
    },
    {
      name: "AirPods",
      icon: <Headphones className="w-10 h-10" />,
      href: "/airpods",
    },
    {
      name: "Phụ Kiện",
      icon: <Gift className="w-10 h-10" />,
      href: "/shop/watch/accessories",
    },
    {
      name: "watchOS",
      icon: (
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
          OS
        </div>
      ),
      href: "/watchos",
    },
    {
      name: "Mua sắp Watch",
      icon: (
        <div className="relative">
          <Watch className="w-8 h-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full" />
        </div>
      ),
      href: "/shop/watch",
    },
  ];

  return (
    <div className="w-full bg-[#fbfbfd] border-b border-gray-200 sticky top-0 ">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-6 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[80px] group"
            >
              <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 mb-2 h-11 flex items-center">
                {item.icon}
              </div>
              <span className="text-[12px] font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-center whitespace-nowrap">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
// AirPods Top Nav
export const AirPodsTopNav = () => {
  const navItems: NavItem[] = [
    {
      name: "AirPods Pro 2",
      icon: <Headphones className="w-10 h-10" />,
      href: "/airpods-pro-2",
    },
    {
      name: "AirPods 3",
      icon: <Headphones className="w-10 h-10" />,
      href: "/airpods-3",
    },
    {
      name: "AirPods 2",
      icon: <Headphones className="w-10 h-10" />,
      href: "/airpods-2",
    },
    {
      name: "AirPods Max",
      icon: (
        <svg className="w-9 h-10" viewBox="0 0 36 40" fill="currentColor">
          <path d="M32 8H4a4 4 0 00-4 4v16a4 4 0 004 4h4v-12h-4v-4h28v4h-4v12h4a4 4 0 004-4V12a4 4 0 00-4-4z" />
        </svg>
      ),
      href: "/airpods-max",
    },
    {
      name: "So Sánh",
      icon: (
        <div className="flex gap-1">
          <Headphones className="w-5 h-8" />
          <Headphones className="w-5 h-8" />
        </div>
      ),
      href: "/airpods/compare",
    },
    {
      name: "Apple Music",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="20" cy="20" r="20" />
          <path d="M28 12l-12 5v11l12-5z" fill="white" />
        </svg>
      ),
      href: "/apple-music",
    },
    {
      name: "Phụ Kiện",
      icon: <Gift className="w-10 h-10" />,
      href: "/shop/airpods/accessories",
    },
    {
      name: "Mua sắm AirPods",
      icon: (
        <div className="relative">
          <Headphones className="w-10 h-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full" />
        </div>
      ),
      href: "/shop/airpods",
    },
  ];

  // JSX to render navItems remains the same
  return (
    <div className="w-full bg-[#fbfbfd] border-b border-gray-200 sticky top-0 ">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-6 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[80px] group"
            >
              <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 mb-2 h-11 flex items-center">
                {item.icon}
              </div>
              <span className="text-[12px] font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-center whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
