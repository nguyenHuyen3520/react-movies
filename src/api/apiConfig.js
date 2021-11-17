const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '486973f356492234a76d0fb7831dfa18',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;