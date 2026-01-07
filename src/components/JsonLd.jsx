export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Seranex Elite Engineering",
    "image": "https://i.ibb.co/s9XYwhc0/New-Project-3.png",
    "description": "Premium Web Design & Custom Software Engineering in Seeduwa, Sri Lanka.",
    "@id": "https://seranex.org",
    "url": "https://seranex.org",
    "telephone": "+94724139621",
    "priceRange": "LKR 15,000 - LKR 500,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kotugoda Road",
      "addressLocality": "Seeduwa",
      "addressRegion": "Western Province",
      "postalCode": "11410",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 7.1352,
      "longitude": 79.8821
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}