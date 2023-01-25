import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo } from "react"
import { Product } from "types/medusa"
import { useState } from "react"
import ListBox from "../listbox/index"
import Router from "next/router"
import { useRouter } from "next/router"
import { useEffect } from "react"


import { onlyUnique } from "@lib/util/only-unique"


type ProductActionsProps = {
  product: Product
}

type ProductOptionComponentProps = {
  option: any
  current: any
  updateOption: any
  title: String
}

const RadioButtons = ({ 
  option,
  current,
  updateOption,
  title,
 }: ProductOptionComponentProps) => {
  const filteredOptions = option.values.map((v:any) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-row ">
      {
        filteredOptions.map((v: any, idx: number) => {
          return (
            <button 
            key={idx}
            onClick={() => updateOption({ [option.id]: v })}
            className={
              (
                v === current ?
                "text-white bg-red-500 hover:bg-red-600 p-1 px-3"
                : "text-black bg-gray-200 hover:bg-gray-300 p-1 px-3"
              )
              +
              " "
              +
              (
                idx === 0 
                ? "rounded-l-md"
                : idx === filteredOptions.length - 1
                ? "rounded-r-md"
                : ""
              )
            }>{v}</button>
          )
        })
      }
    </div>
  )
}

const Select = ({ 
  option,
  current,
  updateOption,
  title,
 }: ProductOptionComponentProps) => {
  const filteredOptions = option.values.map((v:any) => v.value).filter(onlyUnique);

  return (
    <div className="flex flex-col gap-y-3">
    <span className="text-base-semi">Select {title}</span>
        <ListBox selected={{name:current || `Choose a ${title}...`, value:current}} setSelected={(v:any) => {
          updateOption({ [option.id]: v?.value });
        }} object={filteredOptions.map((item:any) => {
          return {
            name: item,
            value: item,
          }
        })}/> 
      </div>
  )
}

// TODO: Make this fully dynamic with the suggestion here: https://stackoverflow.com/a/37625215
const optionsComponents = {
  "Set": RadioButtons,
  "Color": Select
}



const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, increaseQuantity, decreaseQuantity, setQuantity: setSelectedQuantity, quantity: selectedQuantity, options, inStock, variant } = useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })
 
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const [defaultValues, setDefaultValues] = useState(true)

  const router = useRouter();
  const { query } = router

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // on page load, set the query values as the default selections
  useEffect(() => {

    if (!defaultValues) return;

    const { options, quantity }: any = query

    if (options) {
      updateOptions(JSON.parse(options));
    }
    if (quantity) {
      setSelectedQuantity(Number(quantity));
      // setQuantity(quantity)
    }

    if (options || quantity) {
      setDefaultValues(false);
    }

  }, [query, defaultValues]);

  const updateQuery = () => {

    // `replace` doesn't spam the browser history 
    Router.replace(
      {
        pathname: router.pathname,
        query: {
          ...query,
          ...{
            // we'll store the options in JSON (as-is)
            options: JSON.stringify(options),
            quantity: selectedQuantity,
          }
        },
      },
      undefined,
      // `shallow: true` prevents refresh of page
      { shallow: true }
    );

  };

  useEffect(() => {
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (selectedQuantity && Object.keys(options).length !== 0 && !(Object.keys(options).filter((key) => options[key] !== undefined).length === 0)) {
      updateQuery()
    }
  }, [selectedQuantity, options])
 
 
  const isPreview = product.tags.find(t => t.value.includes("preview"))
 
  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            {product.collection.title}
          </a>
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options.map((option) => {
            const Component = optionsComponents[option.title as keyof typeof optionsComponents] || OptionSelect;
            return (
              <div key={option.id}>
                {
                React.createElement(
                  Component,
                  {
                    option: option,
                    current: options[option.id],
                    updateOption: updateOptions,
                    title: option.title,
                  }
                )
          }
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
            
            {!variant && "Starting from "} {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div >
        <div className="my-3 flex rounded-md ">
          <button onClick={(e) => {
            e.preventDefault()
            // setSelectedQuantity(--selectedQuantity)
            decreaseQuantity();

          }} type="button" className="mr-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md   hover:bg-red-200  text-red-500 bg-red-100 ">
            -
          </button>
          <div className="relative flex items-stretch focus-within:z-10">
            <div className="text-center block w-10 rounded-none self-center  sm:text-sm ">
              {selectedQuantity}
            </div>
          </div>
          <button onClick={(e) => {
            e.preventDefault();
            // setSelectedQuantity(++selectedQuantity);
            increaseQuantity();
          }} type="button" className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md   hover:bg-red-200  text-red-500 bg-red-100 ">
            +
          </button>
        </div>
      </div>

      <div className="flex space-x-2 ">
        {/* <ListBox selected={selectedColor} setSelected={setSelectedColor} object={color}/>  */}
        { isPreview ? 
        <>
          {/* <p className="self-center">or</p> */}
          <Link href={{
            pathname: '/preview',
            query: query
          }}>
            <a className="text-white bg-red-500 hover:bg-red-600 p-2 px-5 rounded-md text-center ">Try it</a>
          </Link>
        </>
          :
          <></>
        }

      </div>

      <div className="mt-10 rounded-md " >
        <Button disabled={!inStock || !variant || isButtonLoading} onClick={() => {

          setIsButtonLoading(true);
          addToCart(() => setIsButtonLoading(false));
          // router.push("/cart")
        }}  
        isLoading={isButtonLoading}>
          {
            isButtonLoading ? 
            "Please wait..."
            :
            !inStock ? "Out of stock" : "Add to cart"}
        </Button>
      </div>

      <h2 className="text-sm font-semibold mt-10">Description</h2>
      <p className="text-base-regular">{product.description}</p>
    </div>
  )
}

export default ProductActions
