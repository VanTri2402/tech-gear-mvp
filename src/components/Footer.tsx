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

async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}
const Footer = async () => {
  const categories = await getCategories();
  const products = await getProducts();
  return (
    <div className="border border-t">
      <div className="w-full mx-auto max-w-[1400px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16 sm:px-10 py-12 border-gray-200">
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

        {/* Cột 2: Sản phẩm theo Category */}
        {/* Bỏ w-[calc(25%-10px)]] và dùng space-y-2 để giãn cách gọn gàng */}
        <div className="flex flex-col space-y-2 mb-8 lg:mb-0">
          <div className="font-bold text-lg mb-4 ">Sản phẩm</div>
          {categories.slice(0, 5).map(
            (
              item: CategoryProps // Giới hạn 5 mục cho Footer gọn
            ) => (
              <Link
                href={`/products/category/${item.id}`}
                key={item.id}
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Cột 3: Sản phẩm mới (hoặc Sản phẩm nổi bật) */}
        {/* Tương tự, dùng space-y-2 */}
        <div className="flex flex-col space-y-2 mb-8 md:mb-0">
          <div className="font-bold text-lg mb-4 ">Tin tức & Mới</div>
          {products.slice(0, 5).map(
            (
              item: ProductProps // Giới hạn 5 mục
            ) => (
              <Link
                href={`/products/${item.id}`}
                key={item.id}
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Cột 4: Địa chỉ liên hệ & Hỗ trợ */}
        {/* Bỏ w-[250px] và sử dụng flex-col space-y-4 */}
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-lg mb-2 ">Hỗ trợ & Liên hệ</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Khi gặp vấn đề, hãy liên hệ các địa chỉ bên dưới để được hỗ trợ sớm
            nhất.
          </p>

          {/* Các nút liên hệ - dùng space-y-3 thay vì bọc div */}
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
          {/* Giữ lại 2 nút chính này (20/80) và bỏ 2 nút Google/Instagram ít dùng */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
