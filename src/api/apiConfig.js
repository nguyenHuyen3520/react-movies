const apiConfig = {
    baseUrl: 'https://api.themovidb.org/3/',
    apiKey: '486973f356492234a76d0fb7831dfa18',
    originalImage: (imgPath) => `https://image.tmdb.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.tmdb.org/t/p/original/${imgPath}`,
}

export default apiConfig;