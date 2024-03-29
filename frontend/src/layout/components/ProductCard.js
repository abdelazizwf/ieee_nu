import React from 'react';
import * as Strap from 'reactstrap';
import '../../css/master.css'


const ProductCard = (props) => {
    return (
        <div key={props.product.id} className="col-lg-3 col-md-4 col-sm-6 col-6 mt-4" >
                <div>
                    <div className="card">
                        <div>
                            <div class="embed-responsive embed-responsive-4by3" onClick={()=> props.modal(props.product)}>
                                <img className="card-img-top embed-responsive-item" src={props.product.image} alt={props.product.name} />
                            </div>
                            {
                                 props.sale ?
                                    <div className="discount"> 
                                        <p>{props.sale}</p>
                                    </div> : <></>
                            }
                        </div>
                        <div className="card-body">
                            <a href="javascript:void(0)" onClick={()=> props.modal(props.product)}> <h5 className="card-title">{props.product.name}</h5></a>
                            <h5 className="" style={{ color: 'green' }} className="price">Price: {props.product.price} LE</h5>
                            <Strap.CardSubtitle tag="p" className="text-muted my-1 categories">
                                Categories: <p className="overflowEllipse">{props.product.categories.join(", ")}</p>
                            </Strap.CardSubtitle>
                        </div>
                    </div>
                    {
                        props.isAuthenticated
                            ?
                            <button className="card-btn" onClick={props.add(props.product)}>Add To Cart <i className="fas fa-shopping-cart"></i></button>
                            :
                            <button className="card-btn" disabled>Add To Cart <i className="fas fa-shopping-cart" onClick={props.add(props.product)}></i></button>
                    }
                </div>
        </div>
    );
}

export default ProductCard;