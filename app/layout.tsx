import '../styles/globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                <div className="w-full max-w-xl mx-auto">
                    {children}
                </div>
            </body>
        </html>
    )
}