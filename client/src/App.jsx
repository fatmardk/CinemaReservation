import { GoogleOAuthProvider } from "@react-oauth/google";
import Routing from "./routes/Routing";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="991598614961-me6q8mi64u2o7kkodcplbu28ojp9qi01.apps.googleusercontent.com">
        <Routing />
      </GoogleOAuthProvider>    </>
  );
}

export default App;
