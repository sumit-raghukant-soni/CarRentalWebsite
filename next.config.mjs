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
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
