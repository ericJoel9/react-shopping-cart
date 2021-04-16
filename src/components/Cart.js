// importaion des modules que ce composant utilise
import React,{Component} from 'react' 
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
export default class Cart extends Component {
    constructor(props){
        super(props);
        
        this.state={ 
        name: "",
       email: "",
       address: "",
       // declaration de showCheckout à false(on cache le formulaire si l'utilisateur n'a pas cliqué sur proceed)
       showCheckout : false};
    }
    // fonction executer pour chaque element du formulaire
    handleInput=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    // on construit la fonction createOder qui prend en compte comme variable les 3 elements du formulaire et la commande
    createOrder=(e)=>{
        e.preventDefault();
        const order = {
          name  :this.state.name,
          email  :this.state.email,
          address  :this.state.address,
         cartItems  :this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    // ici on implemente ce qu'on veut que le composant cart retourne
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
                   {/* on met le contenu de la liste du panier dans fade pour gerer l'animation */}
                <Fade left cascade>
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
                </Fade>
               </div>
               {cartItems.length!==0 &&(
                   <div>
                <div className="cart">
                   <div className="total">
                       <div>
                           Total:{" "}
                           {formatCurrency(cartItems.reduce((a,c) => a+ c.price*c.count, 0))}
                       </div>
                       {/* une fois on clique sur procced showCheckout passe à true et le formulaire s'affiche */}
                       <button onClick={() => {this.setState({showCheckout: true})}} className="button primary">
                           Proceed
                       </button>
                   </div>

               </div>
               {this.state.showCheckout && (
                   <Fade right cascade>
                   <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input name="email" type="email" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Address</label>
                                <input name ="address" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <button className="button primary" type="submit">Checkout</button>
                            </li>
                        </ul>
                    </form>
                    </div>
                    </Fade> 
               )}
               
               
               </div>
               )}
            </div>
            </div>
          
            
        )
    }
}