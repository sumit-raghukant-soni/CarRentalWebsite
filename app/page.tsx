"use client";

import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

// export default async function Home({ searchParams }: any) {
//   const allCars = await fetchCars({
//     manufacturer: searchParams.manufacturer || '',
//     year: searchParams.year || 2022,
//     fuel: searchParams.fuel || '',
//     limit: searchParams.limit || 10,
//     model: searchParams.model || '',
//   });

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search States
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filtering States
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // Pagination limit States
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {
                allCars?.map((car) => (
                  <CarCard car={car} />
                ))
              }
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="Loader"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />

          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">OOPS! No results</h2>
            <p>{allCars?.message}</p>
          </div>
        )
        }

      </div>
    </main>
  );
}
