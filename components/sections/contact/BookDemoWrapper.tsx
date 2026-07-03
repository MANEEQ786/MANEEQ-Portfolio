'use client';

import dynamic from 'next/dynamic';

const BookDemoButton = dynamic(
    () => import('@/components/sections/contact/BookDemoButton'),
    { ssr: false, loading: () => null }
);

export default function BookDemoWrapper() {
    return (
        <div style={{ flex: 1, height: '520px', display: 'flex', flexDirection: 'column' }}>
            <BookDemoButton />
        </div>
    );
}
