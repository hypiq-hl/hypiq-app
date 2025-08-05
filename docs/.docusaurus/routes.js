import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', 'fd3'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '82a'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'd65'),
            routes: [
              {
                path: '/api/authentication',
                component: ComponentCreator('/api/authentication', 'e30'),
                exact: true
              },
              {
                path: '/faq',
                component: ComponentCreator('/faq', 'a3b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/guides/quick-start',
                component: ComponentCreator('/guides/quick-start', '09a'),
                exact: true
              },
              {
                path: '/platform/features',
                component: ComponentCreator('/platform/features', '4a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/overview',
                component: ComponentCreator('/platform/overview', '650'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '654'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
