import { OrderPDF, OrderPdfProps } from "@/components/order-pdf";
import { OrderDto } from "@/dtos/orders/order.dto";

import puppeteer, { ElementHandle } from "puppeteer";
import React from "react";

const HtmlMarkup = ({ children }: { children: React.ReactNode }) => {
    return (<html dir="rtl" lang="he">
        <div id="content" style={{
            width: '80mm',
            margin: '0 auto',
        }}>
            {children}
        </div>
    </html>);
}

export async function generateOrderReciptBase64({ order }: { order: OrderDto }) {
    const ReactDOMServer = (await import('react-dom/server')).default
    const orderPdfProps: OrderPdfProps = {
        userDetails: {
            businessName: order.user.email,
            businessId: '207084922',
            phone: '054-9775807',
        },
        customerDetails: order.customer,
        orderDetails: order,
    };
    const el = React.createElement(OrderPDF, orderPdfProps);
    const html = ReactDOMServer.renderToStaticMarkup(<HtmlMarkup>{el}</HtmlMarkup>);

    const browser = await puppeteer.launch({
        executablePath: process.env.NODE_ENV === 'production' ? "/vercel/.cache/puppeteer/chrome/linux-138.0.7204.157/chrome-linux64/chrome" : '',
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const element = await page.$('#content') as ElementHandle;
    const buffer = await element.screenshot({
        type: 'png',
    });
    await browser.close();

    const base64 = Buffer.from(buffer).toString('base64');

    return base64;
}