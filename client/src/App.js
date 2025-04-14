import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/header/header";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
