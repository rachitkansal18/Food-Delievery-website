const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const {LogInCollection, OrderCollection} = require("./mongo")
const port = process.env.PORT || 8080
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

let thalis = [
    {
        image: "images/thali.jpg",
        name: "Thaali",
        price: 309.2
    },
    {
        image: "images/thali1.jpg",
        name: "Deluxe Thaali",
        price: 150
    },
    {
        image: "images/thali2.jpg",
        name: "Spl. Thaali",
        price: 245.9
    }
]

let pastas = [
    {
        image: "images/pasta3.webp",
        name: "Pasta",
        price: 56.2
    },
    {
        image: "images/pasta2.webp",
        name: "Cheese Pasta",
        price: 345
    },
    {
        image: "images/pasta1.webp",
        name: "White Pasta",
        price: 156.9
    }

]

let burgers = [
    {
        image: "images/burger_0.avif",
        name: "Zinger Burger",
        price: 200.2
    },
    {
        image: "images/burger1.avif",
        name: "Cheese Burger",
        price: 150
    },
    {
        image: "images/burger2.avif",
        name: "Whopper",
        price: 100.9
    }
]

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/', (req, res) => {
    res.render('index', {
        naming: "Sign up",
        burgers: burgers,
        pastas: pastas,
        thalis: thalis
    })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})




app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            address: req.body.address,
            password: req.body.password
        }

        const checking = await LogInCollection.findOne({ name: req.body.name })

        if (checking) {
            res.send("User details already exist")
        } else {
            await LogInCollection.create(data)
            res.status(201).render("index", {
                naming: req.body.name,
                burgers: burgers,
                pastas: pastas,
                thalis: thalis
            })
        }
    } 
    catch (e){
        console.log(e);
        res.send("wrong details ")
    }
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("index", { 
                naming: `${req.body.name}`,
                burgers: burgers,
                pastas: pastas,
                thalis: thalis
            })
        }

        else {
            res.send("wrong details")
        }


    } 
    
    catch (e) {
        console.log(e);
        res.send("wrong details")
        

    }


})

app.post('/cart', async (req, res) => {
    try {
        console.log(req.body)
        const data = {
            username: req.body.username,
            items: req.body.items
        }
        console.log(await OrderCollection.create(data))
        res.status(201).send("done")
    } catch (e) {
        res.send("wrong details")
    }
})

app.listen(port, () => {
    console.log('port connected');
})