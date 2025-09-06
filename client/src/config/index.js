export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "banarasi", label: "Banarasi Saree" },
      { id: "kanjeevaram", label: "Kanjeevaram Saree" },
      { id: "bandhani", label: "Bandhani Saree" },
      { id: "chanderi", label: "Chanderi Saree" },
      { id: "paithani", label: "Paithani Saree" },
      { id: "baluchari", label: "Baluchari Saree" },
      { id: "bhagalpuri", label: "Bhagalpuri Silk Saree" },
      { id: "mysore_silk", label: "Mysore Silk Saree" },
      { id: "muga_silk", label: "Muga Silk Saree" },
      { id: "pashmina", label: "Pashmina Saree" },
      { id: "uppada", label: "Uppada Saree" },
      { id: "gadwal", label: "Gadwal Saree" },
      { id: "patola", label: "Patola Saree" },
      { id: "taant", label: "Tant Saree" },
      { id: "sambalpuri", label: "Sambalpuri Saree" },
      { id: "kota_doria", label: "Kota Doria Saree" },
      { id: "jamdani", label: "Jamdani Saree" },
      { id: "ilkal", label: "Ilkal Saree" },
      { id: "georgette", label: "Georgette Saree" },
      { id: "chiffon", label: "Chiffon Saree" },
      { id: "organza", label: "Organza Saree" },
      { id: "tussar", label: "Tussar Silk Saree" },
      { id: "art_silk", label: "Art Silk Saree" },
      { id: "linen", label: "Linen Saree" },
      { id: "net", label: "Net Saree" }
    ],
    
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "sabyasachi", label: "Sabyasachi" },
      { id: "manishmalhotra", label: "Manish Malhotra" },
      { id: "ritukumar", label: "Ritu Kumar" },
      { id: "fabindia", label: "Fabindia" },
      { id: "nalli", label: "Nalli Silks" },
      { id: "meenabazaar", label: "Meena Bazaar" },
      { id: "bharatsthali", label: "BharatSthali" },
      { id: "jaypore", label: "Jaypore" },
      { id: "libas", label: "Libas" },
      { id: "soch", label: "Soch" },
      { id: "rmkv", label: "RmKV" },
      { id: "karagiri", label: "Karagiri" },
      { id: "kalamandir", label: "Kalamandir" },
      { id: "triveni", label: "Triveni Sarees" },
      { id: "kalanjali", label: "Kalanjali" },
      { id: "varamahalakshmi", label: "Varamahalakshmi Silks" },
      { id: "yuvti", label: "Yuvti" },
      { id: "taruntahiliani", label: "Tarun Tahiliani" },
      { id: "pratibhasarees", label: "Pratibha Sarees" },
      { id: "mavuri", label: "Mavuri Artisan Weaves" },
      { id: "zari", label: "Zari" }
    ],
    
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "products", label: "Products", path: "/shop/listing" },
  { id: "banarasi", label: "Banarasi Saree", path: "/shop/listing" },
  { id: "kanjeevaram", label: "Kanjeevaram Saree", path: "/shop/listing" },
  { id: "bandhani", label: "Bandhani Saree", path: "/shop/listing" },
  { id: "chanderi", label: "Chanderi Saree", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" }
];


export const categoryOptionsMap = {
  banarasi: "Banarasi Saree",
  kanjeevaram: "Kanjeevaram Saree",
  bandhani: "Bandhani Saree",
  chanderi: "Chanderi Saree",
  paithani: "Paithani Saree"
 
};


export const brandOptionsMap = {
  sabyasachi: "Sabyasachi",
  manishmalhotra: "Manish Malhotra",
  ritukumar: "Ritu Kumar",
  fabindia: "Fabindia",
  nalli: "Nalli Silks"
 
};


export const filterOptions = {
  category: [
    { id: "banarasi", label: "Banarasi Saree" },
    { id: "kanjeevaram", label: "Kanjeevaram Saree" },
    { id: "bandhani", label: "Bandhani Saree" },
    { id: "chanderi", label: "Chanderi Saree" },
    { id: "paithani", label: "Paithani Saree" },
    { id: "baluchari", label: "Baluchari Saree" }
  ],
  brand: [
    { id: "sabyasachi", label: "Sabyasachi" },
    { id: "manishmalhotra", label: "Manish Malhotra" },
    { id: "ritukumar", label: "Ritu Kumar" },
    { id: "fabindia", label: "Fabindia" },
    { id: "nalli", label: "Nalli Silks" }
   
  ]
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
