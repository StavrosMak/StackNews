/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // <--- this disables the warning and image optimization
  },

  reactStrictMode: true,
};

export default nextConfig; 