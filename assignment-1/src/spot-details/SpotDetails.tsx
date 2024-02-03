import { LatLng } from "leaflet";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Calendar from "react-calendar";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/network-manager/axios";
import StarRatings from "react-star-ratings";
import dayjs from "dayjs";
import { formatToTwoPrecisionFloat } from "../utils/number-utils";

export interface ParkingSpotDetails {
  id: number;
  name: string;
  parkingType: string;
  pricePerMonth: number;
  imageUrl: string;
  owner: Owner;
  location: Location;
  rating: number;
  reviews: number;
  address: Address;
  bookings: Booking[];
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Booking {
  startDate: string;
  endDate: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Owner {
  firstName: string;
  lastName: string;
}

export const SpotDetails = () => {
  const params = useParams();

  const [parkingSpotDetails, setParkingSpotDetails] = useState<
    ParkingSpotDetails | undefined
  >(undefined);
  useEffect(() => {
    if (params.id) {
      getRequest<ParkingSpotDetails>("parking-spot/" + params.id).then(
        (data) => {
          setParkingSpotDetails(data.data);
        }
      );
    }
  }, [params]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [numberOfDays, setNumberOfDays] = useState(0);

  return (
    <>
      <div className='flex flex-col h-screen'>
        <Header />
        {parkingSpotDetails ? (
          <section className='flex-1 flex flex-col'>
            <div className='flex flex-col md:flex-row w-full justify-between items-center md:px-4 py-2 border-b-[1px] bg-white border-gray-400'>
              <h3 className='flex-[2]'>{parkingSpotDetails.name}</h3>
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
                <h5
                  className='flex flex-row items-center justify-center cursor-pointer'
                  onClick={() => {
                    navigator.share({
                      text: "url to be shared",
                    });
                  }}
                >
                  <span className='mr-1'>
                    <FaShare />
                  </span>
                  Share
                </h5>
              </div>
            </div>
            <div
              className='w-full flex flex-row items-center justify-center'
              style={{
                background: `url(https://picsum.photos/id/${params.id}/1080/1200)`,
                backgroundSize: "cover",
              }}
            >
              <div
                className='w-full flex flex-row items-center justify-center'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              >
                <img
                  src={`https://picsum.photos/id/${params.id}/1080/1200`}
                  className='h-[400px] object-contain'
                  loading='lazy'
                  alt=''
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row m-4' id='details'>
              <div className='flex-1 md:border-r-[2px] md:border-gray-400 md:mr-2'>
                <div className='flex flex-col mb-8 md:mb-0 md:mr-8 z-10 shadow-md bg-slate-50 flex-auto rounded-md'>
                  <div className='flex flex-col p-4'>
                    <h4>Spot details</h4>
                    <p className='p-0 m-0'>
                      Parking Type : {parkingSpotDetails.parkingType}
                    </p>
                    <p className='p-0 m-0'>Timing : Whole day</p>
                    <p className='p-0 m-0'>
                      Owner :{" "}
                      {parkingSpotDetails.owner.firstName +
                        " " +
                        parkingSpotDetails.owner.lastName}
                    </p>
                    <p className='p-0 m-0'>
                      {parkingSpotDetails.rating}{" "}
                      <span>
                        <StarRatings
                          rating={parkingSpotDetails.rating}
                          numberOfStars={5}
                          starDimension='20px'
                          starRatedColor='black'
                        />
                      </span>
                    </p>
                    <p className='underline p-0 m-0 cursor-pointer'>
                      {parkingSpotDetails.reviews} Reviews
                    </p>
                  </div>
                  <hr className='bg-black m-0 opacity-100' />
                  <div className='flex flex-col p-4'>
                    <h4>Spot Address</h4>
                    <p className='p-0 m-0'>
                      {parkingSpotDetails.address.addressLine1 +
                        " " +
                        parkingSpotDetails.address.addressLine2}
                    </p>
                    <p className='p-0 m-0'>{parkingSpotDetails.address.city}</p>
                    <p className='p-0 m-0'>
                      {parkingSpotDetails.address.state}{" "}
                      {parkingSpotDetails.address.postalCode}{" "}
                      {parkingSpotDetails.address.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex-1 h-full'>
                <div className='flex flex-col h-full md:ml-4 z-10 shadow-md bg-slate-50 flex-auto rounded-md'>
                  <div className='flex flex-col px-4 pt-4 pb-3 w-full'>
                    <h4>${parkingSpotDetails.pricePerMonth}/month</h4>
                    <div className='flex flex-row w-full'>
                      <div className='flex flex-col flex-1 pr-6'>
                        <h6>Start</h6>
                        <input
                          type='date'
                          className='bg-gray-300 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                          value={dayjs(startDate).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            const diff = dayjs(endDate).diff(
                              e.target.valueAsDate,
                              "day"
                            );
                            if (diff <= 0) {
                              return;
                            }
                            setStartDate(e.target.valueAsDate || undefined);
                            setNumberOfDays(diff);
                          }}
                        />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <h6>End</h6>
                        <input
                          type='date'
                          className='bg-gray-300 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                          value={dayjs(endDate).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            const diff = dayjs(e.target.valueAsDate).diff(
                              startDate,
                              "day"
                            );
                            if (diff <= 0) {
                              return;
                            }
                            setEndDate(e.target.valueAsDate || undefined);
                            setNumberOfDays(diff);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className='w-full text-center py-3 mt-4 bg-black text-white rounded-lg z-20 shadow-md disabled:!bg-gray-700'
                      title={
                        numberOfDays === 0 ? "Please select date range" : ""
                      }
                      disabled={numberOfDays === 0}
                    >
                      Reserve
                    </button>
                    <div className='flex flex-row w-full justify-between mt-4'>
                      <h5>
                        Sub total : ${parkingSpotDetails.pricePerMonth} *{" "}
                        {formatToTwoPrecisionFloat(numberOfDays / 30)}
                      </h5>
                      <h5>
                        ${" "}
                        {formatToTwoPrecisionFloat(
                          parkingSpotDetails.pricePerMonth *
                            parseFloat(
                              formatToTwoPrecisionFloat(numberOfDays / 30)
                            )
                        )}
                      </h5>
                    </div>
                  </div>
                  <hr className='bg-black opacity-100 m-0' />
                  <div className='flex flex-row w-full px-4 py-2 justify-between'>
                    <h3>Total</h3>
                    <h3>
                      ${" "}
                      {formatToTwoPrecisionFloat(
                        parkingSpotDetails.pricePerMonth *
                          parseFloat(
                            formatToTwoPrecisionFloat(numberOfDays / 30)
                          )
                      )}
                    </h3>
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
                  center={
                    new LatLng(
                      parkingSpotDetails?.location.latitude,
                      parkingSpotDetails?.location.longitude
                    )
                  }
                  zoom={15}
                  className='h-full w-full'
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker
                    position={
                      new LatLng(
                        parkingSpotDetails?.location.latitude,
                        parkingSpotDetails?.location.longitude
                      )
                    }
                  />
                </MapContainer>
              </div>
            </div>
          </section>
        ) : null}
        <Footer />
      </div>
    </>
  );
};