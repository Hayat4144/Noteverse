# Noteverse

Noteverse is a versatile and intuitive note-taking application designed to simplify and enhance your digital note-taking experience. With Noteverse, you can effortlessly capture and organize your ideas, thoughts, and important information in a seamless and efficient manner.

Whether you're a student, professional, or creative individual, Noteverse offers a wide range of features to meet your note-taking needs. Create rich and visually appealing notes with the ability to format text, add images, tables, and lists. Stay organized by categorizing your notes into different notebooks and easily navigate through your collection with a user-friendly interface.

Noteverse prioritizes your privacy and data security. Enjoy a clutter-free and distraction-free writing environment, allowing you to focus solely on your ideas and creativity.

## Features

- Unified Task and Note Management => Noteverse offers a unified solution for both tasks and notes, eliminating the need to switch between different applications. With the ability to seamlessly transition between task lists and your Markdown editor, you can efficiently manage your work, studies, and personal projects, all in one place.
- Markdown Based Editor => Create and edit Markdown documents effortlessly within Noteverse. The Markdown editor provides a distraction-free writing environment with a real-time preview, enabling you to see your formatted text as you write. Whether you're drafting essays, writing code documentation, or taking notes, Noteverse ensures your content looks polished and professional.

- Customizable Task Lists => Stay organized with customizable task lists that adapt to your unique workflow. Create projects, assign deadlines, and prioritize tasks with ease. Noteverse's task management features help you streamline your daily activities, ensuring nothing falls through the cracks.

- Intuitive User Interface => Noteverse's user-friendly interface is designed with simplicity in mind. Navigate the app with ease, and discover a host of keyboard shortcuts and customization options that cater to your preferences.

- Robust Search and Tagging => Quickly locate tasks and notes with powerful search functionality and tagging. Never waste time sifting through endless documents—find what you need instantly.

- Dark Mode Support => Enhance your experience with dark mode support, reducing eye strain during late-night work sessions and providing a modern aesthetic touch.

- Privacy and Security => Your data's security is our priority. Noteverse employs robust encryption and secure cloud storage to protect your information, giving you peace of mind while using the application.

## Installation

1. Clone this repository to your local machine using the below command.

```bash
git clone https://github.com/Hayat4144/Noteverse.git
```

2. Navigate to the project directory using the following command.

```bash
cd Noteverse
```

3. Install the backend dependencies using the command

```bash
npm install
```

4. Move to the client folder to install frontend dependencies

```bash
cd client && npm install
```

5. Move back to base folder

```bash
cd ..
```

5. Start the development server , the below command start both server backend and frontend

```bash
npm run dev
```

6.  Open your browser and navigate to http://localhost:3000 to view the app

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file .

Create .env file in the base directory and add these following environment variables to it

`NODE_ENV` environment for your node application

`JWT_SECRET` secret key for jwt

`CLOUDINARY_API_SECRET` cloudinary api secret key

`CLOUDINARY_API_KEY` cloudinary api key

`CLOUD_NAME` cloudinary cloud name

`DATABASE_URL` postgress sql database url

`FRONTEND_URL` url of your frontend this is only for production mode

Now move to client folder and create .env file there and add these following environment variables to it

`NEXTAUTH_URL` current url of your frontend application

`NEXTAUTH_SECRET` secret a key for the next-auth

`NEXT_PUBLIC_BACKEND_URL` url of backend

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Resources

Resources i used to build this application are

- [Slate js documentation](https://docs.slatejs.org/)
- [Slate js examples](https://www.slatejs.org/examples/richtext)
- [Slate js based editor](https://github.com/accordproject/web-components/)
- [Small Rich text Editor example](https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [NextAuth js](https://next-auth.js.org/)
- [Rest API query parameter design pattern for complex search filters](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/)
- [Zod for validation of forms](https://zod.dev/)

## Tech Stack

**Client:** React, Redux, TailwindCSS, Shadcn ui, Radix ui,Typescript ,Next-auth,Next js, Slate js

**Server:** Node, Express, Typescript,Prisma,JWT,Postgress

## Contributing

Contributions are always welcome! If you find a bug or want to suggest a new feature, please open an issue or submit a pull request.

## License

This app is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. Feel free to use it for your own projects.
