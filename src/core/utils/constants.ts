const BACKEND_SCHEMALESS_URL_ROOT = [
    import.meta.env.MMP_BACKEND_HOST ?? window.location.host,
    import.meta.env.MMP_BACKEND_PATH
].join('');

const BACKEND_HTTP_URL_ROOT = `http://${BACKEND_SCHEMALESS_URL_ROOT}`;

export {
    BACKEND_HTTP_URL_ROOT,
}