import Image from 'next/image';
import Link from 'next/link';
import Style from './headerAnterior.module.css';

export default function HeaderAnterior({ small = false }: { small?: boolean }) {
    return (
        <header className={Style.header}>
            <div className={Style['container-header']}>
                <Link
                    href={'https://www.unam.mx/'}
                    target='_blank'
                    className='d-none d-sm-block'
                >
                    <Image
                        src='/logos/logo-unam.png'
                        alt='Logo de la UNAM'
                        width={small ? 200 : 280}
                        height={small ? 60 : 84}
                    />
                </Link>
                <Link href={'https://acatlan.unam.mx/'} target='_blank'>
                    <Image
                        src='/logos/logo-fes.png'
                        alt='Logo de la fes Acatlàn'
                        width={small ? 200 : 250}
                        height={small ? 48 : 60}
                    />
                </Link>
            </div>
        </header>
    );
}
//IO