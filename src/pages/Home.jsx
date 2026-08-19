import React from 'react'
import Hero from './Hero'
import Program from './Program'
import About from './About'
import Trainer from './Trainer'
import WhyUs from './WhyUs'
import Facility from './Facility'
import Premium from './Premium'
import Banner from './Banner'
import BlogSection from './BlogSection'
import Faq from './Faq'
import Gallery from './Gallery'
import TestimonailPage from './TestimonailPage'

const Home = () => {
    return (
        <>
            <div>
                <Hero />
                <Program />
                <About />
                <Trainer />
                <WhyUs />
                <BlogSection />
                <Facility />
                <Premium />
                <Gallery/>
                <Banner />
                <TestimonailPage/>
                <Faq />
            </div>
        </>
    )
}

export default Home