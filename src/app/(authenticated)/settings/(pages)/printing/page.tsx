'use client';

import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrinterCheckIcon } from "lucide-react";
import HydrofixPrintingTab from "./_components/tabs/hydrofix-printing-tab";
import ReciptPrintingTab from "./_components/tabs/recipt-printing-tab";

function PrintingSettingsPage() {
    return (
        <Card>
            <CardTitle>
                <div className="flex items-center gap-2">
                    <PrinterCheckIcon size={28} />
                    <div className="flex flex-col">
                        <h1 className="text-2xl">הגדרות הדפסה</h1>
                        <span className="text-sm text-muted-foreground">הגדר איפה ומה יודפס בכל מצב</span>
                    </div>
                </div>
            </CardTitle>

            <Tabs defaultValue='recipt'>
                <TabsList>
                    <TabsTrigger key='recipt' value='recipt'>מדפסת קבלה / חשבונית</TabsTrigger>
                    <TabsTrigger key='hydrofix' value='hydrofix'>מדפסת הידרופיקס</TabsTrigger>
                </TabsList>
                <TabsContent key='recipt' value='recipt'>
                    <ReciptPrintingTab />
                </TabsContent>
                <TabsContent key='hydrofix' value='hydrofix'>
                    <HydrofixPrintingTab />
                </TabsContent>

            </Tabs>
        </Card>
    );
}

export default PrintingSettingsPage;