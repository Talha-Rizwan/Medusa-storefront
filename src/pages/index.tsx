import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import React from 'react';
// TODO: Replace Styled components with CSS Modules - one less dependency
import { Wrapper,Content } from '../styles/home.style';
import Section from '@modules/common/components/Section';
import Header from '@modules/common/components/Header';
import Footer from '@modules/common/components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }:{locale:any}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the ACME. Worldwide Shipping. Secure Payment."
      />
      {/* <Hero /> */}
      {/* <FeaturedProducts /> */}
      <Wrapper>



<Content>


    <Section title={t("home:title")} desc={t("home:title-description")} link= {t("home:link")} leftbtn={t("home:leftbtn")} rightbtn={t("home:rightbtn")} backgroundImg="JPrice_Lamborghini_MCW18-1755-01.jpeg" arrow="true"/>
</Content>

<Content>
    <Section title={t("home:title2")} desc={t("home:title2-description")} link= {t("home:link2")} leftbtn={t("home:leftbtn2")} rightbtn={t("home:rightbtn2")} backgroundImg="2022-lamborghini-aventador-121-1625607312-01.jpeg"/>
</Content>
{/* <Content>
    <Section title="Model S" desc="Order Online for " link="Touchless Delivery" leftbtn="CUSTOM ORDER" rightbtn="EXISTING INVENTORY" backgroundImg="model-s.jpg"/>
</Content>
<Content>
@@ -42,10 +67,10 @@ const Home: NextPageWithLayout = () => {
</Content>
<Content>
    <Section title="Solar Roof" desc="Produce Clean Energy From Your Roof" leftbtn="ORDER NOW" rightbtn="LEARN MORE" backgroundImg="solar-roof.jpg"/>
</Content> */}
<Content>
    <Section  title={t("home:title3")} leftbtn={t("home:leftbtn3")}  backgroundImg="accessories.jpg"/>
    {/* <Footer/> */}
</Content>
</Wrapper>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
