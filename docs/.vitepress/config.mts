import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ZERO",
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
    description: "记录与分享",

    themeConfig: {
        logo: '/logo.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '拾遗', link: '/water/tool/Arthas'},
            {text: '时光', link: '/time/index'},
        ],

        sidebar: {
            '/water/': [
                {
                    text: '工具',
                    link: '/water/index',
                    items: [
                        {text: 'Arthas', link: '/water/tool/Arthas'},
                        {text: 'Homebrew', link: '/water/tool/Homebrew'}
                    ]
                }
            ],
            'time': [],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/sunxmax'}
        ],

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
