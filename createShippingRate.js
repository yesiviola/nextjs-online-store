const stripe = require('stripe')('sk_test_51OU4NrC1AJ9nf3QWrwCJ5mrtN1kpCuW9PqXpktz2SNIXMFj99djBwXv2P48EsUlWpqzt6PKw3PtUAtAZ1kZSOdwl00dmudISeI');


(async function() {
const shippingProduct = await stripe.products.create({
  name: 'Standard Shipping',
});
   const shippingPrice = await stripe.prices.create({
     product: shippingProduct.id,
        unit_amount: 1000,
        currency: 'usd',
   });
    
console.log(shippingPrice.id);
})
();