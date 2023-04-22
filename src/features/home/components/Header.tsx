import Link from 'next/link';
import Image from 'next/image';
import NawaLogo from '../images/nawalogo.svg';
import { Button } from '~/components/Elements';

const Header: React.FC = () => {
  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Usage', href: '#usage' },
    { name: 'Plan', href: '#plan' },
  ];
  return (
    <header>
      <div className="container mx-auto" id="top">
        <div className="flex py-5 justify-between items-center">
          <div className="flex flex-row gap-8 items-center">
            <Link href="/">
              <Image className="h-8 w-auto" src={NawaLogo} alt="Logo" />
            </Link>
          </div>
          <div className="flex flex-row gap-6">
            <div className="md:flex hidden flex-row gap-4 items-center">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-body-sm font-medium text-neutral-700 hover:text-primary-600 px-4"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <Button>CONTACT US</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
