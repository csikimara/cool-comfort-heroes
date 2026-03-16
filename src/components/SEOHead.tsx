import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

const SITE_URL = "https://cool-comfort-heroes.lovable.app";

const SEOHead = ({ title, description, canonical, noindex }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // OG tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", canonicalUrl);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    // Robots
    if (noindex) {
      let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex, nofollow";
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    return () => {
      // Cleanup noindex on unmount
      const robots = document.querySelector('meta[name="robots"]');
      if (robots && noindex) robots.remove();
    };
  }, [title, description, canonicalUrl, noindex]);

  return null;
};

export default SEOHead;
export { SITE_URL };
