import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'


const app = new Hono()

app.use("/*",cors())

app.get('/projects', (c) => {
  return c.json({
    data:[
      {id:0,tittle:"cheese",img:"./src/static/cheese.jpg",text:"the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax this is refrence to a meme i do belive "
        ,link:"https://no.wikipedia.org/wiki/Cheese", date:"1990-06-01"},
  
      {id:1,tittle:"milk",img:"./src/static/milk.jpg",text:"milk is a thing you can drink or sell? or make into other stuff like cheese and then you use that cheese to make pizza and thats a other projcet here!"
        ,link:"https://no.wikipedia.org/wiki/Milk", date:"2023-07-21"},
  
      {id:2,tittle:"onions",img:"./src/static/onions.jpg",text:"its a food item that while preparing can cause you to cry very sad, its becuase the onion relases a gas that iratetes the eye as a self defensemechanisme"
        ,link:"https://no.wikipedia.org/wiki/R%C3%B8dl%C3%B8k", date:"2023-08-02"},
  
      {id:3,tittle:"pizza",img:"./src/static/pizza.jpg",text:"its food item that should have pinaple on it, its pretty good, for some reason ppl can get very heated over this topic and thats odd since its such a simple thing if we are gonna complain on what to have on pizza there is pizza with bannan on it and it seems cursed but you make your pizza how you want to"
        ,link:"https://no.wikipedia.org/wiki/Pizza", date:"2023-09-19"},
  
      {id:4,tittle:"ikea",img:"./src/static/ikea.png",text:"ikea is a store that sell stuff now for eksemple text i will add a bunch of copies of that text:ikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuff"
        ,link:"https://no.wikipedia.org/wiki/IKEA", date:"2024-01-30"},
        
    ]
  })



});

const port = 3000
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
})
