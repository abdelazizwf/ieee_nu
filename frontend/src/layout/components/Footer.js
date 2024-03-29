import React from "react";
import { Col, Container, Jumbotron, Row } from "reactstrap";

import { NavLink } from "react-router-dom";
import '../../css/master.css'


const Footer = (props) => {
    return (
        <>
            <footer style={{ backgroundColor: '#495057' }} className="footer row">
                <div className="container">
                    <div className="p-4 row col-12">
                        <div className="col-lg-3 col-md-3 col-sm-6  col-6">
                            <h3>Links</h3>
                            <ul className="list-unstyled">
                                <li><a href="/home">Home</a></li>
                                <li><a href="/cart">Cart</a></li>
                                <li><a href="/orders">Orders</a></li>
                                <li><a href="/history">History</a></li>
                                {
                                    (props.authState.user !== null)
                                        ?
                                        (props.authState.user.isStaff === 'True')
                                            ?
                                            <li><a href="/staff">Staff Panel</a></li>
                                            :
                                            null
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <div className=" col-lg-4 col-md-4 col-sm-6 links col-6">
                            <h5>Our Adress</h5>
                            <p>26th of July Corridor <br />
                            Al Sheikh Zayed<br />
                            Giza Governorate <br />
                                <i className="fas fa-phone-alt"></i> +201007543699<br />
                                <i className="fa fa-envelope-o"></i> <a href="mailto:IEEEnu@nu.edu.eg" target="_blank">IEEEnu@nu.edu.eg</a></p>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12 mb-4 mb-md-0">
                            <iframe title="Geolocation" class="mt-2" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAyzbtDMm8MS1VLeeEeA_4MVpYAxr0l8Oc&amp;q=30.0118469,30.9857909&amp;zoom=18&amp;maptype=satellite" frameborder="0" width="100%" height="100%"></iframe>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <a href="https://www.facebook.com/IEEENUSB" target="_blank" className="btn btn-social-icon"><i className="fa fa-facebook"></i></a>
                            <a href="https://www.instagram.com/ieeenusb/" target="_blank" className="btn btn-social-icon"><i className="fa fa-instagram"></i></a>
                            <a href="mailto:IEEEnu@nu.edu.eg" target="_blank" className="btn btn-social-icon"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>

                <div className="col-12 info" style={{ backgroundColor: '#212529' }}>
                    <p>© Copyright 2021 IEEE Nile Universty Student Branch</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
