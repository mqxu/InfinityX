import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "InfinityX 的学习记录",
  description:
    "记录我学习后端、前端和移动端开发的相关资料，涵盖了 SpringBoot、SpringCloudAlibaba、Vue.js、React、UniApp、微信小程序、Flutter 以及鸿蒙（HarmonyOS）等技术。",
  themeConfig: {
    siteTitle: "InfinityX 的学习记录",
    logo: "https://niit-soft.oss-cn-hangzhou.aliyuncs.com/logo/Vue3.png",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "后端",
        items: [
          {
            text: "Spring Boot",
            link: "/SpringBoot/",
          },
          {
            text: "Spring Cloud Alibaba",
            link: "/SpringCloudAlibaba/",
          },
        ],
      },
      {
        text: "前端",
        items: [
          {
            text: "Vue",
            link: "/Vue/",
          },
          {
            text: "React",
            link: "/React/",
          },
          {
            text: "UniApp",
            link: "/UniApp/",
          },
          {
            text: "微信小程序",
            link: "/mp/",
          },
        ],
      },
      {
        text: "移动端",
        items: [
          {
            text: "Flutter",
            link: "/Flutter/",
          },
          {
            text: "鸿蒙",
            link: "/HarmonyOS/",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/mqxu/InfinityX7" },
    ],
    sidebar: {
      "/SpringBoot/": [
        {
          text: "Spring Boot 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/SpringBoot/" },
            { text: "快速起步", link: "/SpringBoot/quickstart" },
            { text: "配置管理", link: "/SpringBoot/configure" },
          ],
        },
      ],
      "/SpringCloudAlibaba/": [
        {
          text: "Spring Cloud Alibaba 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/SpringCloudAlibaba/" },
            { text: "Nacos", link: "/SpringCloudAlibaba/Nacos" },
            { text: "Nacos Config", link: "/SpringCloudAlibaba/NacosConfig" },
          ],
        },
      ],
      "/Vue/": [
        {
          text: "Vue 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/Vue/" },
            { text: "Vue.js 3 基础", link: "/Vue/basic" },
            { text: "Vue.js 3 组件", link: "/Vue/components" },
            { text: "Vue.js 3 组合式函数", link: "/Vue/composables" },
          ],
        },
      ],
      "/React/": [
        {
          text: "React 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/React/" },
            { text: "快速起步", link: "/React/quickstart" },
          ],
        },
      ],
      "/UniApp/": [
        {
          text: "UniApp 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/UniApp/" },
            { text: "快速起步", link: "/UniApp/quickstart" },
          ],
        },
      ],
      "/mp/": [
        {
          text: "微信小程序学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/mp/" },
            { text: "微信小程序基础", link: "/mp/basic" },
            { text: "微信小程序 API", link: "/mp/api" },
            { text: "微信小程序自定义组件", link: "/mp/components" },
          ],
        },
      ],
      "/Flutter/": [
        {
          text: "Flutter 学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/Flutter/" },
            { text: "快速起步", link: "/Flutter/quickstart" },
          ],
        },
      ],
      "/HarmonyOS/": [
        {
          text: "鸿蒙学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/HarmonyOS/" },
            { text: "快速起步", link: "/HarmonyOS/quickstart" },
          ],
        },
      ],
    },
    footer: {
      message: "用心学习，用心记录！",
      copyright: "Copyright © 2024 mqxu",
    },
  },
});
