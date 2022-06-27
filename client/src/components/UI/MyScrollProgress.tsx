import ScrollProgressRead from 'react-scroll-progress-read';
import classes from './MyScrollProgress.module.css';

const MyScrollProgress = () => {
    return (
        <div className={classes["scroll-bar"]}>
            <ScrollProgressRead
                backgroundColor="transparent"
                barColor="#0000A9"
                height="5px"
            />
        </div>
    );
}

export default MyScrollProgress;