import React from 'react'
import * as Strap from 'reactstrap';

const PopUp = (props) => {
    return (
        <>
            
            <div class="jumbotron  pop-content" style={{backgroundColor: '#fff'}}>
                <div className="row">
                    <div className="col-lg-my-3 col-my-12">
                        <div className="ratio ratio-4x3 d-flex  ">
                            <img className="my-auto" src={props.product.image} style={{borderRadius: '5px'}}/>
                        </div>
                    </div>
                    <div className="col-lg-my-9 col-my-12">
                        <h3 className="mt-2">{props.product.name}</h3>
                        <h5 style={{color: 'green'}}>Price: {props.product.price} LE</h5>
                        <h6 className="text-muted">Description:</h6>
                        <p className="text-muted">{props.product.description}</p>
                        <div style={{textAlign: 'right'}} className="card-btn-container">
                           <button className="card-btn-pop" onClick={props.add(props.product)} style={{maxWidth: '12em'}}>Add To Cart <i className="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp;