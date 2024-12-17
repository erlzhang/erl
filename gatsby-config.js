module.exports = {
  siteMetadata: {
    title: "叶夕青兮",
    description: "只有在创作的时候，我才能感觉到自己是在真实地活着",
    about: `叶夕青兮，程序员，喜欢写作。
    `,
    email: "zhangshiyu1992@hotmail.com",
    github: "erlzhang",
    imgPrefix: "https://erlim.oss-cn-hongkong.aliyuncs.com",
    logo: "/img/logo.svg",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layouts/index.js`),
      },
    },
    require.resolve(`./plugins/source-echo`),
    {
      resolve: "gatsby-plugin-simple-analytics",
      options: {
        trackPageViews: true,
      },
    },
  ],
};
