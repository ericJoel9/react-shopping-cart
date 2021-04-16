// importaion des modules que ce composant utilise
import React,{Component} from 'react' 
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from  "react-reveal/Zoom"
export default class Products extends Component {
//    le constructeur est utilisé pour le module react-Modal qui permet d'avoir les infos sur un produit quand on clique sur ce produit
    constructor(props){
        super(props);
        this.state = {
            product:null,

        };
    }
    openModal = (product)=>{
        this.setState({product});
    };
    closeModal = ()=>{
        this.setState({product:null});
    }
     // ici on implemente ce qu'on veut que le composant product retourne
    render(){
        const {product}=this.state;
        return(
            <div>
                {/* on met la liste des produits dans fade pour l'animation */}
              <Fade bottom cascade>
              <ul className="products">
                  {this.props.products.map(product =>(
                      <li key={product.id}>
                          <div className="product">
                              {/* tu clique sur l'image d'un produit ca t'ouvre le Modal de ce produit */}
                              <a href={"#" + product._id} onClick={()=>this.openModal(product)}>
                                  <img src={product.image} alt={product.title}></img>
                                  <p>
                                      {product.title}
                                  </p>
                              </a>
                              <div className="product-price">
                                  <div>
                                      {formatCurrency (product.price)}
                                  </div>
                                  <button onClick={()=>this.props.addToCart(product)} 
                                  className="button primary" >
                                      Add To Cart
                                  </button>
                              </div>
                          </div>
                      </li>
                  ))}
                  </ul>  
                  </Fade>
                  {/*implementation de la condition sur l'utilisation de modal(il faut que le produit existe) */}
                  {product && <Modal isOpen={true} onRequestClose={this.closeModal}>
                      {/* si le produit existe et modal est importé on utilise l'effet Zoom */}
                      <Zoom>
                          <button className="close-modal" onClick={this.closeModal}>x</button>
                          <div className="product-details">
                              <img src={product.image} alt={product.title}></img>
                            <div className="product-details-description">
                               <p><strong>{product.title}</strong></p>
                                <p>{product.description}</p>
                                <p>Available Sizes:{" "}
                                   {product.availableSizes.map((x)=>(
                                       <span>
                                           {" "}
                                           <button className="button">{x}</button>
                                       </span>
                                   ))}
                                </p>
                                <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)};
                                            
                                        </div>
                                        {/* ce boutton a 2 fonctionnalité: fermer le Modal et ajouter au panier */}
                                        <button className="button primary" onClick={()=>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>Add to card</button>
                                </div>
                            </div>
                          </div>
                      </Zoom>
                      </Modal>}
            </div>
        )
    }
}