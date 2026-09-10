// Part2: Simple CRUD Operations Using Express.js:
// For all the following tasks, you must use the fs module to read and write data from a JSON file (e.g., users.json). Do not store or manage data using arrays. (1 Grade)
const express=require('express');
const app=express();
const { randomUUID }=require('node:crypto');
const fs=require('fs/promises');
app.use(express.json())
async function getUsers(){
    const data=await fs.readFile('users.json','utf-8');
    const users= JSON.parse(data);
    return users;
}
async function saveUsers(users){
    return await fs.writeFile('users.json', JSON.stringify(users));
}
app.get('/user',async (req,res)=>{
    const users=await getUsers();
        res.status(200).send(users);        
    })
app.get('/user/getByName',async (req,res)=>{
    const name=req.query.name;
    const users=await getUsers();
    const user=users.find((user)=>user.name.toLowerCase()===name.toLowerCase());
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    return res.status(200).json(user)

})
app.get('/user/filter',async (req,res)=>{
    const minAge=req.query.minage;
    const users=await getUsers();
    const filteredUsers=users.filter((user)=>user.age>=minAge);
    if(filteredUsers.length===0){
        return res.status(404).json({message:'User not found'});
    }
    return res.status(200).json(filteredUsers)

})
app.post('/user',async(req,res)=>{
    const {name,email,age}=req.body;
    if(!name ||!email){
        return res.status(400).json({message:'email and name are required'})
    }
    let users=await getUsers();
    const newUser={id:randomUUID(),name,email,age}
    const emailExist=users.find((user)=>user.email===email);
    if(emailExist){
        return res.status(409).json({message:'Email already exists'})
    }

    users.push(newUser);
    await saveUsers(users);
    return res.status(201).json({message:'User created successfully',newUser})
})
app.patch('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const users=await getUsers();
    const{name,email,age}=req.body;
    const user=users.find((user)=>user.id===id);
    const emailExist=users.some((user)=>user.email===email&&user.id!==id);

    if(!user){
        return res.status(404).json({message:'User not found'})
    }
    if(emailExist){
        return res.status(409).json({message:'Email already exists'})
    }
    if(name) user.name=name;
    if(email) user.email=email;
    if(age) user.age=age;
    await saveUsers(users)
    return res.status(200).json({message:'User updated successfully'});
})
app.delete('/user/:id',async (req,res)=>{
    const id=req.params.id;
    const users=await getUsers();
    const findUser=users.findIndex((user)=>user.id===id);
    if(findUser===-1){
        return res.status(404).json({message:'User not found'})
    }
    users.splice(findUser,1)
    await saveUsers(users);
    res.status(200).json({message:'User deleted successfully'})
})
app.get('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const users=await getUsers();
    const user=users.find((user)=>user.id===id);
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    res.status(200).json(user);
});

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
