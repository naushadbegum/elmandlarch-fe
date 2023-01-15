import React from 'react';
import css from '../css/style.css';

export default function Story() {
    return (
        <React.Fragment>
            <section className="story">
                <div className="row">
                <div className="column">
                    <div className="about-img">
                    </div>
                </div>

                <div className="column">
                    <div className="tabs">
                        <div className="single-tab">
                        <h1>We are a travel-inspired brand with sustainability at the core of everything we do</h1>
                        <h5>We believe travel can be transformative and celebrate all forms, local and far - from a trip to the park to a milestone life celebration on the other side of the world.  We create impeccably designed, multi-functional, sustainable bags, luggage and accessories: companions for all journeys.</h5>
                        </div>
                    </div>
                </div>
                </div>
                <section className='story-quote'>
                    <div className='story-quote-word'>
                        <span>
                            <p>Nothing to lose and a world to see.</p>
                        </span>
                    </div>
                </section>
                <div className="row">

                <div className="column">
                    <div className="tabs">
                        <div className="single-tab">
                        <h1>We are a travel-inspired brand with sustainability at the core of everything we do</h1>
                        <h5>We believe travel can be transformative and celebrate all forms, local and far - from a trip to the park to a milestone life celebration on the other side of the world.  We create impeccably designed, multi-functional, sustainable bags, luggage and accessories: companions for all journeys.</h5>
                        </div>
                    </div>
                </div>
                
                <div className="column">
                    <div className="about-img"></div>
                </div>

                
                </div>
            </section>
        </React.Fragment>
    )
}