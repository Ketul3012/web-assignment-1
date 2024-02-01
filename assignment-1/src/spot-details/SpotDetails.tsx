import { LatLng } from "leaflet";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Calendar from "react-calendar";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FaShare } from "react-icons/fa";

export const SpotDetails = () => {
  const currentLocation = new LatLng(44.6356313, -63.5951737);
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Header />
        <section className='flex-1 flex flex-col'>
          <div className='flex flex-col md:flex-row w-full justify-between items-center md:px-4 py-2 border-b-[1px] bg-white border-gray-400'>
            <h3 className='flex-[2]'>Spot name</h3>
            <div className='grid w-full grid-cols-4 md:flex  md:flex-row justify-between flex-1'>
              <h5
                className='flex flex-row items-center justify-center cursor-pointer'
                onClick={() => {
                  document.getElementById("details")?.scrollIntoView();
                }}
              >
                Details
              </h5>
              <h5
                className='flex flex-row items-center justify-center cursor-pointer'
                onClick={() => {
                  document.getElementById("availability")?.scrollIntoView();
                }}
              >
                Availability
              </h5>
              <h5
                className='flex flex-row items-center justify-center cursor-pointer'
                onClick={() => {
                  document.getElementById("location")?.scrollIntoView();
                }}
              >
                Location
              </h5>
              <h5 className='flex flex-row items-center justify-center cursor-pointer'>
                <span className='mr-1'>
                  <FaShare />
                </span>
                Share
              </h5>
            </div>
          </div>
          <img
            src='https://picsum.photos/1080/1200'
            className='h-[400px] w-full'
            loading='lazy'
            alt=''
          />
          <div className='flex flex-col md:flex-row m-4' id='details'>
            <div className='flex-1 md:border-r-[2px] md:border-gray-400 md:mr-2'>
              <div className='flex flex-col mb-8 md:mr-8 z-10 shadow-md bg-slate-50 flex-auto rounded-md'>
                <div className='flex flex-col p-4'>
                  <h4>Spot details</h4>
                  <p className='p-0 m-0'>Type : Indoor</p>
                  <p className='p-0 m-0'>Timing : Whole day</p>
                  <p className='p-0 m-0'>4 Star</p>
                  <p className='underline p-0 m-0 cursor-pointer'>50 Reviews</p>
                </div>
                <hr className='bg-black m-0 opacity-100' />
                <div className='flex flex-col p-4'>
                  <h4>Spot Address</h4>
                  <p className='p-0 m-0'>6299 South St</p>
                  <p className='p-0 m-0'>Halifax</p>
                  <p className='p-0 m-0'>NS B3H 4R2</p>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='flex flex-col md:ml-4 z-10 shadow-md bg-slate-50 flex-auto rounded-md'>
                <div className='flex flex-col px-4 pt-4 pb-3 w-full'>
                  <h4>$150/month</h4>
                  <div className='flex flex-row w-full'>
                    <div className='flex flex-col flex-1 pr-6'>
                      <h6>Start</h6>
                      <input
                        type='date'
                        className='bg-gray-300 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                      />
                    </div>
                    <div className='flex flex-col flex-1'>
                      <h6>End</h6>
                      <input
                        type='date'
                        className='bg-gray-300 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                      />
                    </div>
                  </div>
                  <button className='w-full text-center py-3 mt-4 bg-black text-white rounded-lg z-20 shadow-md'>
                    Reserve
                  </button>
                  <div className='flex flex-row w-full justify-between mt-4'>
                    <h5>Sub total : $150 * 4</h5>
                    <h5>$ 600</h5>
                  </div>
                </div>
                <hr className='bg-black opacity-100 m-0' />
                <div className='flex flex-row w-full px-4 py-2 justify-between'>
                  <h3>Total</h3>
                  <h3>$ 600</h3>
                </div>
              </div>
            </div>
          </div>
          <hr className='text-black opacity-100 m-0' />
          <div className='flex flex-col m-4' id='availability'>
            <h4>Availability</h4>
            <div className='hidden md:block'>
              <Calendar
                showDoubleView={true}
                className='border-0 z-50 shadow-md rounded-md !bg-slate-50'
                tileDisabled={(date) => date.date.getDate() % 4 === 0}
              />
            </div>
            <div className='block md:hidden'>
              <Calendar
                showDoubleView={false}
                className='border-0 z-50 shadow-md rounded-md !bg-slate-50'
                tileDisabled={(date) => date.date.getDate() % 4 === 0}
              />
            </div>
          </div>
          <hr className='text-black opacity-100 m-0' />
          <div className='flex flex-col m-4' id='location'>
            <h4>Location</h4>
            <div className='w-full aspect-square md:h-[400px] border-1 border-black'>
              <MapContainer
                center={currentLocation}
                zoom={15}
                className='h-full w-full'
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={currentLocation} />
              </MapContainer>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
