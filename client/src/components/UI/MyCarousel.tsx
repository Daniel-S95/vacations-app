import Carousel from 'react-bootstrap/Carousel';
import classes from './MyCarousel.module.css';

const MyCarousel = () => {

    const carouselImages = ["boat", "maldives", "polynesia"];

    return (
        <div className={classes["carousel-container"]}>
            <Carousel fade className={`${classes["carousel"]} ${classes["carousel-inner-item"]}`}>
                {carouselImages.map((image) => <Carousel.Item key={image} className={classes["carousel-item"]}><img className={`d-block w-100 ${classes["carousel-image"]}`} src={`images/carousel/${image}.jpg`} alt={`${image}`} /></Carousel.Item>)}
            </Carousel>
            <span className={`${classes["carousel-inner-item"]} ${classes["why-us-container"]}`}>
                <label className={classes["why-us-header"]}>Why choose us?</label><br />
                <label className={classes["why-us-body"]}>Because we've been there and done it. When you choose us, you'll feel the benefit of 15 years experience!</label><br />
                <label className={classes["why-us-body"]}>We are committed to help our customers find their perfect vacation.</label><br />
                <label className={classes["why-us-body"]}>Our prices are competitive and fair. There are no surprise bills. Any unexpected or additional expenses must be pre-approved by you. That's how we would like to be treated, and that is how our clients are treated.</label><br />
                <label className={classes["why-us-body__bigger"]}>So what are you waiting for? Scroll to begin the journey for your next vacation!</label>
            </span>
        </div >
    );
}

export default MyCarousel;