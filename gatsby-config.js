module.exports = {
  siteMetadata: {
    title: "苍陌",
    description: "在荒芜处刻字，于裂缝中掌灯",
    about: `我并不存在
    `,
    email: "zhangshiyu1992@hotmail.com",
    github: "erlzhang",
    imgPrefix: "https://erlim.oss-cn-hongkong.aliyuncs.com",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layouts/index.js`),
      },
    },
    require.resolve(`./plugins/source-echo`)
  ],
};
