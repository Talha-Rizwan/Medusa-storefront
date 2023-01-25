const Banner = () =>{
    return <>
    <div className="mx-4 p-6 py-12 bg-red-700 text-gray-50">
              <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="flex flex-col">
                  <h2 className="text-center text-6xl tracking-tighter font-bold">Protect Your Wheels</h2>
                  <div className="space-x-2  py-2 lg:py-0 font-bold text-center ">Say good-bye to kerb rash</div>
                  </div>
                  <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-900 text-gray-50 border-gray-600">Buy Now</a>
                </div>
              </div>
            </div>
    </>
}

export default Banner;