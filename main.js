Vue.component('product', {
    props: {premium : {
        type: Boolean,
        required: true

        }},
    template:
    `<div class="product-container product-display ">
    <div class="product-image">
      <img v-bind:src="image">
    </div class="product-info">
      <h1>{{title}}</h1> 
      <p v-if="inStock">In stock </p>
      <p v-else>Out of stock</p>
      <p> Shipping: {{shipping}}</p>
      <!-- <p :style ="{text-decoration: line-through}">Out of stock</p> -->
      
      <ul>
        <li 
        class="color-circle" 
        v-for="(variant, index) in variants"
        
        @mouseover="updateProduct(index)" 
        :key="variant.variantId"
        :style = "{backgroundColor:  variant.variantColor}"
        ></li>
      </ul>
      <button 
      class="button"
      v-on:click = "addTocart"
      :disabled ="!inStock"
      >Add to cart</button>
      <button class="button" v-on:click = "deleteFromCart">Delete from cart</button>
    </div>`,
    data(){
        return {
            product:'Boots',
            description: "made of steel",
            selectedVariant:0,
            onSale: true,
            variants: [
                {
                    variantId: "1232",
                    variantColor: "green",
                    variantImage: "./assets/images/socks_green.jpg",
                    inventory: 10,
            },
                {
                    variantId: "1233",
                    variantColor: "blue",
                    variantImage: "./assets/images/socks_blue.jpg",
                    inventory: 20,
            },
            ],
           
        }
    },
    methods: {
        addTocart: function() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
        deleteFromCart: function(){
            this.$emit('delete-from-cart', this.variants[this.selectedVariant].variantId)
        },
        ChangeImage: function(variantImage) {this.image = variantImage},
        updateProduct: function(index){
            this.selectedVariant = index
        }
    },
    computed: {
        title(){
        return this.product + " " + this.description
        },
        image(){
            return this.variants[this.selectedVariant].variantImage

        },
        
        inStock(){
            return this.variants[this.selectedVariant].inventory

        },
        shipping(){
            if(this.premium){
                return "Free"

            }
            return 2.99
        }
    },
        
}
)
Vue.component('product-details', {
    template:
    `<div>
    <h3>Product Details</h3>
    <ol>
    <li v-for="detail in details">{{detail}}</li>
    </ol>
    </div>
    `,
    data(){
        return{
            details: "Women and men, casual or formal, diabetics, exercise, business functions".split(","),
        }

    }
})

Vue.component('product-review',
    {
        template:`
        
    <form  class="review-form" @submit.prevent = "submitForm">
    <label for="name">Name</label>
    <input v-model="name" id="name" type="text">
    <label for="message">Message</label>
    <input  v-model="message" id="message" type="text">
    <label for="rating">Rating</label>
    <input v-model.number="rating" id="rating" type="number">
    <button type="submit" class="button">Submit</button>
  </form>
        `,
        data(){
            return{
                name: null,
                message: null,
                rating: null,
            }
        },
        methods:{
            submitForm(){
                let productReview = {
                name: this.name,
                message: this.message,
                rating: this.rating}
                this.$emit("review-submitted", productReview)
                this.name=null,
                this.message =  null,
                this.rating = null

            }
        }

    })
var app = new Vue({
    el:'#app',
    data: {
        premium: false,
        cart: [],
        reviews:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        removeFromCart(id){
            let index = this.cart.indexOf(id)
           if(index >-1){
               this.cart.splice(index, 1)
           }
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    }
})