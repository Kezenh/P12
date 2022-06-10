import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from 'react-router-dom'
import Profile from "./pages/Profile"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Router>
		<Profile />
	</Router>
)