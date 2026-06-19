const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

async function getAllProjectSlugs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const projects = await res.json();
    return projects.map((p) => p.slug);
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const slugs = await getAllProjectSlugs();

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes = slugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
