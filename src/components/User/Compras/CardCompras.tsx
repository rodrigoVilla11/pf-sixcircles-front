import styles from "./CardCompras.module.scss";
import { clearProducts } from "../../../redux/actions/productActions.";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CommentList from "../../Details/coments/CommentsList";
import { urlAxios } from "../../../utils";
import { getToken } from "../../../utils";
interface Product {
  key: any;
  id: any;
  name: string;
  image: any;
  price: number;
  punctuation: number;
  cantidadCarrito: number;
}
export default function (props: Product) {
  const navigate = useNavigate();
  const dispatch: Function = useDispatch();
  const id = props.id;
  const handleClick = () => {
    dispatch(clearProducts());
    navigate(`/detail/${id}`);
    window.scrollTo(0, 0);
  };

  const [puntuacion, setPuntuacion] = useState(false);
  const showpuntuacion = () => {
    setPuntuacion(true);
  };

  useEffect(() => {}, []);
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <img
          src={props.image[0].url}
          alt={props.name.slice(0, 10)}
          onClick={() => handleClick()}
        />
      </div>
      <div className={styles.contTitle}>
        <h3 className={styles.title} onClick={() => handleClick()}>
          {props.name.slice(0, 15)}...
        </h3>
        <p>({props.cantidadCarrito})</p>
        <button className={styles.buttonComent} onClick={showpuntuacion}>
          Puntuar
        </button>
      </div>

      <div className={styles.precio}>
        <p className={styles.precio}>
          Total ${props.price * props.cantidadCarrito}
        </p>
      </div>

      {puntuacion ? (
        <div className={styles.puntuacion}>
          {" "}
          <CommentList
            id={id}
            setPuntuacion={setPuntuacion}
            name={props.name}
          />{" "}
        </div>
      ) : null}
    </div>
  );
}
