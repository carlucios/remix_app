import marketingStyles from '~/styles/marketing.css';
import MainHeader from '~/components/navigation/MainHeader';

import { Outlet } from '@remix-run/react';

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )
}

export function links() {
    return [{rel:'stylesheet', href:marketingStyles}]
}