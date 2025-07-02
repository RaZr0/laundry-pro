function Main({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return ( 
        <main className='flex-1 flex max-lg:pt-4 bg-[#FAFAFA] max-lg:mt-[var(--header-height)]'>{children}</main>
     );
}

export default Main;