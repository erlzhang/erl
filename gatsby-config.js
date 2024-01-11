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
    // `gatsby-plugin-layout`,
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
          layout: require.resolve(`./src/layouts/index.js`)
        }
    },
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
        {
          resolve: "gatsby-remark-external-links",
          options: {
            target: "_blank",
            rel: "nofollow"
          }
        }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/_pages/",
      },
      __key: "pages",
    },
    require.resolve(`./plugins/source-books`)
  ],
};
