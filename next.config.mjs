/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable optimizations that might strip CSS
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" }
    ],
  },
};

export default nextConfig;
