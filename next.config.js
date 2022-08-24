/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.kindpng.com", "images.unsplash.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
