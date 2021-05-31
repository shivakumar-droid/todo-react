import React, { useState, useEffect, useRef } from "react";
import "./user.css";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";
import { storage } from "./firebase";
import EditIcon from "@material-ui/icons/Edit";

function User() {
  const history = useHistory();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    path: "",
    phone: "",
    country: "",
    city: "",
  });
  
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const inputFile = useRef(null);
  const [upload, setUpload] = useState(false);
  const Id= localStorage.getItem('email');

  useEffect(() => {
    const ref = firebase.firestore().collection("users");
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id == localStorage.getItem("email")) {
          setDetails({
            name: doc.data().name,
            email: doc.data().email,
            path: doc.data().path,
            phone: doc.data().phone,
            country: doc.data().country,
            city: doc.data().city,
          });
          setId(doc.id);
          setName(doc.data().name);
          setEmail(doc.data().email);
          setPhone(doc.data().phone);
          setCountry(doc.data().country);
          setCity(doc.data().city);
        }
      });
    });
  }, []);

  const back = (e) => {
    history.push("/todo");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(id);

    firebase.firestore().collection("users").doc(id).update({
      email: email,
      city: city,
      country: country,
      phone: phone,
    });

    setEdit(false);
  };

  
  const handleChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(true);
    } else {
      setImage(null);
    }
  };

  
  const uploadToFirebase = () => {
    
    if (image) {
      const storageRef = storage.ref('images/');
      const imageRef = storageRef.child(image.name);
      imageRef.put(image);
      imageRef.getDownloadURL().then((url) => {
        alert("Image uploaded successfully to Firebase.");
        firebase.firestore().collection("users").doc(Id).update({
          path:url,
        });
        setUpload(false);
      });
    } else {
      alert("Please upload an image first.");

      setUpload(false);
    }
  }
  console.log(image);

  return (
    <div>
      <div className="back">
          <button onClick={back}>
            Go Back
          </button>
          </div>
      {id ? (
        <div className="user">
          {/* <div className="back">
          <button onClick={back}>
            Go Back
          </button>
          </div> */}
          <div className="image">
            <img src={details.path} alt="logo" />
            <br />
            <label for="file">Image</label>
            <input
              type="file"
              id="file"
              onChange={handleChange}
              ref={inputFile}
              style={{ display: "none" }}
            />
            {upload ?   <button onClick={uploadToFirebase}>Upload</button>:null}
          </div>
          <div className="head">
            {/* <button onClick={back}>back</button><br/><br/> */}
            <label>{name}</label>{" "}
            <EditIcon
              onClick={(e) => setEdit(true)}
              style={{ color: "black" }}
            />
          </div>
          {edit && !save ? (
            <div className="editform">
              <form>
                <label>Name : </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <br />
                <br />
                <label>Email : </label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <br />
                <br />
                <label>City : </label>
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                <br />
                <br />
                <label>Country : </label>
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
                <br />
                <br />
                <label>Phone : </label>
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <br />
                <br />
                <button
                  type="submit"
                  onClick={((e) => setSave(true), submitHandler)}
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div className="profile">
              <label>Email : {details.email} </label>
              <br />
              <br />
              <label>City : {details.city}</label>
              <br />
              <br />
              <label>Country: {details.country}</label>
              <br />
              <br />
              <label>Phone: {details.phone} </label>
              <br />
              <br />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default User;
