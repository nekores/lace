export default {
  baseUrl: process.env.REACT_APP_API_URL,
  themeKey: 'theme',
  isProduction: process.env.NODE_ENV === 'production',
  githubToken: process.env.REACT_APP_GITHUB_TOKEN,
  clientId: process.env.REACT_APP_CLIENT_ID,
};
