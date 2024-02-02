
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://storage.googleapis.com/dev-cms-backend-media/custom-css/cms_custom.min.css" />
        <link rel="stylesheet" href="https://storage.googleapis.com/dev-cms-backend-media/custom-css/cms_fix_control.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
