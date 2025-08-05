import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Platform Guide',
      items: [
        'platform/overview',
        'platform/features',
      ],
    },
    'faq',
  ],
};

export default sidebars;
