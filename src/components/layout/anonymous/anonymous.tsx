export function AnonymousLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            {children}
        </div>
    );
}