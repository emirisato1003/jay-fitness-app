# Jay React Course Final Project
## #FITLIFE (Fitness Application)

### Overview
This fitness app helps users discover exercise tutorials and build their workout routines. Users can search for exercises in three ways: by exercise name, equipment type, or target muscle group. When users find exercises they like, they can save them to create a personalized workout list that includes step-by-step tutorials and instructional YouTube videos.

The app features a mobile-friendly design, making it perfect for use at the gym or any workout location. Whether you're planning your routine at home or need a quick tutorial reminder during your workout, you can access your saved exercises and instructions anytime, anywhere. 


### Features⚙️
- Search exercises by name, equipment, or target body area
- Save favorite exercises to build custom workout lists
- Access tutorial videos and instructions
- Mobile-responsive design for gym use
- Available whenever and wherever you work out

### dependencies
- react-router: it manages the URL and renders the appropriate components without reloading the page. **Does not directly manipulate the DOM**
- react-icon (npm library) : it provides icon sets as React Component. **Does not directly manipulate the DOM**
- miragejs (Used for API mocking) : used for mocking APIs during development. it provides fake server responses. **Does not directly manipulate the DOM**
- [react-horizontal-scrolling-menu](https://www.npmjs.com/package/react-horizontal-scrolling-menu) (npm library): provides a scrollable horizontal list component. it's **Might manipulate the DOM internally** 
- nanoid (npm library): generate unique id, one of API data has not unique id so I used this to generate each data has unique id. **Does not interact with the DOM**

### How to install
Make sure you have the ```Node.js``` and ```npm or yarn```

1. **Clone the repo**
```
git clone https://github.com/emirisato1003/jay-fitness-app.git
```

2. **Install dependencies**
```
npm install
 or
yarn install
```

3. **set up environment variables**
- create a ```.env.local``` file in the root directory and add your API configuration:
```
VITE_EXERCISES_API_KEY=your_rapid_api_key_here
VITE_YOUTUBE_API_KEY=your_rapid_api_key_here
```
API data :
- RapidAPI - https://rapidapi.com/hub
- RapidAPI ExerciseDB - https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
- RapidAPI YouTube Search - https://rapidapi.com/h0p3rwe/api/youtube-search-and-download
1. **Start the development server**
```
npm dev run
```