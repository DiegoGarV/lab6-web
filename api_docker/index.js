import express from 'express'
import cors from 'cors'
import moment from 'moment'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {getAllBlogs, createBlog, deleteBlog, getBlogById, editBlog} from './db.js'
import { swaggerDocs as V1SwaggerDocs } from './swagger.js'

const app = express()
const port = 3000

// This line is necessary to parse the request body
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

// Implementa cors
console.log('enable Cors')
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/public/upload", express.static(__dirname + "/public/upload"))

app.use((req, res, next) => {
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')

  const logData = {
    time: currentTime,
    endpoint: req.path,
    method: req.method,
    payload: req.body,
  }

  fs.appendFile('log.txt', JSON.stringify(logData) + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })

  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
  V1SwaggerDocs(app, port)
})

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Crear un nuevo blog
 *     description: Endpoint para crear un nuevo blog.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               item_image:
 *                 type: string
 *     responses:
 *       201:
 *         description: El blog fue creado exitosamente.
 *       400:
 *         description: El formato en el cuerpo de la solicitud es incorrecto.
 */
app.post('/blogs', async (req, res) => {
  const [title, content, item_image] = [req.body.title, req.body.content, req.body.item_image]
  if (req.body.item_image1=""){
    var imagen = req.body.item_image
    var nombreArchivo = Math().random().toString() + ".jpg"
    fs.writeFile("public/upload/" + nombreArchivo, imagen, ' base64', (error) => {
      if (error) {
        res.status(500).json('Internal Server Error')
        item_image = "public/upload/" + nombreArchivo
      }
    })
  }
  const blogs = await createBlog(title, content, item_image)
  res.status(blogs.status).json(blogs)
})

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Obtener todos los blogs
 *     description: Devuelve una lista de todos los blogs.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de blogs.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/blogs', async (req, res) => {
  const blogs = await getAllBlogs()
  res.status(blogs.status).json(blogs)
})

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Eliminar un blog por ID
 *     description: Elimina un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Operación exitosa. El blog ha sido eliminado.
 *       404:
 *         description: Blog no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.delete('/blogs/:id', async (req,res) =>{
  const id = req.params.id
  console.log(id)
  const result = await deleteBlog(id)
  if (result.status === 404) {
    res.status(404).json({ error: 'Blog not found' })
  } else {
    res.status(result.status).json({status: result.status})
  }
})

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Obtener un blog por ID
 *     description: Devuelve un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el blog solicitado.
 *       404:
 *         description: Blog no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const blog = await getBlogById(id)
  res.status(blog.status).json(blog)
})

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Actualizar un blog por ID
 *     description: Actualiza un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               item_image:
 *                  type: string
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el blog actualizado.
 *       404:
 *         description: Blog no encontrado.
 *       400:
 *         description: El formato en el cuerpo de la solicitud es incorrecto.
 */
app.put('/blogs/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const [title, content, item_image] = [req.body.title, req.body.content, req.body.item_image]
  console.log(title, content, item_image)
  const blog = await editBlog(id, title, content, item_image)
  res.status(blog.status).json(blog)
})

/**
 * @swagger
 * /blogs:
 *   all:
 *     summary: Endpoint no implementado
 *     description: Devuelve una respuesta indicando que el endpoint no está implementado.
 *     responses:
 *       501:
 *         description: El servidor no implementa la funcionalidad solicitada.
 */
app.all(['/blogs', '/blogs/:id'], (req, res) => {
  res.status(501).json({ status: '501', error: 'Not Implemented' })
})