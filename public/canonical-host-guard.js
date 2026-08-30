// Canonical-host guard: normal visits on the published Lovable hostname
// continue to northwind.hu. A deliberate ?teszt=1 visit enables a tab-scoped
// test session so a freshly published preview can be checked.
(function () {
  var p = window.location.pathname;
  var isAdminArea =
    p === "/admin" ||
    p.indexOf("/admin/") === 0 ||
    p === "/auth" ||
    p.indexOf("/auth/") === 0;
  var isLovableHost =
    window.location.hostname === "cool-comfort-heroes.lovable.app";

  if (!isLovableHost) {
    return;
  }

  // Production admin credentials must never be entered on a third-party
  // preview host, even when public-page test mode is requested.
  if (isAdminArea) {
    window.location.replace(
      "https://northwind.hu" +
        window.location.pathname +
        window.location.search +
        window.location.hash,
    );
    return;
  }

  var requestedTestMode =
    new URLSearchParams(window.location.search).get("teszt") === "1";
  var testMode = requestedTestMode;

  try {
    if (requestedTestMode) {
      window.sessionStorage.setItem("northwind-lovable-test-mode", "1");
    } else {
      testMode =
        window.sessionStorage.getItem("northwind-lovable-test-mode") === "1";
    }
  } catch (_error) {
    // If session storage is unavailable, explicit ?teszt=1 still works.
  }

  if (!testMode) {
    window.location.replace(
      "https://northwind.hu" +
        window.location.pathname +
        window.location.search +
        window.location.hash,
    );
  }
})();

