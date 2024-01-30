import { IoClose } from "react-icons/io5";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLng, Map } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";

interface FiltersFields {
  parkingType: "indoor" | "outdoor";
  priceRange: number;
  radius: number;
  currentLocation: LatLng;
}

export const MAP_ZOOM_LEVEL = 16;

export const HomeFilter = ({
  isFilterOpen,
  setIsFilterOpen,
}: {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialFilter: FiltersFields = {
    parkingType: "indoor",
    currentLocation: new LatLng(44.6356313, -63.5951737),
    radius: 5,
    priceRange: 50,
  };

  const [filterState, setFilterState] = useState<FiltersFields>(initialFilter);

  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [isFilterOpen]);

  const fetchUserLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilterState({
          ...filterState,
          currentLocation: new LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
        });
      });
    }
  }, []);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  useEffect(() => {
    if (mapRef?.current) {
      mapRef.current?.on("click", (e) => {
        setFilterState({
          ...filterState,
          currentLocation: new LatLng(e.latlng.lat, e.latlng.lng),
        });
        mapRef.current?.flyTo(
          e.latlng,
          mapRef.current.getZoom() < MAP_ZOOM_LEVEL
            ? MAP_ZOOM_LEVEL
            : mapRef.current.getZoom()
        );
      });
      mapRef.current?.flyTo(
        filterState.currentLocation,
        mapRef.current.getZoom() < MAP_ZOOM_LEVEL
          ? MAP_ZOOM_LEVEL
          : mapRef.current.getZoom()
      );
    }
  }, [mapRef?.current]);

  return (
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
                setFilterState(initialFilter);
                setIsFilterOpen(false);
              }}
            />
          </div>
          <div className='modal-body'>
            <div className='flex flex-col h-full'>
              <div>
                <h6>Type of parking</h6>
                <div className='flex flex-row'>
                  <button
                    className={`py-2 border-2 border-gray-400 rounded-l-md text-center w-[25%] ${
                      filterState.parkingType === "indoor"
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        parkingType: "indoor",
                      });
                    }}
                  >
                    Indoor
                  </button>
                  <button
                    className={`py-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r-md text-center w-[25%] ${
                      filterState.parkingType === "outdoor"
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        parkingType: "outdoor",
                      });
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
                  <input
                    type='range'
                    className='flex-1'
                    min={10}
                    max={500}
                    value={filterState.priceRange}
                    onChange={(e) => {
                      setFilterState({
                        ...filterState,
                        priceRange: e.target.valueAsNumber,
                      });
                    }}
                  />
                  <div className='flex flex-row w-full justify-between'>
                    <span>$10</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
              <hr />
              <div className='h-auto'>
                <h6>Choose location</h6>
                <div className='m-0 h-[200px] w-full'>
                  {filterState.currentLocation.lat !== 0 &&
                  filterState.currentLocation.lng !== 0 ? (
                    <MapContainer
                      center={filterState.currentLocation}
                      zoom={MAP_ZOOM_LEVEL}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      ref={mapRef}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      />
                      <Marker position={filterState.currentLocation} />
                    </MapContainer>
                  ) : null}
                </div>
                <div className='flex flex-row mt-3 items-start'>
                  <h6>Radius</h6>
                  <div className='flex flex-col w-full mx-4'>
                    <input
                      type='range'
                      className='flex-1'
                      min={2}
                      max={20}
                      value={filterState.radius}
                      onChange={(e) => {
                        setFilterState({
                          ...filterState,
                          radius: e.target.valueAsNumber,
                        });
                      }}
                    />
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
                setFilterState(initialFilter);
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
                //TODO
                // make api call with new filters
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
