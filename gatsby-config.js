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
    require.resolve(`./plugins/source-books`),
     {
    resolve: `gatsby-plugin-baidu-tongji`,
    options: {
			// 百度统计站点ID
      siteid: "3176e6e675ed7773f831e38c7a57880f",
      // 配置统计脚本插入位置，默认值为 false, 表示插入到 body 中, 为 true 时插入脚本到 head 中
      head: false,
    },
  },
  ],
};
