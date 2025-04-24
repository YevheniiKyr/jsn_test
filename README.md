# How to run app
To follow this instruction you need use npm.
If you use other packet manager, you need find out how to run client-server projects by yourself
1) run server
   - go to the server directory
   - write 'npm install' to install all dependencies
   - write 'npm run dev' to tun server
2) run client
   - go to the client directory
   - write 'npm install' to install all dependencies
   - write 'npm run start' to run react app

# What is app

# Objective
This is web application that allows to
do CRUD operations of the superhero model
The model
A Superhero consists of:
- nickname: Superman
- real_name: Clark Kent
- origin_description: he was born Kal-El on the planet Krypton, before being rocketed to
  Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...
- superpowers: solar energy absorption and healing factor, solar flare and heat vision,
  solar invulnerability, flight...
- catch_phrase: “Look, up in the sky, it's a bird, it's a plane, it's Superman!”
- Images: a set of images of the superhero

# Functional requirements
- Create, edit and remove a superhero
  ○ When creating / editing there is ability to assign and remove images from
  a superhero
- List all the superheros, seeing only one image for each and it’s nickname,
  with pagination, showing 5 items at once
- See the details of one particular superhero with all it’s information and images

# Technology stack
- Server: Express js.
  Api is covered by tests with supertest library.
  Request body is validated with Joi library
- Client: React js
- Image hosting: Cloudinary 


# What did I learn
- exception handling in Node js
- writing tests with supertest library
- work with cloud hosting

# Program demonstration
## Main page

![image](https://github.com/user-attachments/assets/eeded29c-f65b-434f-ac75-2fd29c720fed)

![image](https://github.com/user-attachments/assets/073f08a3-0c12-478a-93b0-0124b6f4198d)

## Create hero modal

![image](https://github.com/YevheniiKyr/jsn_test/assets/84139553/d1006b7c-6d49-42fa-a65a-112a28bb69c9)

## Hero page

![image](https://github.com/user-attachments/assets/4b1d6cee-b54a-4ff2-8e3e-69f3525619f1)

![image](https://github.com/user-attachments/assets/6dec719d-cdc3-4cc8-a742-4b7d3827cb90)

## Edit hero modal

![image](https://github.com/YevheniiKyr/jsn_test/assets/84139553/3d95f2a9-e82b-4524-a791-bb0ee2747ea3)





