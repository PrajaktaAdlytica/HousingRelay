import sharp from 'sharp';
import fs from 'node:fs/promises';
const dir=new URL('../public/brand/',import.meta.url);
for(const [n,size] of [['favicon-16.png',16],['favicon-32.png',32],['favicon-48.png',48],['apple-touch-icon.png',180],['app-icon-192.png',192],['app-icon-512.png',512]]) await sharp(await fs.readFile(new URL('favicon.svg',dir))).resize(size,size).png().toFile(new URL(n,dir).pathname);
const cards=[];
for(const [n,left,top,width,height] of [['logo-horizontal-color.svg',55,55,1090,290],['symbol-color.svg',60,415,240,225],['symbol-mono.svg',360,415,240,225],['symbol-reverse.svg',660,415,240,225],['favicon.svg',995,470,100,100]]) cards.push({input:await sharp(await fs.readFile(new URL(n,dir))).resize(width,height,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer(),left,top});
const bg=Buffer.from('<svg width="1200" height="710"><rect width="1200" height="710" fill="#F8F7EE"/><rect x="635" y="385" width="290" height="285" rx="20" fill="#293720"/></svg>');
await sharp(bg).composite(cards).png().toFile(new URL('brand-preview.png',dir).pathname);

// Multi-resolution ICO for browsers requesting /favicon.ico directly.
const icoImages = await Promise.all([16,32,48].map(size=>sharp(new URL('favicon.svg',dir).pathname).resize(size,size).png().toBuffer()));
const icoHeader=Buffer.alloc(6+16*icoImages.length);icoHeader.writeUInt16LE(1,2);icoHeader.writeUInt16LE(icoImages.length,4);
let icoOffset=icoHeader.length;
icoImages.forEach((bytes,i)=>{const pos=6+i*16,size=[16,32,48][i];icoHeader[pos]=size;icoHeader[pos+1]=size;icoHeader.writeUInt16LE(1,pos+4);icoHeader.writeUInt16LE(32,pos+6);icoHeader.writeUInt32LE(bytes.length,pos+8);icoHeader.writeUInt32LE(icoOffset,pos+12);icoOffset+=bytes.length;});
const ico=Buffer.concat([icoHeader,...icoImages]);
await fs.writeFile(new URL('favicon.ico',dir),ico);
await fs.writeFile(new URL('../favicon.ico',dir),ico);
