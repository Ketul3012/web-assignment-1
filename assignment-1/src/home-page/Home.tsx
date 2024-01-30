import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaCar } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useRef, useState } from "react";
import { HomeFilter } from "./HomeFilter";

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const _renderSpotCard = (index: number) => {
    return (
      <div
        className='aspect-square relative rounded-md shadow-sm h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer'
        key={index}
      >
        <img
          src='https://picsum.photos/200'
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
    );
  };

  return (
    <>
      <div className='flex flex-col h-screen'>
        {/** Navigation bar start */}
        <header className='sticky top-0 z-50 bg-white shadow-sm border-b-1 border-gray-400 '>
          <Navbar expand='md' className='py-2 px-4'>
            <Navbar.Brand href='/' className='flex-row flex items-center'>
              <FaCar className='mr-2 text-3xl' />
              Park Help
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Nav>
                <Nav.Link>Login</Nav.Link>
                <div className='border-l-2 border-solid border-gray-400 mx-4 my-2 hidden lg:block'></div>
                <Nav.Link>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        {/** Navigation bar end */}

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
        {/** footer start*/}
        <footer className='px-4 pb-2 pt-4 bg-gray-200'>
          <div className='flex flex-row'>
            <div className='flex flex-col flex-[2]'>
              <p className='m-0 p-0'>Park help</p>
              <p className='m-0 p-0'>&copy;2024</p>
            </div>
            <div className='flex flex-col lg:flex-row justify-between flex-1 mx-6'>
              <p className='m-0 p-0'>Privacy</p>
              <p className='m-0 p-0'>Terms</p>
              <p className='m-0 p-0'>Support</p>
              <p className='m-0 p-0'>About</p>
            </div>
          </div>
        </footer>
        {/** footer end */}
      </div>
      <HomeFilter
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );
}

export default Home;
