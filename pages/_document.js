import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" type="image/png" href="/hubspot-favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/hubspot-favicon.png" />
        <link rel="apple-touch-icon" href="/hubspot-favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
