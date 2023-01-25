import React from "react";

import { medusaClient } from "@lib/config"
import { dehydrate, QueryClient, useQuery } from "react-query"

import {useState, useEffect} from 'react';

import { Wrapper } from "@modules/common/components/Preview/modely.style";

import Layout from "@modules/layout/templates"

import Section from "@modules/common/components/Section";
import Interior from "@modules/common/components/Interior_Specs";
import Specs from "@modules/common/components/Gen_Spec";
// import Header from "@modules/common/components/Header";
// import Footer from "@modules/common/components/Footer";
import LayeredImage from "@modules/preview/components/LayeredImage";
import Controls from "@modules/preview/components/Controls";
import Banner from "@modules/preview/components/Banner";

import { useRouter } from "next/router"





const handlesPreviewable = {
  "alloygator": {
    "Color": {
      component: "ColorSelectInput", // <-- assuming that these will be some sort of input components
      props: {
        colors: [{
          name: "Red", value: "#1234"
        }]
    },
  }
}
}

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const Preview = () =>{


      const router = useRouter();
      const { query } = router;

      const [bodyColor, setBodyColor] = useState("#ffffff");
      const [wheelColor, setWheelColor] = useState("#000000");
      const [rimColor, setRimColor] = useState("#000000");

      const [handle, setHandle] = useState("");
      const [options, setOptions] = useState("");
      const [defaultValues, setDefaultValues] = useState(true);

      const newProps = {
        bodyColor: bodyColor,
        setBodyColor: setBodyColor,
        wheelColor: wheelColor,
        setWheelColor: setWheelColor,
        rimColor: rimColor,
        setRimColor: setRimColor,
      }

      //----------
      // 1-base.png
      // 2-body.png
      // 3_rear_wheel.png
      // 4_rear_rim.png
      // 5_front_wheel.png
      // 6_front_rim.png

      const layers = [
        // {
        //   backgroundColor: "gray",
        // },
        {
          src:"/images/alloygator-1/1_base.png",
          // color: 
        },
        {
          src:"/images/alloygator-1/2_body.png",
          color: bodyColor
        },
        {
          src:"/images/alloygator-1/3_rear_wheel.png",
          color: wheelColor
        },
        {
          src:"/images/alloygator-1/4_rear_rim.png",
          color: rimColor
        },
        {
          src:"/images/alloygator-1/5_front_wheel.png",
          color: wheelColor
        },
        {
          src:"/images/alloygator-1/6_front_rim.png",
          color: rimColor
        },
      ];


      const layers2 = [
        // {
        //   backgroundColor: "gray",
        // },
        {
          src:"/images/alloygator-2/1_base.png",
          // color: 
        },
        {
          src:"/images/alloygator-2/2_body.png",
          color: bodyColor
        },
        {
          src:"/images/alloygator-2/3_rear_wheel.png",
          color: wheelColor
        },
        {
          src:"/images/alloygator-2/4_rear_rim.png",
          color: rimColor
        },
        {
          src:"/images/alloygator-2/5_front_wheel.png",
          color: wheelColor
        },
        {
          src:"/images/alloygator-2/6_front_rim.png",
          color: rimColor
        },
      ];      
    

      // ------ getting product from the handle
      const { data, isError, isLoading, isSuccess } = useQuery(
        [`get_product`, handle],
        () => {
          if (handle) fetchProduct(handle);
        },
        {
          enabled: handle.length > 0,
          keepPreviousData: true,
        }
      )

    // ------ on page load, set the query values as the default selections
    useEffect(() => {

      if (!defaultValues) return;

      const { options, handle }: any = query

      if (handle) {
        setHandle(handle);
      }
      if (options) {
        setOptions(JSON.parse(options));
      }

      if (handle || options ) {
        setDefaultValues(false);
      }

    }, [query, defaultValues]);

    return(
        <Wrapper>
            {/* <Header/> */}
            <Section 
                // title="Model Y" 
                // backgroundImg="model_y_1.jpeg" 
                
                arrow={false} 
                // range='330'
                // speed='3.5'
                // top='155'
                
                containerClassNames={"h-[100vh] m-[-50px] w-screen overflow-hidden flex flex-col md:items-end "}

                ContentContainer={
                  <div className="m-0 p-0 h-[100vh] w-screen overflow-hidden flex flex-col justify-start items-end">
                      <div className="flex flex-col justify-center md:flex-row md:justify-end pb-4 h-fit w-fit m-32" >
                        <div className={`md:text-5xl font-bold md:p-16 p-5 text-white`}>Color Selector</div>
                        <Controls {...newProps}  />
                      </div>
                    </div>
                }
            >
              <LayeredImage containerClassNames={"overflow-hidden h-screen w-screen top-0 md:top-[-18vh] lg:top-[-48vh]"} layers={layers2}/>
            </Section>
             {/* <Banner />
            <Interior/>
            <Specs/> */}
            {/* <Footer bottom='bottom'/> */}
        </Wrapper>
    )
}

// This is what shows the header and footer. Can be manipulated for fullscreen
Preview.getLayout = (page: any) => {
    return <Layout>{page}</Layout>
  }

export default Preview;