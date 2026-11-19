# 科普写作

> 把资料、带单位的数值、计算、主张、类比边界和科普文章联系起来。

## 简介

河图洛书的独立创作插件，由外部Codex通过河图CLI／MCP读取包内Skill并操作。研究台拥有资料研究过程，纪实拥有文章事实核实，本包拥有定量解释、计算依赖与类比边界。不是科学仿真、科研认证、医疗或工程决策系统，不复制通用计算器或抓取服务。

## 角色分流

- 作者使用 → [插件中心](https://hetu.limeai.run/plugins/science-studio/)
- Agent与功能Review → [功能清单](CAPABILITIES.md)
- 开发与维护 → [完整设计文档](docs/README.md)

## 快速上手

开发需要Node.js 25，安装与验收基线为河图0.12.6。

```bash
npm ci
npm run build
npm run check
npm run test:unit
npm run package
```

## 边界

专业成果沿固定来源与修订接续，正文采纳、定稿、费用和外发独立决定。发行及实际验收范围见[实施记录](docs/08-实施计划与验收记录.md)。
