//import "bootstrap/dist/css/bootstrap.min.css"////
import {Home, Dashboard} from "./components"

const code = new URLSearchParams(window.location.search).get("code")
function App() {
  return code ? <Dashboard code={code} /> : <Home />
}

export default App