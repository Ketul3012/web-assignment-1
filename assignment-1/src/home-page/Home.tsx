import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useEffect, useState } from "react";
import { HomeFilter } from "./HomeFilter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/network-manager/axios";
import { calculateDistanceFromLatLon } from "../utils/map-utils";

export interface ParkingSpotsResponse {
  parkingSpots: ParkingSpot[];
}

export interface ParkingSpot {
  id: number;
  parkingType: string;
  pricePerMonth: number;
  imageUrl: string;
  owner: Owner;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Owner {
  firstName: string;
  lastName: string;
}

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [filteredParkingSpots, setFilteredParkingSpots] = useState<
    ParkingSpot[]
  >([]);

  useEffect(() => {
    getRequest<ParkingSpotsResponse>("parking-spots").then((data) => {
      setParkingSpots(data.data.parkingSpots);
      setFilteredParkingSpots(data.data.parkingSpots);
    });
  }, []);

  const _renderSpotCard = (parkingSpot: ParkingSpot, index: number) => {
    return (
      <Link className='text-black' to={"/spot/" + parkingSpot.id}>
        <div
          className='aspect-square relative rounded-md shadow-sm h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer'
          key={index}
        >
          <img
            src={`https://picsum.photos/id/${parkingSpot.id}/200`}
            alt=''
            className='h-full w-full rounded-md'
            loading='lazy'
          ></img>
          <div className='w-full absolute bottom-0 flex flex-row p-2 items-center justify-between rounded-b-md bg-slate-50'>
            <div>
              <p className='m-0 p-0'>Parking Type: {parkingSpot.parkingType}</p>
              <p className='m-0 p-0'>
                Owner:{" "}
                {parkingSpot.owner.firstName + " " + parkingSpot.owner.lastName}
              </p>
            </div>
            <p className='m-0 p-0'>$ {parkingSpot.pricePerMonth}</p>
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
              {filteredParkingSpots?.length > 0 ? (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {filteredParkingSpots.map((parkingSpot, index) =>
                    _renderSpotCard(parkingSpot, index)
                  )}
                </div>
              ) : (
                <div className='text-center flex flex-row items-center justify-center h-full w-full'>
                  <h5>No parking spots available</h5>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <HomeFilter
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        clearCallback={() => {
          setFilteredParkingSpots(parkingSpots);
        }}
        applyCallback={(filtersFields) => {
          setFilteredParkingSpots(
            parkingSpots.filter((item) => {
              if (
                item.parkingType === filtersFields.parkingType &&
                item.pricePerMonth <= filtersFields.priceRange &&
                calculateDistanceFromLatLon(
                  item.location.latitude,
                  item.location.longitude,
                  filtersFields.currentLocation.lat,
                  filtersFields.currentLocation.lng
                ) <= filtersFields.radius
              ) {
                return true;
              }
              return false;
            })
          );
        }}
      />
    </>
  );
}

export default Home;
