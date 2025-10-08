import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/abdoanss.github.io/' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/abdoanss.github.io/' : '',
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);