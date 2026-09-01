interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => {
  const type = String(data["@type"] || "default")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-");
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  // Render the structured data as part of the page markup. This keeps it
  // available to crawlers that do not execute client-side JavaScript and also
  // lets React hydrate the exact same element in the browser.
  return (
    <script
      id={`jsonld-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
};

export default JsonLd;
