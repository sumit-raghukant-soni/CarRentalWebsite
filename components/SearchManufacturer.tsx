import { SearchManufacturerProps } from '@/types'
"use client";
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');

    const filteredManufacturers = query === ""
        ? manufacturers
        : manufacturers.filter((item) => (
            item.toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
        ))

    return (
        <div className="search-manufacturer">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/car-logo.svg"
                            width={20}
                            height={20}
                            className="ml-4"
                            alt="Car Logo"
                        />
                    </Combobox.Button>
                    <Combobox.Input
                        className='search-manufacturer__input'
                        displayValue={(item: string) => item}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Volkswagen...'
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='absolute w-full z-20 bg-white'>
                            {
                                filteredManufacturers.length === 0 && query !== "" ?
                                    (
                                        <Combobox.Option
                                            value={query}
                                            className="search-manufacturer__option">
                                            {/* Create "{query}" */}
                                            No Match Found
                                        </Combobox.Option>
                                    )
                                    :
                                    (
                                        filteredManufacturers.map((item) => (
                                            <Combobox.Option
                                                key={item}
                                                value={item}
                                                className={({ active }) => `
                                                relative search-manufacturer__option 
                                                ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                                                {/* {item} */}
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {item}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                            >

                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer