import { AccountProvider } from "@lib/context/account-context"
import { StoreProvider } from "@lib/context/store-context"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'

// TODO: Purge heroicons, use just one icon library
import { XMarkIcon } from '@heroicons/react/24/outline'

import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import FeaturedProducts from "@modules/home/components/featured-products"

// https://medium.com/@richyinbeta/next-js-get-and-update-query-from-url-how-to-guide-43a8fb04e081
import Router, { useRouter } from 'next/router';
import {useEffect, useRef} from 'react';
import { filter } from "lodash"


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  }, 
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter({children }) {
 
const {query}=useRouter();
const [defaultValues, setDefaultValues]=useState();
  useEffect(()=>{
    console.log("intial query",query);
    setDefaultValues(query)    
  },[query]);

  
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const updateQuery = (newQuery) => {
    Router.replace({
        query: newQuery,
    });
  };

  const filterForm = useRef(null)

  const [queryString, setQueryString] = useState(); 

  // const [isQuerying, setIsQuerying] = useState("");

  const onChangeSubmitForm = (e) =>  {
    
   
    filterForm.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    )
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event.target", event.target);

    var data;
    try {
      data = new FormData(event.target);      
    }
    catch(e) {
      data = new FormData(event.target.value);
    }
    console.log("Form data is:", data);



    // https://stackoverflow.com/questions/42980645/easier-way-to-transform-formdata-into-query-string
    const _queryString = new URLSearchParams(data).toString()

    setQueryString(_queryString);

  }


  useEffect (() => {
   

    let queryTimeout;

    if (queryString) {
      queryTimeout = setTimeout(() => {
       
        updateQuery(queryString);
      
        setQueryString("");
      }, 500);
    }

    return () => {
      clearTimeout(queryTimeout);
    }

  }, [queryString]);

  const dataQuery = () => {
    setState()
  }


  return (
    <div className="ml-8  w-full text-black" >
      <form ref={filterForm} className="lg:block" onSubmit={handleSubmit} >
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            
        

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className=" ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-black text-white-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2  text-black-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-black text-white-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-black-400 hover:text-white-500">
                                <span className="font-black text-white-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => { 

                                console.log(defaultValues["colors[]"]);
                                const _defaultValue = defaultValues["colors[]"].includes(option.value) || option.value;
                                const _defaultChecked = defaultValues["colors[]"].includes(option.value) || option.checked;

                                return (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={_defaultValue}
                                      type="checkbox"
                                      defaultChecked={_defaultChecked}
                                      className="h-4 w-4 rounded border-gray-300 text-white focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-white-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                )})}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="  mx-auto max-w-7xlp-4 ">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-White-900">Find what you love</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center  text-sm font-black text-white hover:text-white ">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white  group-hover:text-white"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-black shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-black text-white' : 'text-white',
                                active ? 'bg-gray' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              
              <input 
              onChange={onChangeSubmitForm}               
              type="text" name="title" placeholder="Search title..."
              defaultValue={defaultValues?.title}
               className="px-3 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" /> 
              {/* <button type="button" className="-m-2 ml-5  mr-8 p-2 text-black-400 hover:text-white-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 block text-black-400 hover:text-black-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block"
              // onChange={onChangeSubmitForm}
              >

              

                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-black pb-6 text-sm font-black text-white">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>


              

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-black py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-gray-100 py-3 text-sm text-black-400 hover:text-white-500">
                            <span className="font-black text-white-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => {

                              
                                                              console.log(defaultValues && defaultValues["color[]"]);
                                                              const _defaultValue = defaultValues && defaultValues["color[]"]?.includes(option.value) || option.value;
                                                              const _defaultChecked = defaultValues && defaultValues["color[]"]?.includes(option.value) || option.checked; 
                            return (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={_defaultValue}
                                  type="checkbox"
                                  defaultChecked={_defaultChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-white-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            )})}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}

              <input type="submit" placeholder="APPLY"/>

              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="h-96 lg:h-full">
               
                    {children}

               
                </div> 
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </form>
    </div>
  )
}