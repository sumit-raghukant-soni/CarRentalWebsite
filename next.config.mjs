/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'cdn.imagin.studio',
                // pathname: ''
            }
        ]
    }
};

export default nextConfig;
