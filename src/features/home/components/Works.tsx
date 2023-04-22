import Image from 'next/image';
import Work1 from '../images/works/work-1.png';
import Work2 from '../images/works/work-2.png';
import Work3 from '../images/works/work-3.png';
import { Button } from '~/components/Elements';

const Works: React.FC = () => {
  return (
    <>
      <div>
        <div className="container mx-auto" id="usage">
          <div className="flex flex-col gap-12 lg:py-28 md:py-24 py-12">
            <div className="grid xl:grid-cols-12 grid-cols-1 xl:gap-8 gap-10 items-center">
              <div className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row items-center opacity-80">
                    <hr className="w-16 text-primary-600"></hr>
                    <p className="text-body-sm font-semibold tracking-widest text-primary-600 pl-4">
                      Usage
                    </p>
                  </div>
                  <h3 className="font-display md:text-display-xl text-display-md font-normal pb-4">
                    Some of <span className="italic">our crafts</span> made with
                    love
                  </h3>
                </div>
                <div className="flex basis-1/2 flex-col">
                  <Image src={Work1} alt={'work1'} />
                  <div className="flex flex-col self-stretch pt-6">
                    <h3 className="font-display text-display-md pb-4">
                      work-1
                    </h3>
                    <p className="text-body-lg font-light text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Faucibus fringilla dui amet faucibus nam.
                    </p>
                  </div>
                </div>
                <div className="xl:flex hidden items-start">
                  <Button>CONTACT US</Button>
                </div>
              </div>
              <div className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10 xl:px-14">
                <div className="flex basis-1/2 flex-col">
                  <Image src={Work2} alt={'work2'} />
                  <div className="flex flex-col self-stretch pt-6">
                    <h3 className="font-display text-display-md pb-4">
                      work-2
                    </h3>
                    <p className="text-body-lg font-light text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Faucibus fringilla dui amet faucibus nam.
                    </p>
                  </div>
                </div>
                <div className="flex basis-1/2 flex-col">
                  <Image src={Work3} alt={'work1'} />
                  <div className="flex flex-col self-stretch pt-6">
                    <h3 className="font-display text-display-md pb-4">
                      work-3
                    </h3>
                    <p className="text-body-lg font-light text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Faucibus fringilla dui amet faucibus nam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:hidden flex items-start">
              <Button>CONTACT US</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
