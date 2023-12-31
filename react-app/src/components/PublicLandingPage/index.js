import HomePageImage from './home-page.webp'
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import Footer from '../Footer';
import './PublicLandingPage.css'

const PublicLandingPage = () => {
    return (
        <div className="landing-page-container">
            <div className="grid-container">
                <div className="left-grid">
                    <h1 className='home-page-header'>NotTrello brings all your tasks, teammates, and tools together</h1>
                    <p className='home-page-text'>Keep everything in the same place, even if your team isn't.</p>
                    <OpenModalButton
                        buttonText="Sign up - it's free!"
                        modalComponent={<SignupFormModal />}
                        className='signup-button-landing'
                    />
                </div>
                <div className="right-grid">
                    <img src={HomePageImage} alt="" className='home-page-image' />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PublicLandingPage
