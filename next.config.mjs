/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
    images: {
        domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    },
};

export default nextConfig;
=======
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" } // For Google Profile Pics
    ],
  },
};
export default nextConfig;
>>>>>>> 65ba74e755105b740ed3fdbb4c8d0b96f251889d
