const express = require("express");
const client = require("./client");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
    client.getUsers(null, (error, users) => {
        if (!error) {
            return res.status(200).json({
                success: true,
                message: "Users Fetched Successfully.",
                data: users,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while fetching users.",
            });
        }
    });
});

app.post("/users", (req, res) => {
    client.addUser(
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        },
        (error, user) => {
            if (!error) {
                return res.status(201).json({
                    success: true,
                    message: "User Created Successfully.",
                    data: user,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong while fetching users.",
                });
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server Started at Port:- ${PORT}`);
});
