import Image from 'next/image';
import ArchitectureIcon from '../images/service-icons/interior-design.svg';

const Services: React.FC = () => {
  return (
    <>
      <div id="plan">
        <div className="container mx-auto">
          <div className="flex flex-col md:gap-20 gap-10 lg:py-28 md:py-20 py-12">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
              <div className="lg:col-span-8">
                <div className="flex flex-row items-center opacity-80">
                  <hr className="w-16 text-primary-600"></hr>
                  <p className="text-body-sm font-semibold tracking-widest text-primary-600 pl-4">
                    Usage
                  </p>
                </div>
                <h2 className="font-display md:text-display-xl text-display-md pt-5">
                  We provide the <span className="italic">best solutions</span>{' '}
                  for your dream home
                </h2>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-8">
              <div className="flex flex-col md:gap-20 gap-6 md:p-10 p-8 border border-primary-100">
                <Image
                  src={ArchitectureIcon}
                  width={48}
                  height={48}
                  alt={'Architectural & Interior design'}
                />
                <div className="flex flex-col gap-4">
                  <p className="font-display md:text-display-md text-display-sm font-normal">
                    Architectural & Interior design
                  </p>
                  <p className="text-body-lg font-light text-neutral-700">
                    Non diam pretium tristique augue placerat dolor. Accumsan
                    nibh nunc, molestie volutpat ipsum, ultricies.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:gap-20 gap-6 md:p-10 p-8 border border-primary-100">
                <Image
                  src={ArchitectureIcon}
                  width={48}
                  height={48}
                  alt={'Architectural & Interior design'}
                />
                <div className="flex flex-col gap-4">
                  <p className="font-display md:text-display-md text-display-sm font-normal">
                    Architectural & Interior design
                  </p>
                  <p className="text-body-lg font-light text-neutral-700">
                    Non diam pretium tristique augue placerat dolor. Accumsan
                    nibh nunc, molestie volutpat ipsum, ultricies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:gap-20 gap-6 md:p-10 p-8 border border-primary-100">
                <Image
                  src={ArchitectureIcon}
                  width={48}
                  height={48}
                  alt={'Architectural & Interior design'}
                />
                <div className="flex flex-col gap-4">
                  <p className="font-display md:text-display-md text-display-sm font-normal">
                    Architectural & Interior design
                  </p>
                  <p className="text-body-lg font-light text-neutral-700">
                    Non diam pretium tristique augue placerat dolor. Accumsan
                    nibh nunc, molestie volutpat ipsum, ultricies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
