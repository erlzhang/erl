module.exports = {
  siteMetadata: {
    title: "叶夕青兮",
    description: "生活便是一本书，一壶茶，一个阳光明媚的下午！",
    email: "zhangshiyu1992@hotmail.com",
    github: "erlzhang",
    imgPrefix: "https://erlim.oss-cn-hongkong.aliyuncs.com",
    logo: "/img/logo.svg"
  },
  plugins: [
    "gatsby-plugin-sass",
    `gatsby-plugin-layout`,
    require.resolve(`./plugins/source-books`),
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "books",
        path: "./src/_books/",
      },
      __key: "books",
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/_pages/",
      },
      __key: "pages",
    },
    // `gatsby-transformer-yaml`,
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "data",
    //     path: "./src/data/",
    //   },
    //   __key: "data",
    // },
  ],
};
