function getConfiguredBaseUrls() {

    const configured = (import.meta.env.BASE_URL as string).trim();
    if (!configured) return;

    return configured.split(",").map((value) => value.trim()).filter(Boolean);
}
export const API_BASE_URLS =getConfiguredBaseUrls();