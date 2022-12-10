export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj);
};

export const str2slug = (str) => {
  return str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
};

export const pocketbase_url = 'http://127.0.0.1:8090';