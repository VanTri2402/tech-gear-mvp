import fs from 'fs';
import path from 'path';

const files = [
  'src/features/categories/components/AirpodsDetail.tsx',
  'src/features/categories/components/IpadDetail.tsx',
  'src/features/categories/components/IphoneDetail.tsx',
  'src/features/categories/components/MacDetail.tsx',
  'src/features/categories/components/WatchDeatail.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Add import Image from "next/image" if missing
    if (!content.includes('import Image from "next/image";')) {
        content = 'import Image from "next/image";\n' + content;
    }
    
    // Naively replace <img with <Image fill (but we must remove closing </img> if any, typically they are self-closing />)
    // Actually, `<img \n src...>` might be tricky. Let's use string replace carefully or regex.
    content = content.replace(/<img\b([^>]+)>/g, (match, p1) => {
      // If it doesn't have a width or height, we inject fill
      let newTag = `<Image fill ${p1}>`;
      if (p1.includes('width=') || p1.includes('height=')) {
          newTag = `<Image ${p1}>`;
      }
      return newTag;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated images in', file);
  }
});
