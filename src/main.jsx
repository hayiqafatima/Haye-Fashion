import React, { useEffect, useState } from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter,Routes,Route,Link,useNavigate,useParams} from "react-router-dom";
import {Menu,X,Search,UserRound,ShoppingBag,ArrowRight,ArrowLeft,Minus,Plus,Trash2,Instagram} from "lucide-react";
import "./styles.css";
import { supabase } from "./lib/supabase";



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
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/login" element={<Login />} />
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
function Card({ p }) {
  return (
    <article className="card">
      <Link to={"/product/" + p.id} className="pic">
        <img src={p.image_url} alt={p.name} />
        <span>View piece</span>
      </Link>

      <div className="meta">
        <div>
          <small>{p.type}</small>
          <h3>{p.name}</h3>
        </div>

        <b>{money(p.price)}</b>
      </div>
    </article>
  );
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Login error:", error);
      setMessage(error.message);
      return;
    }

    console.log("Login successful:", data);

    setMessage("Login successful!");

    // Take logged-in user to admin page
    navigate("/admin/products");
  }

  
  return (
    <main style={{ padding: "100px", maxWidth: "500px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}


function AdminProducts() {

  // ==========================================
  // 1. AUTHENTICATION
  // ==========================================

  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);


  useEffect(() => {
  async function checkUser() {

    // STEP 1: Get the currently logged-in user
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      navigate("/login", { replace: true });
      return;
    }

    // STEP 2: Find this user's role in the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

    // STEP 3: Check whether the user is an admin
    if (profileError || profile?.role !== "admin") {
      console.error("Admin access denied:", profileError);
      navigate("/", { replace: true });
      return;
    }

    // STEP 4: Allow access
    console.log("Admin verified:", userData.user.email);
    setCheckingAuth(false);
  }

  checkUser();
}, [navigate]);

  // ==========================================
  // 2. PRODUCT FORM STATE
  // ==========================================

  const [form, setForm] = useState({
    name: "",
    type: "Bridal",
    price: "",
    description: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");

  const [products, setProducts] = useState([]);

 // Image upload states
const [imageFile, setImageFile] = useState(null);
const [uploading, setUploading] = useState(false);
  // ==========================================
  // 3. HANDLE FORM INPUTS
  // ==========================================

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  // ==========================================
  // 4. READ PRODUCTS
  // ==========================================

  async function getProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProducts(data);
  }


  useEffect(() => {
    getProducts();
  }, []);


  // ==========================================
  // 5. DELETE PRODUCT
  // ==========================================

  async function deleteProduct(id) {

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    console.log("Product deleted:", id);

    await getProducts();
  }


  // ==========================================
  // 6. CREATE PRODUCT
  // ==========================================

 async function handleSubmit(e) {
  e.preventDefault();

  if (!imageFile) {
    setMessage("Please select a product image.");
    return;
  }

  setUploading(true);
  setMessage("");

  try {
    // First upload the image
    const imageUrl = await uploadImage(imageFile);

    // Then save the product in the database
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: form.name,
          type: form.type,
          price: Number(form.price),
          description: form.description,
          image_url: imageUrl,
        },
      ]);

    if (error) {
      throw error;
    }

    setMessage("Product and image uploaded successfully!");

    await getProducts();

    setForm({
      name: "",
      type: "Bridal",
      price: "",
      description: "",
      image_url: "",
    });

    setImageFile(null);
    e.target.reset();

  } catch (error) {
    console.error("Upload error:", error);
    setMessage(error.message || "Something went wrong.");
  } finally {
    setUploading(false);
  }
}


  // ==========================================
  // 7. WAIT WHILE AUTH IS BEING CHECKED
  // ==========================================

  if (checkingAuth) {
    return (
      <p style={{ padding: "100px" }}>
        Checking authentication...
      </p>
    );
  }


  // ==========================================
  // 8. ADMIN PAGE
  // ==========================================
async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return;
  }

  navigate("/login");
}

async function uploadImage(file) {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

  return (
    <main style={{ padding: "80px", maxWidth: "800px" }}>

      <h1>Add Product</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option>Bridal</option>
          <option>Formal</option>
          <option>Luxury Pret</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Product"}
        </button>

      </form>

      {message && <p>{message}</p>}


      {/* PRODUCTS */}

      <div style={{ marginTop: "50px" }}>

        <h2>Products</h2>

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0",
              borderBottom: "1px solid #ddd",
            }}
          >

            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "60px",
                height: "80px",
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>

              <strong>
                {product.name}
              </strong>

              <p>
                {money(product.price)}
              </p>

            </div>

            <button
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}


function Shop() {
  const q = new URLSearchParams(location.search);
  const initial = q.get("type") || "All";

  const [filter, setFilter] = useState(initial);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setProducts(data);
      }

      setLoading(false);
    }

    getProducts();
  }, []);

  const shown =
    filter === "All"
      ? products
      : products.filter((p) => p.type === filter);

  if (loading) {
    return <p style={{ padding: "100px" }}>Loading collection...</p>;
  }

  if (error) {
    return <p style={{ padding: "100px" }}>Error: {error}</p>;
  }

  return (
    <main className="shopPage">
      <div className="pageIntro">
        <span>THE COLLECTION</span>

        <h1>
          Designed for
          <br />
          <i>celebration.</i>
        </h1>

        <p>
          Explore bridal, formal and luxury prêt pieces created with a
          modern point of view.
        </p>
      </div>

      <div className="shopControls">
        <p>{shown.length} pieces</p>

        <div>
          {["All", "Bridal", "Formal", "Luxury Pret"].map((x) => (
            <button
              className={filter === x ? "selected" : ""}
              onClick={() => setFilter(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="productGrid">
        {shown.map((product) => (
          <Card p={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}
function Product({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Product error:", error);
        setError(error.message);
      } else {
        setProduct(data);
      }

      setLoading(false);
    }

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <p style={{ padding: "100px" }}>
        Loading product...
      </p>
    );
  }

  if (error || !product) {
    return (
      <p style={{ padding: "100px" }}>
        Product not found.
      </p>
    );
  }

  return (
    <main className="productPage">

      <div className="productVisual">
        <img
          src={product.image_url}
          alt={product.name}
        />
      </div>

      <div className="productDetails">

        <Link to="/shop" className="back">
          <ArrowLeft size={15} />
          Collection
        </Link>

        <small>{product.type}</small>

        <h1>{product.name}</h1>

        <div className="price">
          {money(product.price)}
        </div>

        <p>{product.description}</p>

        <div className="option">

          <label>
            Size
            <a href="#">Size guide</a>
          </label>

          <div>
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={size === s ? "chosen" : ""}
              >
                {s}
              </button>
            ))}
          </div>

        </div>

        <button
          className="add"
          onClick={() =>
            setCart([
              ...cart,
              {
                ...product,
                size,
                uid: Date.now()
              }
            ])
          }
        >
          Add to bag
          <ShoppingBag size={17} />
        </button>

        <div className="accord">
          <p>Made to order · 6–8 weeks</p>
          <p>Worldwide delivery available</p>
          <p>Personal styling available by appointment</p>
        </div>

      </div>

    </main>
  );
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
