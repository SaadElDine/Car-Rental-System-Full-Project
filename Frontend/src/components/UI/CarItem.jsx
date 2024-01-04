import React from "react";
import { Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";


const CarItem = (props) => {
  const { imageUrl, model, plateId, status, color, price, location, year } = props.item;
  const navigate = useNavigate();
  
  const onClick = async () => {
    if(!localStorage.getItem("loggedIn")){
      navigate("/register"); 
      alert("Please Register First!");
    }
    else 
    {
      navigate("/reservation");
    }
  };
 

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imageUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{model}</h4>
          <h6 className="rent__price text-center mt-">
            {price}LE <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {year}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {status}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {plateId}
            </span>
          </div>
          <button className="w-100 car__item-btn car__btn-details"  onClick={onClick}>
            Rent Car
          </button>

        </div>
      </div>
    </Col>
  );
};

export default CarItem;
