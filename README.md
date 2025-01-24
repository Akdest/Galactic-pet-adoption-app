
  Galactic Pet Adoption App

   Introduction

Welcome to the   Galactic Pet Adoption App  , a modern web application that allows users to explore and adopt alien pets from different planets. Built with   Next.js  ,   TailwindCSS  , and enhanced with   Voice-Based Search   capabilities, this app offers a seamless, interactive experience with modern UI/UX elements like carousels, animations, icons, and dynamic routes.

  Live Demo:
     
    https://pet-app-azure.vercel.app
Check out the live version of the app at https://pet-app-azure.vercel.app .

---

  Features

  1.   Voice-Based Search 
-   Description  : The app allows users to search for alien pets using voice commands. Leveraging the   Speech Recognition API  , users can simply speak to the app to search for pets. This feature enhances accessibility and provides a futuristic, interactive experience.
-   Technologies Used  : `SpeechRecognition`, `Web APIs`
-   How it Works  :
  - Users click the microphone icon located inside the search bar.
  - The Speech Recognition API captures the speech and converts it to text, which is then used to filter pets in real-time.

2.   Pet Adoption List  
-   Description  : This section displays all the alien pets available for adoption. Each pet has details like name, species, price, planet of origin, and features. It also includes a "View Pet" button that links to each pet’s detailed page.
-   Technologies Used  : `Next.js`, `TailwindCSS`, `React`
-   How it Works  :
  - The pets are fetched dynamically from a local JSON file or database.
  - Pets are filtered using the search query and other filters such as price range and planet of origin.

3.   Dynamic Routes  
-   Description  : The app uses dynamic routes for each pet's detail page. When a user clicks the "View Pet" button, they are redirected to a unique page with more details about that pet.
-   Technologies Used  : `Next.js Dynamic Routes`
-   How it Works  :
  - The pet’s name is used to create a dynamic URL (e.g., `/prod/{pet-name}`).
  - Based on the pet’s ID or name, the app fetches and displays more detailed information on the pet’s page.

4.   Local Storage for Cart  
-   Description  : The app allows users to add pets to their adoption cart. The cart is stored locally in the browser’s storage (using `localStorage`), so the cart persists even when the page is refreshed.
-   Technologies Used  : `React`, `localStorage`
-   How it Works  :
  - When a user adds a pet to the cart, the pet’s ID is stored in `localStorage`.
  - Upon loading the app, the cart is retrieved from `localStorage` and updated accordingly.

5.   Carousels and Animations  
-   Description  : The app incorporates beautiful carousels to display pets' images and other UI elements. Additionally, smooth animations are applied to enhance the user experience.
-   Technologies Used  : `Framer Motion`, `TailwindCSS`
-   How it Works  :
  - A carousel component is used to cycle through pet images with smooth transitions.
  - Animations such as hover effects, scaling, and opacity changes are used throughout the app to make it interactive and engaging.

6.   Icons and Effects  
-   Description  : The app uses icons from `react-icons` for key elements such as the cart, search, and microphone buttons. These icons improve the overall design, making it visually appealing.
-   Technologies Used  : `react-icons`, `TailwindCSS`
-   How it Works  :
  - Icons are styled and placed in key locations to enhance the UI.
  - Icons respond to user interaction, such as button clicks and hover effects.

7.   Blog Section  
-   Description  : The app features a dynamic blog section where users can read articles related to alien pet care, new releases, upcoming features, and more. The blogs are also built with dynamic routing to create individual blog pages.
-   Technologies Used  : `Next.js`, `TailwindCSS`
-   How it Works  :
  - Each blog post is fetched from a database or CMS and displayed as a card.
  - When clicked, the user is redirected to the detailed blog post page.

8.   Responsive Design  
-   Description  : The app is fully responsive, meaning it works seamlessly across all screen sizes (desktops, tablets, and mobile devices).
-   Technologies Used  : `TailwindCSS` (responsive utilities)
-   How it Works  :
  - Tailwind’s responsive utilities are used to adjust the layout based on the screen size.
  - The app adapts its components and adjusts the spacing, sizing, and layout to ensure an optimal experience on all devices.

---

   Technologies Used

-   Next.js  : For building the server-rendered React application with great SEO and performance.
-   TailwindCSS  : For fast and efficient UI development with utility-first CSS.
-   React  : For building the UI components and handling the interactivity.
-   Framer Motion  : For creating smooth animations and transitions.
-   react-icons  : For incorporating scalable and customizable icons.
-   Voice Recognition  : Utilizing the Web Speech API (`SpeechRecognition`) to implement voice-based search functionality.
-   localStorage  : For persisting cart data across sessions.
-   Dynamic Routes  : For building individual pet detail pages and blog pages.
-   Toast Notifications  : For showing real-time notifications (e.g., pet added to cart, errors).


---

   Installation & Setup

To get started with the Galactic Pet Adoption App locally:

    Prerequisites

- Node.js (preferably the latest LTS version)
- npm or yarn package manager

    Steps

1.   Clone the Repository  :

   ```bash
   git clone https://github.com/Akdest/pet-app.git
   ```

2.   Navigate to the project directory  :

   ```bash
   cd galactic-pet-adoption
   ```

3.   Install dependencies  :

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

4.   Run the development server  :

   ```bash
   npm run dev
   ```

   Or with yarn:

   ```bash
   yarn dev
   ```

   Visit [http://localhost:3100](http://localhost:3100) in your browser to view the app.

---

   Contributing

We welcome contributions to improve the Galactic Pet Adoption App!

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Create a new pull request

---

   License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

   Acknowledgements

-   Next.js  : For building fast and scalable web applications.
-   TailwindCSS  : For simplifying UI development with utility-first CSS.
-   Framer Motion  : For adding rich animations and transitions.
-   Speech Recognition API  : For voice-based search functionality.

---

With this app, we aim to provide a futuristic and enjoyable experience for users to adopt their very own alien pet! Thank you for checking out our project. Feel free to contribute, explore the code, or give feedback!

