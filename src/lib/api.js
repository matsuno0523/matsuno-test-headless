const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * 共通のフェッチ関数
 * @param {string} endpoint - '/assets/api/getArticles/' など
 * @param {object} params - { content: 'service', cat: 3 } などのパラメータ
 */
export async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // パラメータがある場合、空でないものだけURLに追加する
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    console.error(`APIエラー: ${res.status} (${url.toString()})`);
    return null; // throwせずnullを返す方がページ側で処理しやすいです
  }
  return res.json();
}

// --- 各種関数 ---

export const getInitData = () => fetchAPI('/assets/api/getInitData/');
export const getLayout = (content) => fetchAPI('/assets/api/getLayout/', { content });
export const getCategories = (content) => fetchAPI('/assets/api/getCategories/', { content });
export const getArticles = (content, postId = '', cat = '', tag = '') => {
  return fetchAPI('/assets/api/getArticles/', {
    content: content,
    post_id: postId,
    category_in: cat,
    tag: tag
  });
};
export const getFields = (formId) => fetchAPI('/assets/api/getFields/', { form_id: formId });