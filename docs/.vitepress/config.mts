import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "zero",
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+SC:wght@100..900&display=swap'
        }],
    ],
    // <link href="https://fonts.cdnfonts.com/css/jetbrains-mono" rel="stylesheet">

    description: "记录与分享",

    lastUpdated: true,

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        siteTitle: false,
        nav: [
            {text: '首页', link: '/'},
            {text: '拾遗', link: '/water/tool/Arthas'},
            {text: '时光', link: '/time/index'},
        ],

        lastUpdated: {
            text: '最后更新于'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/sunxmax'}
        ],

        sidebar: {
            '/water/': [
                {
                    text: '工具',
                    collapsed: true,
                    items: [
                        {text: 'Arthas', link: '/water/tool/Arthas'},
                        {text: 'Homebrew', link: '/water/tool/Homebrew'},
                        {text: 'Docker', link: '/water/tool/Docker'},
                    ]
                }
            ],
            'time': [],
        },

        editLinks: true,
        editLink: {
            pattern: 'https://github.com/sunxmax/zero-docs/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航',
            level: [2,3]
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2021-present zero'
        },

        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {  //这里是个大坑，zh是不生效的，改为root即可
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        },
    },
})
