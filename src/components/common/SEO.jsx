import { useEffect } from "react";

const DEFAULT_TITLE = "Nexora - Modern SaaS Workspace";

const DEFAULT_DESCRIPTION =
  "Nexora is a modern SaaS workspace for managing projects, users, tasks, orders and business analytics.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = "/og-image.svg",
}) {
  useEffect(() => {
   const DEFAULT_TITLE = "Nexora";

const pageTitle = title || DEFAULT_TITLE;

    document.title = pageTitle;

    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    const updateProperty = (property, content) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    updateMeta("description", description);

    updateProperty("og:title", pageTitle);
    updateProperty("og:description", description);
    updateProperty("og:image", image);

    updateMeta("twitter:title", pageTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);
  }, [title, description, image]);

  return null;
}