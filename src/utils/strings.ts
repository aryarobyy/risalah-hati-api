export const getPublicIdFromUrl = (url: string): string | null => {
    try {
        const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
        return matches ? matches[1] : null;
    } catch (error) {
        console.error("Error extracting public_id:", error);
        return null;
    }
};
