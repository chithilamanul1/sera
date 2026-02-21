import prisma from "@/lib/prisma";
import PageClient from "@/components/PageClient";

export default async function Home() {
  let config = null;
  try {
    config = await prisma.siteConfig.findFirst();
  } catch (err) {
    console.error("Home Page Data Fetch Error:", err);
  }

  return <PageClient config={config} />;
}
