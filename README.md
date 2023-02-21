# Awesome Name App
Simple example how to handle fetching data from API and display it in React app with Axios and Typescript:
* by using React Context
* or by using customHooks with prop drilling
* typesafe with Typescript with type check both on response and response error
* with setting types only at fetch call with inheriting types to all components that use those data

This app lives on [Railway](https://agecount-production.up.railway.app/) and is using [Agify API](https://agify.io/) to fetch data.  

## How to run this app
1. Clone this repo
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the app
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to handle API calls in React app with Axios and Typescript

### ... by using React Context

Example of fetching data from API and displaying it in React app with Axios and Typescript by using React Context.

Check out:

* Components in view with hook calls:
    * [src/views/WithContext/WithContextView.tsx](src/views/WithContext/WithContextView.tsx)
* Provider with api call:
    * [src/views/WithContext/NameProvider/NameProvider.tsx](src/views/WithContext/NameProvider/NameProvider.tsx)
* Universal useAxios hook for fetching data:
    * [src/lib/WithContext/useAxios/useAxios.ts](src/lib/WithContext/useAxios/useAxios.ts)
* Form component that send request to API:
    * [src/views/WithContext/Form/Form.tsx](src/views/WithContext/Form/Form.tsx)
* Age view component that display data from API by useContext hook:
    * [src/views/WithContext/AgeView/AgeView.tsx](src/views/WithContext/AgeView/AgeView.tsx)

### ... by using customHooks with prop drilling

Example of fetching data from API and displaying it in React app with Axios and Typescript by using customHooks with prop drilling.

Check out:
* Components in view with hook call and prop drilling to child view components:
    * [src/views/WithHooksProps/WithHooksProps.tsx](src/views/WithHooksProps/WithHooksProps.tsx)
* Custom hook with api call:
    * [src/lib/WithHooks/useFetchData/useFetchNameData.ts](src/lib/WithHooks/useFetchData/useFetchData.ts)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
