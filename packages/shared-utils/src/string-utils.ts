export const formatCode = (code: string): string => {
  return code
    .trim()
    .replace(/^\s*```[a-z]*\n?/gm, '')
    .replace(/\n?\s*```\s*$/gm, '')
    .trim();
};

export const extractJSXFromCode = (code: string): string => {
  const jsxRegex = /(?:return\s*\(?\s*)?(<[^>]+>[\s\S]*<\/[^>]+>)/;
  const match = code.match(jsxRegex);
  return match?.[1] ?? code;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const removeHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};