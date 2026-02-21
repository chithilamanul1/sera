import PageClient from "@/components/PageClient";

// All page content is static — no DB call needed here.
// The previous siteConfig Prisma call was causing crashes when MongoDB Atlas
// was unreachable, and config was never actually used in PageClient.
export default function Home() {
  return <PageClient />;
}
