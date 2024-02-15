# KatChat 📕

KatChat is a web application built with Astro and Svelte. The application allows users to upload PDF files, which are processed and converted to text using Cloudinary. Then, users can make queries about the content of the PDF and receive responses generated by OpenAI.
<p align="center">
  <img src="./src/assets/logo.png" alt="KatChat logo">
</p>

## Requirements 🚝

To run this application, you will need to have the latest version of Node.js and npm installed on your machine.

### Cloudinary account 

You need to create an accout on cloudinary with OCR Text Detection and Extraction Add-on enabled. Make sure to enable it on your account settings.

¡Without this addon katchat wont work!

## Installation 🚀

To install the application's dependencies, run the following command at the root of the project:

```bash
npm install
```

## Configuration 🛠

Create a .env file at the root of the project and add the following environment variables:
```
OPENAI_KEY=<your_openai_key>
MONGO_CONNECT=<your_mongodb_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_SECRET=<your_cloudinary_secret>
```
These environment variables are necessary for the connection to MongoDB, the uploading and processing of PDF files with Cloudinary, and the generation of responses with OpenAI.

You can provide the environment variables using either a `.env` file at the root of the project or using Doppler. If both are present, the variables from Doppler will take precedence.

You can also change the behaviour of Kat changing the lines on the Ask file inside the api folder on line 38 replacing the prompt.

## Running 🔥

To run the application in development mode, use the following command:
```bash
npm run dev
```
#### Please replace `<your_openai_key>`, `<your_mongodb_connection_string>`, `<your_cloudinary_cloud_name>`, `<your_cloudinary_api_key>`, and `<your_cloudinary_secret>` with your own values.

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── assets/
│   └── logo.png
├── src/
│   ├── components/
│   │   └── App.svelte
│   │   └── Footer.svelte
│   │   └── StepChat.svelte
│   │   └── StepLoading.svelte
│   │   └── StepUpload.svelte
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/api
|       |     └──ask.ts
|       |     └──db.ts
|       |     └──upload.ts
│       └── index.astro
└── package.json
└── svelte.config.js
└── tsconfig.json
└── tailwind.config.mjs
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀Preview
<p align="center">
  <img src="./src/assets/screenshots/Animation.gif" alt="Start animation">
</p>