import fs from 'fs';
import path from 'path';

const fileMoves = [
  // 1. Lib
  ['src/lib/db.ts', 'src/lib/prisma.ts'],
  
  // 2. Shared Components
  ['src/components/ui', 'src/shared/components/ui'],
  ['src/components/Footer.tsx', 'src/shared/components/Footer.tsx'],
  ['src/components/Header.tsx', 'src/shared/components/Header.tsx'],
  ['src/components/InputTemplate.tsx', 'src/shared/components/InputTemplate.tsx'],
  ['src/components/NavLinksClient.tsx', 'src/shared/components/NavLinksClient.tsx'],
  ['src/components/NavigationMenu.tsx', 'src/shared/components/NavigationMenu.tsx'],
  
  // 3. Shared Utils & Hooks
  ['src/lib/utils.ts', 'src/shared/utils/index.ts'],
  ['src/utils/toast.ts', 'src/shared/hooks/toast.ts'],
  
  // 4. Auth Feature
  ['src/lib/admin-auth.ts', 'src/features/auth/utils/admin-auth.ts'],
  ['src/components/UserProfile.tsx', 'src/features/auth/components/UserProfile.tsx'],
  ['src/types/UserType.ts', 'src/features/auth/types/index.ts'],
  ['src/Data/getUser.ts', 'src/features/auth/queries/getUser.ts'],
  
  // 5. Cart Feature
  ['src/components/CartButton.tsx', 'src/features/cart/components/CartButton.tsx'],
  
  // 6. Products Feature
  ['src/Data/getProdcut.ts', 'src/features/products/queries/getProduct.ts'], // Fixed typo in new path
  ['src/types/ProductType.ts', 'src/features/products/types/index.ts'],
  
  // 7. Categories Feature
  // CategoryDetail components
  ['src/components/CategoryDetail/AirpodsDetail.tsx', 'src/features/categories/components/AirpodsDetail.tsx'],
  ['src/components/CategoryDetail/IpadDetail.tsx', 'src/features/categories/components/IpadDetail.tsx'],
  ['src/components/CategoryDetail/IphoneDetail.tsx', 'src/features/categories/components/IphoneDetail.tsx'],
  ['src/components/CategoryDetail/MacDetail.tsx', 'src/features/categories/components/MacDetail.tsx'],
  ['src/components/CategoryDetail/WatchDeatail.tsx', 'src/features/categories/components/WatchDeatail.tsx'],
  // ComponentDetailCategories
  ['src/components/ComponentDetailCategories/Nav.tsx', 'src/features/categories/components/Nav.tsx'],
  ['src/components/ComponentDetailCategories/smooth.tsx', 'src/features/categories/components/smooth.tsx'],
  // other category files
  ['src/types/CategoryType.ts', 'src/features/categories/types/index.ts'],
  ['src/Data/getCategory.ts', 'src/features/categories/queries/getCategory.ts'],
  ['src/Data/AirPodsInfo.ts', 'src/features/categories/constants/AirPodsInfo.ts'],
  ['src/Data/IpadInfo.ts', 'src/features/categories/constants/IpadInfo.ts'],
  ['src/Data/IphoneInfo.ts', 'src/features/categories/constants/IphoneInfo.ts'],
  ['src/Data/MacInfo.ts', 'src/features/categories/constants/MacInfo.ts'],
  ['src/Data/WatchInfo.ts', 'src/features/categories/constants/WatchInfo.ts']
];

const importReplacements = [
  // lib
  { from: /(['"])@\/lib\/db(['"])/g, to: "$1@/lib/prisma$2" },
  
  // shared
  { from: /(['"])@\/components\/ui/g, to: "$1@/shared/components/ui" },
  { from: /(['"])@\/components\/Footer(['"])/g, to: "$1@/shared/components/Footer$2" },
  { from: /(['"])@\/components\/Header(['"])/g, to: "$1@/shared/components/Header$2" },
  { from: /(['"])@\/components\/InputTemplate(['"])/g, to: "$1@/shared/components/InputTemplate$2" },
  { from: /(['"])@\/components\/NavLinksClient(['"])/g, to: "$1@/shared/components/NavLinksClient$2" },
  { from: /(['"])@\/components\/NavigationMenu(['"])/g, to: "$1@/shared/components/NavigationMenu$2" },
  { from: /(['"])@\/lib\/utils(['"])/g, to: "$1@/shared/utils$2" },
  { from: /(['"])@\/utils\/toast(['"])/g, to: "$1@/shared/hooks/toast$2" },
  
  // auth
  { from: /(['"])@\/lib\/admin-auth(['"])/g, to: "$1@/features/auth/utils/admin-auth$2" },
  { from: /(['"])@\/components\/UserProfile(['"])/g, to: "$1@/features/auth/components/UserProfile$2" },
  { from: /(['"])@\/types\/UserType(['"])/g, to: "$1@/features/auth/types$2" },
  { from: /(['"])@\/Data\/getUser(['"])/g, to: "$1@/features/auth/queries/getUser$2" },
  
  // cart
  { from: /(['"])@\/components\/CartButton(['"])/g, to: "$1@/features/cart/components/CartButton$2" },
  
  // products
  { from: /(['"])@\/Data\/getProdcut(['"])/g, to: "$1@/features/products/queries/getProduct$2" },
  { from: /(['"])@\/types\/ProductType(['"])/g, to: "$1@/features/products/types$2" },
  
  // categories
  { from: /(['"])@\/components\/CategoryDetail\//g, to: "$1@/features/categories/components/" },
  { from: /(['"])@\/components\/ComponentDetailCategories\//g, to: "$1@/features/categories/components/" },
  { from: /(['"])@\/types\/CategoryType(['"])/g, to: "$1@/features/categories/types$2" },
  { from: /(['"])@\/Data\/getCategory(['"])/g, to: "$1@/features/categories/queries/getCategory$2" },
  { from: /(['"])@\/Data\/(AirPodsInfo|IpadInfo|IphoneInfo|MacInfo|WatchInfo)(['"])/g, to: "$1@/features/categories/constants/$2$3" },

  // common relative path mistakes inside shared/components/ui/
  { from: /(['"])\.\.\/\.\.\/lib\/utils(['"])/g, to: "$1@/shared/utils$2"}
];

console.log('🚀 Bắt đầu quá trình Migration...');

// 1. Di chuyển thư mục và file
fileMoves.forEach(([oldPath, newPath]) => {
  const fullOld = path.join(process.cwd(), oldPath);
  const fullNew = path.join(process.cwd(), newPath);

  if (fs.existsSync(fullOld)) {
    // Tạo folder cha nếu chưa tồn tại
    fs.mkdirSync(path.dirname(fullNew), { recursive: true });

    const stat = fs.statSync(fullOld);
    if (stat.isDirectory()) {
      fs.cpSync(fullOld, fullNew, { recursive: true });
      fs.rmSync(fullOld, { recursive: true, force: true });
    } else {
      fs.copyFileSync(fullOld, fullNew);
      fs.unlinkSync(fullOld);
    }
    console.log(`✅ Moved: ${oldPath} -> ${newPath}`);
  } else {
    console.warn(`⚠️ Bỏ qua (không tìm thấy file): ${oldPath}`);
  }
});

// 2. Hàm duyệt file để thay thế string import
function walkSync(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const dirPath = path.join(dir, file);
    if (fs.statSync(dirPath).isDirectory()) {
      walkSync(dirPath, callback);
    } else if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx') || dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
      callback(dirPath);
    }
  });
}

const targetDirs = ['src/app', 'src/features', 'src/shared', 'src/lib', 'src/components'];

let modifiedCount = 0;

targetDirs.forEach((dir) => {
  walkSync(path.join(process.cwd(), dir), (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    importReplacements.forEach(({ from, to }) => {
      const newContent = content.replace(from, to);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      modifiedCount++;
      console.log(`🔄 Đã cập nhật import trong: ${path.relative(process.cwd(), filePath)}`);
    }
  });
});

console.log(`\n🎉 Đã cập nhật import cho ${modifiedCount} files.`);

// 3. Cập nhật tsconfig.json
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  let tsconfig = fs.readFileSync(tsconfigPath, 'utf-8');
  
  // Replace the entire paths block safely
  tsconfig = tsconfig.replace(
    /"paths"\s*:\s*\{[\s\S]*?\}/g,
    `"paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/lib/*": ["./src/lib/*"]
    }`
  );
  
  fs.writeFileSync(tsconfigPath, tsconfig, 'utf-8');
  console.log(`✅ Đã cập nhật tsconfig.json`);
}

console.log('\n===========================================');
console.log('✅✅✅ MIGRATION XONG! CÁC BƯỚC TIẾP THEO:');
console.log('1. Chạy lệnh: npx tsc --noEmit');
console.log('2. Xóa các thư mục cũ (components, Data, types) rỗng nếu không còn dùng.');
console.log('===========================================');
