const sharp = require('sharp');
const fs = require('fs');

const images = [
    'lc-coupe.jpg',
    'ls-sedan.jpg',
    'lx-mountains.jpg',
    'red-lexus.jpg',
    'isf.jpg',
    'gsf.jpg',
    'gx-series.jpg',
    'rx-series.jpg',
    'nx-series.jpg',
    'bridge-lexus.jpg'
];

async function upscale() {
    for (const img of images) {
        if (fs.existsSync(img)) {
            const outPath = img.replace('.jpg', '-hq.jpg');
            console.log(`Upscaling ${img} to ${outPath}...`);
            const metadata = await sharp(img).metadata();
            
            // Upscale by 2.5x to reach roughly 4K quality from 1080p
            const targetWidth = Math.round(metadata.width * 2.5);
            
            await sharp(img)
                .resize(targetWidth, null, {
                    kernel: sharp.kernel.lanczos3,
                    fastShrinkOnLoad: false
                })
                .sharpen(1.5, 0.5, 1.2) // Subtle sharpening pass to mimic EDSR edges
                .jpeg({ quality: 100 })
                .toFile(outPath);
                
            console.log(`Finished ${outPath}`);
        }
    }
}

upscale();
