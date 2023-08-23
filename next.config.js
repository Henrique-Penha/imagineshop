/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3333',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'imagineshop-eta.vercel.app',
                port: '',
                pathname: '/uploads/**',
            }
        ],
    }
}

module.exports = nextConfig
