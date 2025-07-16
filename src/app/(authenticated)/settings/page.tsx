'use client'

import { Page } from "@/components/page";
import { SettingItem } from "./_components/setting-item";
import { Printer } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/app/routes";

const ICON_SIZE = 20;

export default function Settings() {
    return (
        <Page title="הגדרות">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li>
                    <Link href={`${ROUTES.settings.link}/${ROUTES.settings.children.printing.link}`}>
                        <SettingItem icon={<Printer size={ICON_SIZE} />} title="הגדרות הדפסה" description="הגדר איפה ומה יודפס בכל מצב" />
                    </Link>
                </li>
                <li>
                    <Link href={`${ROUTES.settings.link}/${ROUTES.settings.children.pricing.link}`}>
                        <SettingItem icon={<Printer size={ICON_SIZE} />} title="קטלוג שירותים" description="נהל את השירותים שלך ומבנה התמחור" />
                    </Link>
                </li>
            </ul>
        </Page>
    );
}