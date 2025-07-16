/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "anker.com.bd",
      "example.com",
      "encrypted-tbn0.gstatic.com",
      "m.media-amazon.com",
      "www.startech.com.bd", // ← add this new domain
    ],
  },
};

export default nextConfig;
