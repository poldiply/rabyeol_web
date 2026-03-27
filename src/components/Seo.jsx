import { Head } from "vite-react-ssg";
import { DEFAULT_OG_IMAGE, SITE_NAME, buildAbsoluteUrl } from "../constants/seo";

export default function Seo({
  title,
  description,
  path = "/",
  ogType = "website",
  image = DEFAULT_OG_IMAGE,
  robots = "index,follow",
  structuredData,
}) {
  const canonicalUrl = buildAbsoluteUrl(path);
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImageUrl = buildAbsoluteUrl(image);

  return (
    <Head>
      <html lang="ko" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Head>
  );
}
