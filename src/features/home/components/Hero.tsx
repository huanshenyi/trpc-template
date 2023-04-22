import Image from 'next/image';
import CtaButton from '../images/cta-button.svg';
import Mypic from '../images/hero-image.png';

const Hero: React.FC = () => {
  return (
    <>
      <div className="relative">
        <Image src={Mypic} alt="Interior Design" className="opacity-40"></Image>
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-auto">
          <div className="flex flex-col xl:px-32 items-center text-center gap-6 py-20">
            <h1 className="font-display md:text-display-2xl text-display-lg">
              何か <span className="italic">の</span> キャッチフレーズ
            </h1>
            <p className="col-span-8 md:text-body-xl text-body-lg font-light text-neutral-700 max-w-[800px]">
              サブタイトル内容、無くてもいい
            </p>
          </div>
        </div>
        <Image
          width={120}
          height={120}
          src={CtaButton}
          alt="Get in touch"
          className="absolute xl:left-28 lg:left-[44%] md:left-[42%] left-[35%] -top-16"
        />
      </div>
    </>
  );
};

export default Hero;
