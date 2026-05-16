/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The whole app is client-side / statically prerendered (no APIs, no
  // server actions), so we export plain HTML/CSS/JS. This is the simplest,
  // most reliable thing to host — perfect for Azure Static Web Apps.
  output: "export",
  // Every route becomes its own folder with an index.html, which static
  // hosts (including Azure SWA) serve cleanly for "/route" and "/route/".
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
