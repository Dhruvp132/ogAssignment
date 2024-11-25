import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Homepage from "./components/Homepage";
import PostView from "./components/PostView";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/posts/:postId" element={<PostView />} />
            </Routes>
        </Router>
    );
};

export default App;
