/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.kindpng.com", "images.unsplash.com", "res.cloudinary.com"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options", // By setting the DENY directive for this header, we prohibited browsers from loading a page in an <iframe>, <frame>, <object>, or <embed> element, regardless of which site is loading the page
            value: "DENY",
          },

          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(); battery=(self); geolocation=(); microphone=()",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },

      {
        source: "/posts",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' ",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
