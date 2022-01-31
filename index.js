const express = require('express');
const res = require('express/lib/response');
const app = express();
const pool = require("./db")

app.use(express.json()) // -> req.body

//ROUTES//

//get all todos
app.get("/todos", async(req,res) => {
    try {
        const allTodo  = await pool.query("SELECT * FROM todo")
        res.json(allTodo.rows)

    } catch (err) {
        console.error(err.message)
    }
})
//get a todo
app.get("/todos/:id", async(req,res) => {
    const { id } = req.params
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a todo
app.post("/todos",async(req,res) => {
    try {
        //await
        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
        );

        res.json(newTodo.rows[0])

    } catch(err) {
        console.error(err.message);

    }
});

//update a todo
app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const updateTodo = await pool.query("UPDATE todo Set description = $1 WHERE todo_id = $2",[description,id])
        res.json("Todo was update")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])

        res.json("Todo was successfully delete!")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(3000, () => {
    console.log("server is listenong on port 3000");
});