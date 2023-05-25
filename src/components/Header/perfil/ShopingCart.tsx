import { useState, useEffect, useRef } from 'react';
import styles from './ShopingCart.module.scss';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { CarritoPage } from '../..';

function ShopingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { cartProducts } = useSelector((state: any) => state.carrito);

  const navigate = useNavigate();
  const username: any = window.localStorage.getItem("user");
  let user;
  if (username) {
    user = JSON.parse(username);
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  const handleLogin = () => {
    if (!username) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.buttonContainer} ref={buttonRef} onClick={handleLogin}>
      <div className={`${styles.button} ${isOpen ? styles.expanded : ''}`} onClick={handleClick}>
        <AiOutlineShoppingCart className={styles.icons2} />
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {cartProducts.length ? cartProducts.map((p: any) => <CarritoPage key={p._id} producto={p} />) : <h3>No hay nada por aquí...</h3>}
          <Link to="/carrito"><div className={styles.option2}>Ver mi carrito</div></Link>
        </div>
      )}
    </div>
  );
};

export default ShopingCart;









{/* <div style={{ position: "relative" }}>
  <a
    href="#"
    className={styles.letras}
    onClick={() => {
      navigate("/carrito");
    }}
  >
    <AiOutlineShoppingCart className={styles.icons2} />
  </a>
  {showCarrito && <Carrito />}
</div> */}
