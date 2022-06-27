import { MDBFooter } from 'mdb-react-ui-kit';
import classes from './Footer.module.css';

const Footer = () => {

    return (
        <div style={{ paddingTop: "70px" }}>
            <MDBFooter className={`text-center text-white ${classes["footer"]}`} style={{ backgroundColor: '#0a4275' }}>
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2022 Copyright: GlobeFlight.com
                </div>
            </MDBFooter >
        </div>
    );
}

export default Footer;