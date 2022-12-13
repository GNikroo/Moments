import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route exact path='/' render={() => <h1>Home page</h1>} />
                    <Route exact path='/signin' render={() => <h1><SignInForm /></h1>} />
                    <Route exact path='/signup' render={() => <h1><SignUpForm /></h1>} />
                    <Route render={() => <p>Page not found!</p>} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;