-- Legacy rows are sanitized again in the frontend. NOT VALID avoids blocking
-- deployment if an old row needs manual correction, while enforcing the rule
-- for every new or subsequently updated promotion.
ALTER TABLE public.promotions
  ADD CONSTRAINT promotions_button_url_safe
  CHECK (
    button_url IS NULL
    OR (
      length(btrim(button_url)) BETWEEN 1 AND 500
      AND button_url !~ '[[:cntrl:]]'
      AND (
        (
          left(btrim(button_url), 1) = '/'
          AND left(btrim(button_url), 2) <> '//'
          AND position(E'\\' in button_url) = 0
          AND lower(button_url) !~ '%(25)*(2f|5c)'
        )
        OR btrim(button_url) ~ '^#[A-Za-z][A-Za-z0-9_-]*$'
        OR lower(btrim(button_url)) ~ '^https://[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:[0-9]{1,5})?([/?#][^[:space:]]*)?$'
        OR lower(btrim(button_url)) ~ '^tel:\\+?[0-9 ()-]{6,30}$'
        OR lower(btrim(button_url)) ~ '^mailto:[^[:space:]@,;:?&#]+@[^[:space:]@,;:?&#]+\\.[^[:space:]@,;:?&#]+$'
      )
    )
  ) NOT VALID;
