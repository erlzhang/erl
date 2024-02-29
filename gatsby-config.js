module.exports = {
  siteMetadata: {
    title: "叶夕青兮",
    description: "生活便是一本书，一壶茶，一个阳光明媚的下午！",
     about: `叶夕青兮，程序员，喜欢写作。
    `,
    email: "zhangshiyu1992@hotmail.com",
    github: "erlzhang",
    imgPrefix: "https://erlim.oss-cn-hongkong.aliyuncs.com",
    logo: "/img/logo.svg"
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
          layout: require.resolve(`./src/layouts/index.js`)
        }
    },
    // require.resolve(`./plugins/source-echo`)
  ],
};
