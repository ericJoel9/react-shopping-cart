//feature 1
import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json"

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      // si l'element existe dans le panier alors le sauvegarder apres actualisation de la page
      cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
    };
  }
  // Toutes les fonctions sont impléméntées dans cette page 
 //tous le css du projet est gerer dans une page appelé index.css
  createOrder=(order)=>{
    alert("Need to save order for "+ order.name);
  }
  //funcion removeFromCart
  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
     cartItems: cartItems.filter(x=>x._id !== product._id)
    });
    // permet de sauvegarder ce qui se trouve dans le panier après actualisation de la page
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
  };
  //function addToCart
  addToCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    let alreadyInCart=false;//variable qui insique si le produit est dans le panier initialisé à faux
    cartItems.forEach((item)=>{ //parcours des elements du panier
      if(item._id === product._id){ //compare id de l'element du panier et du produit(si egale)
        item.count++;//incremente les elements du panier
         alreadyInCart = true;
           }
      });
      if(!alreadyInCart){//si le produit n'est pas dans le panier
        cartItems.push({ ...product, count: 1});
      }
      this.setState({cartItems});//mis à jour du panier
      // permet de sauvegarder ce qui se trouve dans le panier après actualisation de la page
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };
  sortProducts =(event)=>{
   //fonction qui classe les produits en fonction des prix
   const sort = event.target.value;
   console.log(event.target.value);
   this.setState((state)=>({
    sort : sort,
    products: this.state.products.slice().sort((a,b)=>
      sort==="lowest"?
      a.price>b.price ? 1:-1:
      sort === "highest"?
      a.price<b.price ?1:-1:

      a._id<b._id ? 1:-1
    ),
   }));
   
  }
  filterProducts=(event)=>{
    // fonction qui classe les produits en fonction de la taille
    console.log(event.target.value);
   if(event.target.value ===""){
     this.setState({size:event.target.value, products:data.products});
   }else{
    this.setState({
      size:event.target.value,
      products : data.products.filter(
        (product)=>product.availableSizes.indexOf(event.target.value)>=0),
      });
   }
  }
    // page principale de l'application qui retourne un type html que l'on divise en fonction de ce qu'on veut obtenir
    //ici  on a 3 partie principales:header ,main ,footer
    // dans le main on a 3 sous div qui appartiennet aux differentes composants creer(product,filter,cart)
  render(){
    return (
      <div className = "grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              {/* composant Filter.Js et ses fonctions qu'il utilise  */}
              <Filter
              count={this.state.products.length}
              size ={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              >
              </Filter>
              {/* composant product.js et ses fonctions qu'il utilise */}
               <Products
                products={this.state.products}
                 addToCart={this.addToCart}>

                </Products>
            </div>
            <div className="sidebar">
              {/* on passe ces fonctions comme composant de cart pour eviter l'erreur lors de l'appel de ces fonctions par l'utilisateur */}
                <Cart 
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
            />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}


export default App;
