import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useState } from "react";
import { HomeFilter } from "./HomeFilter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const _renderSpotCard = (index: number) => {
    return (
      <Link className='text-black' to={"/spot/" + index}>
        <div
          className='aspect-square relative rounded-md shadow-sm h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer'
          key={index}
        >
          <img
            src='https://picsum.photos/200'
            alt=''
            className='h-full w-full rounded-md'
            loading='lazy'
          ></img>
          <div className='w-full absolute bottom-0 sm:flex flex-row p-2 items-center justify-between rounded-b-md bg-slate-50 hidden'>
            <div>
              <p className='m-0 p-0'>From 1st march</p>
              <p className='m-0 p-0'>John Green</p>
            </div>
            <p className='m-0 p-0'>$ 100</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className='flex flex-col h-screen'>
        <Header />
        <section className='px-8 py-8 flex-1'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row items-center h-[48px]'>
              <Form.Control
                placeholder='Search by address / pin code / city'
                className='h-[48px] sm:!w-[160px] md:!w-[320px] lg:!w-[640px]'
              ></Form.Control>
              <TbFilter
                className='text-[48px] mx-2 text-gray-500 cursor-pointer'
                onClick={() => {
                  setIsFilterOpen(true);
                }}
              />
            </div>
            <div className='pt-8'>
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {[...Array<any>(10)].map((_, index) => _renderSpotCard(index))}
              </div>
              <div className='flex flex-row items-center justify-center w-full mt-4'>
                <button className='bg-black px-3 py-3 shadow-sm z-10 rounded-md text-white'>
                  Show more
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <HomeFilter
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );
}

export default Home;
