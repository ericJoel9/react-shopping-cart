import React,{Component} from 'react' 
import formatCurrency from "../util";
export default class Cart extends Component {
    render(){
        const{cartItems}=this.props;
        return(
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is empty</div>
                ) : (
                <div className="cart cart-header">
                   You have {cartItems.length} in the cart{" "}
                </div>
               )}
              <div>
                  {/* ici on affiche l'element ajoute dans le panier avec son image et un bouton Remove pour supprimer chaque element */}
               <div className="cart">
                 <ul className="cart-items">
                    {cartItems.map(item =>(
                        <li key={item._id}>
                            <div>
                                <img src= {item.image} alt={item.title}></img>
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {/* afficher le prix d'un element */}
                                    {formatCurrency(item.price)} x {item.count}{" "}
                                <button className="button"
                                 onClick={()=>this.props.removeFromCart(item)}>
                                    Remove
                                </button>
                                </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>  
               </div>
               {cartItems.length!==0 &&(
                <div className="cart">
                   <div className="total">
                       <div>
                           Total:{" "}
                           {formatCurrency(cartItems.reduce((a,c) => a+ c.price*c.count, 0))}
                       </div>
                       <button className="button primary">
                           Procced
                       </button>
                   </div>

               </div>
               )}
               
               </div>
              
            </div>
          
            
        )
    }
}