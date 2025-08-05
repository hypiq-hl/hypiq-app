import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'HYPIQ Documentation',
  tagline: 'Advanced Trading Platform Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.hypiq.finance',
  baseUrl: '/',

  organizationName: 'hypiq-hl',
  projectName: 'hypiq-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // editUrl: 'https://github.com/hypiq-hl/hypiq-docs/tree/main/', // Disabled for public
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/hypiq-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'HYPIQ',
      logo: {
        alt: 'HYPIQ Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://hypiq.xyz',
          label: 'Platform',
          position: 'right',
        },
        {
          href: 'https://x.com/hypiq_hl',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://github.com/hypiq-hl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://x.com/hypiq_hl',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/hypiq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Platform',
              href: 'https://hypiq.xyz',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hypiq-hl',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} HYPIQ. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
