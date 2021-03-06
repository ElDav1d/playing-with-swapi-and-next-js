# DEVELOPING A NEXT.JS PROJECT FROM SCRATCH EXERCISE

A Next.js / React challenge consisting on creating an Star Wars fansite with some content and features.

## REVIEW PROJECT'S PROGRESS

Although this is a solo effort I'm keeping the git regular flow by doing Pull Requests, so my progress can be more traced and documented.

In order to **know more about technical decissions** feel free to [check any merged Pull request](https://github.com/ElDav1d/playing-with-swapi-and-next-js/pulls?q=is%3Apr+is%3Amerged).

## ACCEPTANCE CRITERIA

Create an Star Wars fansite with the following content:

1. Homepage:
   a. Content:
   I. Full screen carousel of images from Star Wars

2. Lister page – List of Star Wars characters:
   a. Content:
   II. 10 items per page + pagination
   II. Each character has few info + link to detail page of the character

3. Detail page – Detail page of Star Wars character:
   a. Content:
   I. Extended info of the character
   II. Title of the films where the character stars
   III. Back to list link that takes you to the page you where

4. Sitewide:
   a. Header:
   I. Visible in all pages
   II. Content: 1. Logo to go back to homepage 2. Link to lister page 3. 3 last visited detail pages 4. Search field to filter characters
   b. Footer:
   I. Visible in all pages
   II. Content: 1. Logo to go back to homepage 2. Copyright text

## TECHNICAL REQUEST

1. Use https://swapi.co to gather all the information needed

2. For the carousel, look for 3 images yourself. You can use a library to build it

3. Required tech stack:
   I. React
   II. Typescript

4. Optional tech stack:
   I. Next.js
   II. Testing: Jest + React Testing Library
   III: CSS: Styled components

5. Don’t take into account extra info like: planets, vehicles and starships

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
