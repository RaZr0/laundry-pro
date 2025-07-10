'use client'

import { cn } from "@/lib/utils";
import { ClipboardList, Clock, Package, Truck, Users } from "lucide-react";
import React, { JSX } from "react";
import { StatItem, StatItemSkeleton } from "./stat-item/stat-item";
import { useFetchCustomers } from "@/hooks/actions/customers/queries/useFetchCustomers";
import { useFetchOrders } from "@/hooks/actions/orders/queries/useFetchOrders";

const ICON_SIZE = 20;

const ICONS_MAP = {
    'blue': {
        containerColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    'purple': {
        containerColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
    'green': {
        containerColor: 'bg-green-100',
        iconColor: 'text-green-600',
    },
    'yellow': {
        containerColor: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
    }
}

function Icon({ icon, color }: { icon: JSX.Element, color: keyof typeof ICONS_MAP }) {
    return <div className={cn('p-2 rounded-full', ICONS_MAP[color].containerColor)}>
        {React.cloneElement(icon, { className: `${ICONS_MAP[color].iconColor}`, size: ICON_SIZE })}
    </div>
}

export function StatsOverview() {
    const { data: customers } = useFetchCustomers();
    const { data: orders } = useFetchOrders();
    return (
        <ul className="flex gap-4 overflow-auto pb-4">
            <li>
                {orders ? <StatItem title="הזמנות פעילות" value={orders.filter(order => order.status !== "cancelled" && order.status !== 'completed').length} change={0} icon={<Icon color="blue" icon={<Clock />} />} /> : <StatItemSkeleton />}
            </li>
            <li>
                {orders ? <StatItem title="מוכן לאיסוף" value={orders.filter(order => order.status === "ready").length} change={0} icon={<Icon color="green" icon={<Package />} />} /> : <StatItemSkeleton />}
            </li>
            <li>
                {orders ? <StatItem title="משלוחים להיום" value={orders.filter(order => order.status === "in_delivery").length} change={0} icon={<Icon color="yellow" icon={<Truck />} />} /> : <StatItemSkeleton />}
            </li>
            <li>
                {orders ? <StatItem title="סך ההזמנות" value={orders.length} change={0} icon={<Icon color="blue" icon={<ClipboardList />} />} /> : <StatItemSkeleton />}
            </li>
            <li>
                {customers ? <StatItem title="סך הלקוחות" value={customers.length} change={0} icon={<Icon color="purple" icon={<Users />} />} /> : <StatItemSkeleton />}
            </li>
        </ul>
    );
}