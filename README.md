# About

[![Github Pages Deployment](https://github.com/NathanGrenier/SOEN-357/actions/workflows/gh-pages.yaml/badge.svg?branch=main)](https://github.com/NathanGrenier/SOEN-357/actions/workflows/gh-pages.yaml)

## Team Members

| Name           | Student ID | Email                     |
| -------------- | ---------- | ------------------------- |
| Nathan Grenier | 40250986   | nathangrenier01@gmail.com |

# Contributing

## Environment Variables

All environment variables go in the .env file. Vite will pickup on any variables prefixed with `VITE_`. You can also declare them manually in the `vite.config.ts` file (as well as default values).

| Variable          | Default |
| ----------------- | ------- |
| TANSTACK_DEVTOOLS | false   |

## Routing

This project uses [TanStack Router](https://tanstack.com/router/latest) for file based routing.

You can use both flat and directory routes in the same project. More info [here](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing#mixed-flat-and-directory-routes).

> The full routing docs can be found here: https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts

## Icon Library

Shadcn recommend using [Lucide Icons](https://lucide.dev/icons/). The package is already installed, just import the icon you want to use.

## Importing Shadcn Components

Make sure to use `npx shadcn@canary add {component}` to import the component you want.