import { LoginForm } from '@/components/LoginForm';
import imageLogo from '../public/logo_large.png';
import imageBg from '../public/login_img.png';
import Image from 'next/image';

export default async function Home() {
    return (
        <div>
            <section className='p-3 pt-5'>
                <Image src={imageLogo} alt='Logo' width={93} height={45} />
            </section>
            <section className='p-6 d-flex'>
                <div className='w-40 pl-5'>
                    <LoginForm />
                </div>
                <div className='w-60'>
                    <Image
                        src={imageBg}
                        alt='Background'
                        width={600}
                        height={600}
                    />
                </div>
            </section>
        </div>
    );
}
