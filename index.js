import express from "express";
import bodyParser from "body-parser";

const app = express();

//to parse the request body
app.use(express.json());
app.use(bodyParser.json());

//Books Api Routes: GET, POST, PUT, DELETE
let books = [
    {
        id: 1,
        name: "Harry Potter",
        author: "J.K. Rowling"
    },
    {
        id: 2,
        name: "The Alchemist",
        author:"Paulo Coelho"
    },
    {
        id: 3,
        name: "The Da Vinci Code",
        author : "Dan Brown"
    }

];


app.get("/", (req, res) => {
   
    res.status(200).send(books);
    //  res.status(200).json({ message: "Hello change this to list of books!" });
})
app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Pong" });

})


// Add other requests GET, POST, PUT, DELETE
app.post("/addBook" , (req , res)=>{
    console.log(req.query.id);
    if(req.body){
        const book_to_add = req.body;
        books.push(book_to_add);
        res.json({
            message: "Book added successfully"
        })
    }else{
        res.json({message: "Please send a book"})
    }
})

app.put("/updateBook",(req ,res)=>{
    try{
        console.log("update book here")
        const id = req.query.id;
        const newBook = req.body;
        if(newBook){
            const index = books.findIndex( book => book.id == id)
            if(index!=-1){
                let new_books_array = [];
                for(var i = 0 ;i<books.length ;i++)
                {
                    if(i == index)
                    {
                        new_books_array.push(newBook);
                    }else{
                        new_books_array.push(books[i]);
                    }
                }
                books = new_books_array;
                res.json({message : "Book updated successfully"})
            }else{
                res.json({message : "id for book incorrect"})
            }
        }else{
            res.json({message : "please send a new Book"})
        }
    }catch(error)
    {
        res.status(404).json({message: "error"});
    }

})

app.delete("/deleteBook" , (req ,res)=>{
    if(req.query.id){
        const id = req.query.id;
        let new_books_array = [];
        for(var i = 0;i<books.length ;i++){
            if(books[i].id!=id){
                new_books_array.push(books[i]);
            }
        }
        books = new_books_array;
        res.json({message : "Book deleted successfully"})
    }else{
        res.json({message : "please send the id "})
    }
})

app.listen(3000, () => {
    console.log(`App is live on: http://localhost:3000`);
});