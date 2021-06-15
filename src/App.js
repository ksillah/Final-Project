//import "bootstrap/dist/css/bootstrap.min.css"////
import Login from "./Login"
import Dashboard from "./Dashboard"
import SiginIn from "./SignIn"

const code = new URLSearchParams(window.location.search).get("code")
function App() {
  return code ? <Dashboard code={code} /> : <SiginIn />
}

export default App 