import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';

export default function useRefreshServerSideProps() {
    const router = useRouter();

    const refresh = useCallback(() => router.replace(router.asPath), [
        router.asPath,
    ]);

    return refresh;
}
