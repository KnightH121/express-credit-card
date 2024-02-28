import React, { useState } from "react";
import cardData from "../../data/data";
import { Link } from "react-router-dom";

const Store = () => {
  const [cardDataInfo, _] = useState(cardData);
  return (
    <section className="container" id="store">
      <p className="available-card">Available Cards</p>

      <div className="card-container">
        {cardDataInfo?.map((card) => {
          const { cardType, id, holder, cardNum, price } = card;
          return (
            <div className="card-info" key={id}>
              <span>
                <img
                  srcSet={`${cardType} 1x, ${cardType}@2x 2x, ${cardType}@3x 3x`}
                  src={
                    cardType
                  } /* Fallback source for browsers that don't support srcSet */
                  alt={cardType}
                  loading="lazy"
                />
              </span>
              <p className="holder">{holder}</p>
              <p className="cardNum">{cardNum}</p>
              <button>
                <Link style={{color: "#fff"}} to={"/payment"}>Buy for ${price}</Link>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Store;
