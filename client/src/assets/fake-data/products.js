// all images imported from images directory



const products = [];

async function fetchData() {
  const response = await fetch(`http://localhost:5000/product/`);
  const data = await response.json();
  return data;
}
fetchData().then(data => {

  const length = data.length;
  for(let i=1; i<length; i++){
    products[i].id = "i";
    products[i].title = data[i].title;
    products[i].price = data[i].price;
    products[i].image01 = `http://localhost:5000/images/${data[i].img}`;
    products[i].image02 = `http://localhost:5000/images/${data[i].img}`;
    products[i].image03 = `http://localhost:5000/images/${data[i].img}`;
    products[i].category = data[i].category;
    products[i].desc = data[i].description;
  }

  return products;
})
export default products;
