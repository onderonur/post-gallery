import React, { useEffect } from "react";
import "./App.css";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
// TODO: Bu projeyi sıfırdan güncel node ile oluştur.
const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    window.onGoogleScriptLoad = () => {
      console.log('The google script has really loaded, cool!');
    }
    // @ts-ignore
    window.gapi.load("client:auth2", () => {
      console.log("load");
      // @ts-ignore
      window.gapi.client.init({
        client_id:
          "751922186263-9udn6antjs860adl88m14bd9mkb1546b.apps.googleusercontent.com",
        scope: "profile email"
      });

      // @ts-ignore
      window.gapi.load("signin2", function() {
        // render a sign in button
        // using this method will show Signed In if the user is already signed in
        var opts = {
          width: 200,
          height: 50,
          onSuccess: () => console.log("success")
        };
        // @ts-ignore
        gapi.signin2.render("loginButton", opts);
      });
    });
  }, []);
  return (
    <>
      <div className="g-signin2" data-onsuccess="onSignIn" />
      {/* <GoogleLogin
        clientId="751922186263-9udn6antjs860adl88m14bd9mkb1546b.apps.googleusercontent.com"
        responseType="id_token"
        isSignedIn={true}
        cookiePolicy="single_host_origin"
        onSuccess={response => {
          const idToken = (response as GoogleLoginResponse).tokenId;
          fetch("http://localhost:4000/auth/google/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken })
          });
        }}
        onFailure={error => console.log(error)}
      /> */}
    </>
  );
};

export default App;
