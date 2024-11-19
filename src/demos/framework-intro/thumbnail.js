import sharp from "sharp";

export default function thumbnail(buffer) {
  return buffer !== undefined
    ? sharp(buffer).resize({ width: 200 }).toBuffer()
    : undefined;
}
