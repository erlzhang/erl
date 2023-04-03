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
        siteid: "3176e6e675ed7773f831e38c7a57880f",
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://erl.us11.list-manage.com/subscribe/post?u=0e069016bec27f9f7a8734fe2&amp;id=5f31c277cd&amp;f_id=00dd8ce0f0', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
  ],
};
