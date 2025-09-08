'use client';

import 'mdui';
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/views/home/ui/index'), { ssr: false });

export default Home;
