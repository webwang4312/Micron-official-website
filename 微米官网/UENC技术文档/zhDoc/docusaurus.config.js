/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'uenc',
    tagline: 'Dinosaurs are cool',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/devDocs/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.
    // i18n: {
    //     defaultLocale: 'en',
    //     locales: ['en', '中文'],
    // },
    // plugins: [require.resolve('docusaurus-lunr-search')],
    themeConfig: {
        // algolia: {
        //     contextualSearch: true,
        //     apiKey: 'bda29e6557dc5be1ce5c05f2dbff8f33',
        //     indexName: 'testing-library',
        //     searchParameters: {},
        // },
        navbar: {
            title: 'uenc',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },

            items: [
                {
                   
                    position: 'left',
                    label: '节点部署',
                    to: '/UENC节点/节点部署'
                },
                {

                    position: 'left',
                    label: '开放接口',
                    to: '/开发者/开放接口/jsonrpc接口/请求示例'
                },
                {

                    position: 'left',
                    label: '常见问题',
                    to: '/社区讨论/常见问题'
                },
                {
                    href: 'https://github.com/uenctech',
                    label: 'github',
                    position: 'left',
                  },
                {
                    href: 'http://47.75.93.221/devDocsEn/',
                    label: 'EN',
                    position: 'right',
                  },
                // { to: 'www.baidu.com', label: 'EN', position: 'right' },

                // {
                //     type: 'localeDropdown',
                //     position: 'right',
                // },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                // {
                //     title: 'Docs',
                //     items: [{
                //         label: 'Tutorial',
                //         to: '/docs/intro',
                //     }, ],
                // },
                // {
                //     title: 'Community',
                //     items: [{
                //             label: 'Stack Overflow',
                //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //         },
                //         {
                //             label: 'Discord',
                //             href: 'https://discordapp.com/invite/docusaurus',
                //         },
                //         {
                //             label: 'Twitter',
                //             href: 'https://twitter.com/docusaurus',
                //         },
                //     ],
                // },
                // {
                //     title: 'More',
                //     items: [
                //         //{
                //         //         label: 'Blog',
                //         //         to: '/blog',
                //         //     },
                //         {
                //             label: 'GitHub',
                //             href: 'https://github.com/facebook/docusaurus',
                //         },
                //     ],
                // },
            ],
            copyright: `Copyright © 2015-${new Date().getFullYear()} UENC.All Rights Reserved UENC`,
        },

    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),

                    routeBasePath: '/',
                    // Please change this to your repo.

                },
                // blog: {
                //     // sidebarPath: require.resolve('./sidebars2.js'),
                //     path: './blog',

                //     // Please change this to your repo.

                // },
                // blog: {
                //     showReadingTime: true,
                //     path: './blog',
                //     routeBasePath: '/',
                //     // Please change this to your repo.
                //     editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
                // },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};