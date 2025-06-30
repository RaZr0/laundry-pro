import { cn } from "@/lib/utils";
import { ClipboardList, Clock, Users } from "lucide-react";
import React, { JSX } from "react";
import { StatItem } from "./stat-item/stat-item";

const ICON_SIZE = 20;

const ICONS_MAP = {
    'blue' : {
        containerColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    'purple': {
        containerColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
}

function Icon({icon, color}: {icon: JSX.Element, color: keyof typeof ICONS_MAP}) {
    return <div className={cn('p-2 rounded-full', ICONS_MAP[color].containerColor)}>
        {React.cloneElement(icon, { className: `${ICONS_MAP[color].iconColor}`, size: ICON_SIZE })}
    </div>
}

export function StatsOverview() {
    return (
        <ul className="flex gap-4 overflow-auto pb-4">
            <StatItem title="הזמנות פעילות" value={0} change={0} icon={<Icon color="blue" icon={<Clock/> }/>}/>
            <StatItem title="סך הזמנות" value={0} change={0} icon={<Icon color="blue" icon={<ClipboardList/> }/>}/>
            <StatItem title="סך הלקוחות" value={0} change={0} icon={<Icon color="purple" icon={<Users/> }/>}/>
        </ul>
    );
}