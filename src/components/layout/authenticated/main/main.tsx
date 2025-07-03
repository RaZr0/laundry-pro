function Main({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return ( 
        <main className='flex-1 flex bg-[#FAFAFA] max-lg:mt-[var(--header-height)]'>{children}</main>
     );
}

export default Main;