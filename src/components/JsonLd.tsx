import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    script.id = `jsonld-${data["@type"] || "default"}`;
    
    // Remove existing same-type script
    const existing = document.getElementById(script.id);
    if (existing) existing.remove();
    
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(script.id);
      if (el) el.remove();
    };
  }, [data]);

  return null;
};

export default JsonLd;
