import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaCar } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parkingType, setParkingType] = useState<"indoor" | "outdoor">(
    "indoor"
  );
  const _renderSpotCard = (index: number) => {
    return (
      <div
        className='aspect-square relative rounded-md shadow-sm h-[280px] md:h-[240px] xl:h-[280px]'
        key={index}
      >
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22711.48745600124!2d-63.586304000000005!3d44.63922639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223075e6d9d7%3A0x748c455d10d45403!2sDalhousie%20University!5e0!3m2!1sen!2sca!4v1706481819698!5m2!1sen!2sca'
          className='h-full w-full rounded-md'
          loading='lazy'
          title={index.toString()}
        ></iframe>
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
      <div
        className='modal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        aria-modal='true'
        role='dialog'
        style={{ display: isFilterOpen ? "block" : "none" }}
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content m-auto'>
            <div className='modal-header'>
              <h5 className='modal-title'>Filters</h5>
              <IoClose
                className='text-3xl cursor-pointer'
                onClick={() => {
                  setIsFilterOpen(false);
                }}
              />
            </div>
            <div className='modal-body'>
              <div className='flex flex-col'>
                <div>
                  <h6>Type of parking</h6>
                  <div className='flex flex-row'>
                    <button
                      className={`py-2 border-2 border-gray-400 rounded-l-md text-center w-[25%] ${
                        parkingType === "indoor" ? "bg-blue-600 text-white" : ""
                      }`}
                      onClick={() => {
                        setParkingType("indoor");
                      }}
                    >
                      Indoor
                    </button>
                    <button
                      className={`py-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r-md text-center w-[25%] ${
                        parkingType === "outdoor"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setParkingType("outdoor");
                      }}
                    >
                      Outdoor
                    </button>
                  </div>
                </div>
                <hr />
                <div>
                  <h6>Price Range</h6>
                  <div className='flex flex-col w-full'>
                    <input type='range' className='flex-1' min={10} max={500} />
                    <div className='flex flex-row w-full justify-between'>
                      <span>$10</span>
                      <span>$500</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <h6>Choose location</h6>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22711.48745600124!2d-63.586304000000005!3d44.63922639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223075e6d9d7%3A0x748c455d10d45403!2sDalhousie%20University!5e0!3m2!1sen!2sca!4v1706481819698!5m2!1sen!2sca'
                    className='h-[200px] w-full rounded-md'
                    loading='lazy'
                  />
                  <div className='flex flex-row mt-3 items-start'>
                    <h6>Radius</h6>
                    <div className='flex flex-col w-full mx-4'>
                      <input type='range' className='flex-1' min={2} max={20} />
                      <div className='flex flex-row w-full justify-between'>
                        <span>2KM</span>
                        <span>20KM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer filter-modal-footer'>
              <button
                type='button'
                className='w-[25%] text-center bg-red-500 text-white py-2 rounded-md shadow-sm z-10'
                onClick={() => {
                  setIsFilterOpen(false);
                }}
              >
                Clear
              </button>
              <button
                type='button'
                className='w-[25%] text-center bg-blue-600  text-white py-2 rounded-md shadow-sm z-10'
                data-dismiss='modal'
                onClick={() => {
                  setIsFilterOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
