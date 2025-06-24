import React from 'react';
import heroImage from '../assets/images/aboutHeaderImage.png';
import { FaMagic } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { TbUserHeart } from "react-icons/tb";
import { MdMoneyOff } from "react-icons/md";

export default function About() {
    return (
        <main className='about' role='main'>
            <header>
                <img src={heroImage} alt="hero image" />
                <h1>What is #FITLIFE?</h1>
                <h2>Your Ultimate Fitness Companion</h2>
                <p>At <b>#FITLIFE</b>, we believe that fitness should be accessible, motivating, and personal. That’s why we’ve built a platform that gives you instant access to thousands of high-quality exercise tutorials — right at your fingertips.</p>
            </header>
            <section className="featuresList" aria-labelledby='featuresHeading'>
                <hr style={{ color: 'white' }} />
                <h2>What you can do</h2>
                <div className="features">
                    <div className="featureItem">
                        <h3>Explore Exercises</h3>
                        <p>From strength training to yoga, cardio, and everything in between — search and explore exercises that fit your goals, equipment, and fitness level.</p>
                    </div>
                    <div className="featureItem">
                        <h3>Save your favorites</h3>
                        <p>Create a free account to save your favorite tutorials. Your personalized collection helps you stay focused and consistent on your fitness journey.</p>
                    </div>
                    <div className="featureItem">
                        <h3>Create your account</h3>
                        <p>Login or register in seconds to unlock the full experience. Your profile stores your favorites, recent searches, and more.</p>
                    </div>
                    <div className="featureItem">
                        <h3>Use anytime, anywhere</h3>
                        <p>Whether you’re working out at home, in the gym, or outdoors, #FITLIFE is designed to be your reliable companion wherever life takes you.</p>
                    </div>
                </div>
            </section>
            <section className="benefits">
                <hr />
                <h2>Why choose #FITLIFE?</h2>
                <ul className='benefitLists'>
                    <li>
                        Easy-to-use interface
                        <div className='icon'><FaMagic /></div>
                    </li>
                    <li>Diverse library of exercises
                        <div className='icon'>
                            <CiDumbbell />
                        </div>
                    </li>
                    <li>Personalized experience
                        <div className='icon'><TbUserHeart /></div>
                    </li>
                    <li>No cost to start
                        <div className='icon'><MdMoneyOff /></div>
                    </li>
                </ul>
            </section>
            <section className="ctaBtn">
                <h2>Find the Perfect Workout for You!</h2>
                <button>Let's find your favorite exercise</button>
            </section>
        </main>
    );
}
