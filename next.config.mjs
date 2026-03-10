/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
