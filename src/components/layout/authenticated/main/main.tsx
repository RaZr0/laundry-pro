function Main({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return ( 
        <main className='flex-1 flex bg-[#FAFAFA] max-lg:mt-[var(--header-height)] max-lg:pb-[calc(var(--footer-height)+60px)] overflow-x-hidden'>{children}</main>
     );
}

export default Main;