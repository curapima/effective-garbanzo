import { config, fields, collection } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'production' && process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? {
          kind: 'github',
          repo: 'curapima/effective-garbanzo',
        }
      : {
          kind: 'local',
        },
  collections: {
    posts: collection({
      label: '文章列表',
      slugField: 'slug',
      path: 'content/posts/*',
      entryLayout: 'content',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.text({ label: '文章标题' }),
        slug: fields.slug({ name: { label: '永久链接 (Slug)' } }),
        description: fields.text({ label: '摘要/描述', multiline: true }),
        date: fields.date({
          label: '发布日期',
          defaultValue: { kind: 'today' },
        }),
        updated: fields.date({
          label: '更新日期',
          defaultValue: { kind: 'today' },
        }),
        category: fields.text({ label: '分类', defaultValue: '技术' }),
        tags: fields.array(fields.text({ label: '标签' }), {
          label: '标签列表',
          itemLabel: props => props.value || '未命名标签',
        }),
        draft: fields.checkbox({ label: '草稿模式', defaultValue: true }),
        content: fields.mdx({
          label: '正文内容',
          extension: 'md',
        }),
      },
    }),
  },
});
