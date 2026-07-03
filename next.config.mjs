/** @type {import('next').NextConfig} */
const nextConfig = {
  // StrictMode double-invokes effects in dev, which would re-initialise the
  // jQuery plugins twice (duplicate sliders / mobile menu). The original theme
  // is not built for that, so we keep it off to preserve exact behaviour.
  reactStrictMode: false,
};

export default nextConfig;
