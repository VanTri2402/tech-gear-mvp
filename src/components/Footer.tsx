// src/components/Footer.tsx

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProductProps } from "@/types/ProductType";
import { CategoryProps } from "@/types/CategoryType";
import getCategories from "@/Data/getCategory";
import getProducts from "@/Data/getProdcut";

const Footer = async () => {
  const categories = await getCategories();
  const products = await getProducts();
  return (
    // THAY THẺ DIV GỐC BẰNG THẺ <FOOTER> VÀ LOẠI BỎ CÁC CLASS ĐỊNH VỊ
    <footer className="w-full border-t border-gray-200 bg-white">
      {/* Container của nội dung Footer */}
      <div className="w-full mx-auto max-w-[1400px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16 sm:px-10 py-12">
        {/* Cột 1: TechGearAlden */}
        <div className="flex flex-col gap-4 pr-8 mb-8 lg:mb-0">
          <div className="font-bold text-2xl">
            <h1>
              TechGear<span className="text-blue-500">Alden</span>
            </h1>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Nền tảng công nghệ hàng đầu, cung cấp giải pháp toàn diện cho doanh
            nghiệp hiện đại.
          </p>
          <div className="flex gap-4 text-gray-500 mt-2">
            <Link href="#">
              <Twitter className="w-5 h-5 hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="#">
              <Linkedin className="w-5 h-5 hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="#">
              <GithubIcon className="w-5 h-5 hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="#">
              <InstagramIcon className="w-5 h-5 hover:text-pink-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Cột 2, 3, 4 giữ nguyên */}
        {/* ... */}
        <div className="flex flex-col space-y-2 mb-8 lg:mb-0">
          <div className="font-bold text-lg mb-4 ">Sản phẩm</div>
          {categories.slice(0, 5).map((item: CategoryProps) => (
            <Link
              key={item.id}
              href={`/products/category/${item.id}`}
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-2 mb-8 md:mb-0">
          <div className="font-bold text-lg mb-4 ">Tin tức & Mới</div>
          {products.slice(0, 5).map((item: ProductProps) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-lg mb-2 ">Hỗ trợ & Liên hệ</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Khi gặp vấn đề, hãy liên hệ các địa chỉ bên dưới để được hỗ trợ sớm
            nhất.
          </p>
          <Link href={"https://github.com/VanTri2402"} passHref>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-300"
            >
              <GithubIcon className="w-4 h-4 mr-2" /> Github/Hỗ trợ kỹ thuật
            </Button>
          </Link>
          <Link href={"#"} passHref>
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
              <FacebookIcon className="w-4 h-4 mr-2" /> Facebook/Hỗ trợ kinh
              doanh
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
