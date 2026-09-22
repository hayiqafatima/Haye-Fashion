import React,{useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter,Routes,Route,Link,useNavigate,useParams} from "react-router-dom";
import {Menu,X,Search,UserRound,ShoppingBag,ArrowRight,ArrowLeft,Minus,Plus,Trash2,Instagram} from "lucide-react";
import "./styles.css";

const PRODUCTS=[
{id:1,name:"Mehrunisa",type:"Bridal",price:285000,desc:"A hand-embellished ivory bridal ensemble with antique gold detailing and a sculpted silhouette.",img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=88"},
{id:2,name:"Roya",type:"Formal",price:76500,desc:"A fluid evening silhouette with tonal handwork and delicate finishing.",img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=88"},
{id:3,name:"Noor",type:"Bridal",price:325000,desc:"An heirloom-inspired bridal look layered with fine embroidery and luminous texture.",img:"https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=88"},
{id:4,name:"Ayla",type:"Formal",price:89000,desc:"A refined black formal with architectural drape and understated embellishment.",img:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=88"},
{id:5,name:"Zoya",type:"Luxury Pret",price:48500,desc:"Soft tailoring and intricate details designed for intimate celebrations.",img:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=88"},
{id:6,name:"Sahar",type:"Luxury Pret",price:56000,desc:"A modern festive ensemble balancing clean lines with artisanal surface work.",img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=88"}
];
const money=n=>"PKR "+n.toLocaleString("en-PK");

function Layout({cart,setCart}){
 const [menu,setMenu]=useState(false); const [search,setSearch]=useState(false);
 return <><div className="topbar">Complimentary nationwide delivery on bridal orders</div>
 <header>
  <button className="mobile icon" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  <Link to="/" className="brand">HAYÉ</Link>
  <nav className={menu?"navlinks show":"navlinks"}>
   <Link to="/shop" onClick={()=>setMenu(false)}>New In</Link><Link to="/shop?type=Bridal" onClick={()=>setMenu(false)}>Bridal</Link>
   <Link to="/shop?type=Formal" onClick={()=>setMenu(false)}>Formals</Link><Link to="/about" onClick={()=>setMenu(false)}>Maison</Link>
  </nav>
  <div className="tools"><button className="icon" onClick={()=>setSearch(!search)}><Search/></button><button className="icon"><UserRound/></button><Link className="carticon" to="/cart"><ShoppingBag/><b>{cart.length}</b></Link></div>
 </header>
 {search&&<div className="searchbar"><Search size={18}/><input autoFocus placeholder="Search the collection..."/><button onClick={()=>setSearch(false)}><X size={18}/></button></div>}
 <Routes>
  <Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/>
  <Route path="/product/:id" element={<Product cart={cart} setCart={setCart}/>}/>
  <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
  <Route path="/about" element={<About/>}/>
 </Routes><Footer/></>
}

function Home(){
 return <main>
  <section className="hero">
   <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=2000&q=92"/>
   <div className="shade"/><div className="heroCopy"><span>THE BRIDAL EDIT · 2026</span><h1>For moments<br/><i>worth keeping.</i></h1>
   <p>Modern heirlooms, shaped by Pakistani craft and a quieter idea of luxury.</p><Link className="lightBtn" to="/shop">Discover the collection <ArrowRight size={15}/></Link></div>
  </section>
  <section className="manifesto"><span>THE MAISON</span><h2>Made slowly.<br/>Remembered always.</h2><p>HAYÉ brings together enduring silhouettes, meticulous handwork and a contemporary sensibility. Each piece is made to feel personal — now, and years from now.</p></section>
  <section className="featured"><div className="sectionTitle"><div><span>CURATED FOR YOU</span><h2>The new edit</h2></div><Link to="/shop">View all <ArrowRight size={15}/></Link></div>
   <div className="productGrid">{PRODUCTS.slice(0,4).map(p=><Card p={p} key={p.id}/>)}</div>
  </section>
  <section className="split">
   <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90"/>
   <div><span>ATELIER NOTES</span><h2>Craft is in<br/><i>the details.</i></h2><p>From hand-cut motifs to finishing touches, every HAYÉ piece passes through skilled hands. Our process celebrates the time, precision and artistry behind couture.</p><Link to="/about">Inside the maison <ArrowRight size={15}/></Link></div>
  </section>
  <section className="newsletter"><span>PRIVATE ACCESS</span><h2>Enter the world of HAYÉ.</h2><p>New collections, atelier stories and private previews.</p><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Your email address"/><button>Join <ArrowRight size={15}/></button></form></section>
 </main>
}
function Card({p}){return <article className="card"><Link to={"/product/"+p.id} className="pic"><img src={p.img}/><span>View piece</span></Link><div className="meta"><div><small>{p.type}</small><h3>{p.name}</h3></div><b>{money(p.price)}</b></div></article>}
function Shop(){
 const q=new URLSearchParams(location.search); const initial=q.get("type")||"All"; const [filter,setFilter]=useState(initial);
 const shown=filter==="All"?PRODUCTS:PRODUCTS.filter(p=>p.type===filter);
 return <main className="shopPage"><div className="pageIntro"><span>THE COLLECTION</span><h1>Designed for<br/><i>celebration.</i></h1><p>Explore bridal, formal and luxury prêt pieces created with a modern point of view.</p></div>
 <div className="shopControls"><p>{shown.length} pieces</p><div>{["All","Bridal","Formal","Luxury Pret"].map(x=><button className={filter===x?"selected":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div></div>
 <div className="productGrid">{shown.map(p=><Card p={p} key={p.id}/>)}</div></main>
}
function Product({cart,setCart}){
 const {id}=useParams(); const p=PRODUCTS.find(x=>x.id===+id)||PRODUCTS[0]; const [size,setSize]=useState("M");
 return <main className="productPage"><div className="productVisual"><img src={p.img}/></div><div className="productDetails"><Link to="/shop" className="back"><ArrowLeft size={15}/> Collection</Link><small>{p.type}</small><h1>{p.name}</h1><div className="price">{money(p.price)}</div><p>{p.desc}</p>
 <div className="option"><label>Size <a href="#">Size guide</a></label><div>{["XS","S","M","L","XL"].map(s=><button onClick={()=>setSize(s)} className={size===s?"chosen":""} key={s}>{s}</button>)}</div></div>
 <button className="add" onClick={()=>setCart([...cart,{...p,size,uid:Date.now()}])}>Add to bag <ShoppingBag size={17}/></button>
 <div className="accord"><p>Made to order · 6–8 weeks</p><p>Worldwide delivery available</p><p>Personal styling available by appointment</p></div></div></main>
}
function Cart({cart,setCart}){
 const total=cart.reduce((s,p)=>s+p.price,0);
 return <main className="cartPage"><div className="pageIntro compact"><span>YOUR SELECTION</span><h1>Shopping bag</h1></div>
 <div className="cartLayout"><div>{cart.length===0?<div className="empty"><p>Your bag is currently empty.</p><Link className="darkBtn" to="/shop">Explore collection</Link></div>:cart.map((p,i)=><div className="cartRow" key={p.uid}><img src={p.img}/><div><small>{p.type}</small><h3>{p.name}</h3><p>Size {p.size}</p><b>{money(p.price)}</b></div><button onClick={()=>setCart(cart.filter((_,j)=>j!==i))}><Trash2 size={17}/></button></div>)}</div>
 <aside><h3>Order summary</h3><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Delivery</span><span>Calculated at checkout</span></div><hr/><div><span>Total</span><b>{money(total)}</b></div><button className="add" disabled={!cart.length}>Proceed to checkout <ArrowRight size={16}/></button><small>Taxes and shipping calculated at checkout.</small></aside></div></main>
}
function About(){return <main className="about"><div className="aboutHero"><span>OUR STORY</span><h1>A modern<br/><i>Pakistani maison.</i></h1><p>HAYÉ is imagined as a study in restraint, craft and occasionwear that feels deeply personal.</p></div><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90"/><div className="aboutText"><h2>Rooted in craft.<br/>Designed for now.</h2><p>Our visual language pairs heritage techniques with clean, considered silhouettes. The result is clothing made for meaningful occasions without losing the woman inside the clothes.</p></div></main>}
function Footer(){return <footer><div><div className="brand footbrand">HAYÉ</div><p>Modern Pakistani couture.</p></div><div className="footlinks"><Link to="/shop">Collection</Link><Link to="/about">Maison</Link><a>Appointments</a><a>Contact</a></div><div className="social"><Instagram size={18}/><span>Islamabad · Pakistan</span></div><small className="copyright">© 2026 HAYÉ. All rights reserved.</small></footer>}
function App(){const[cart,setCart]=useState([]);return <BrowserRouter><Layout cart={cart} setCart={setCart}/></BrowserRouter>}
createRoot(document.getElementById("root")).render(<App/>);
