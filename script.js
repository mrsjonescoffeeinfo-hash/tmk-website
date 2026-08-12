const cart = [];
const panel = document.querySelector('#cartPanel');
const overlay = document.querySelector('#overlay');
const cartCount = document.querySelector('#cartCount');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#woltDialog');

function openCart(){ panel.classList.add('open'); overlay.classList.add('open'); panel.setAttribute('aria-hidden','false'); }
function closeCart(){ panel.classList.remove('open'); overlay.classList.remove('open'); panel.setAttribute('aria-hidden','true'); }
function renderCart(){
  const total = cart.reduce((sum,item)=>sum + item.price,0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = `€${total.toFixed(2)}`;
  cartItems.innerHTML = cart.length ? cart.map((item,index)=>`<div class="cart-item"><div><strong>${item.name}</strong><small>€${item.price.toFixed(2)}</small></div><button class="remove" data-index="${index}">Remove</button></div>`).join('') : '<p class="empty-cart">Your favourites are waiting.</p>';
}
function showToast(message){ toast.textContent=message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2200); }
document.querySelectorAll('.add-button').forEach(button=>button.addEventListener('click',()=>{cart.push({name:button.dataset.name,price:Number(button.dataset.price)});renderCart();showToast(`${button.dataset.name} added to your order`);}));
cartItems.addEventListener('click',event=>{if(event.target.matches('.remove')){cart.splice(Number(event.target.dataset.index),1);renderCart();}});
document.querySelector('#cartTrigger').addEventListener('click',openCart); document.querySelector('#orderNow').addEventListener('click',openCart); document.querySelector('#closeCart').addEventListener('click',closeCart); overlay.addEventListener('click',closeCart);
document.querySelectorAll('#woltButton,#cartWolt').forEach(el=>el.addEventListener('click',()=>{closeCart();dialog.showModal();})); document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());
document.querySelector('#checkout').addEventListener('click',()=>{if(!cart.length)return showToast('Add something delicious first.');showToast('Checkout will be connected to your payment provider.');});
document.querySelector('#newsletterForm').addEventListener('submit',event=>{event.preventDefault();event.target.reset();showToast('You’re on the list — welcome to TMK!');});
