import React, { useRef, useState } from "react";
import images from "../../constants/image";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const PaymentPage = () => {
  const imageRef = useRef();
  const [isUploaded, setIsUploaded] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [fullName, setFullName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSetImage = async (e) => {
    let file = e.target.files[0];
    setImage(file);
    if (file) {
      const extensions = ["JPG", "JPEG", "PNG", "jpeg", "jpg", "png"];
      const ext = file["name"].split(".").pop();

      if (!extensions.includes(ext)) {
        alert(" Invalid Image Format!");
        setImageUpload(null);
        return;
      }
    }
    const sizeInMb = getFileSizeInMb(file);
    if (sizeInMb > 4) {
      alert(" Please upload an image with size less than 4MB");
      setImageUpload(null);
    }
    const fileContent = await readFileAsBase64(file);
    setImageUpload(fileContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email == "" || fullName == "" || transactionId == "" || email == "") {
        alert("All fields are required");
        return;
      }
      if (image) {
        const storage = getStorage(app);
        const fileName = new Date() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercentage(progress);
          },
          () => {
            setImageError(true);
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrl(downloadUrl);

              const res = await axios.post(
                "http://localhost:6158/express/payment",
                {
                  fullName,
                  email,
                  phoneNumber,
                  imageUrl,
                  transactionID: transactionId,
                }
              );
              setFullName("")
              setEmail("")
              setPhoneNumber("")
              setImageUrl(null)
            } catch (error) {
              console.log(error);
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id="paymentPage">
      <div
        className="top-header"
        style={{ marginBottom: "1rem", display: "flex" }}
      >
        <Link
          to={"/"}
          style={{
            background: "transparent",
            outline: "none",
            border: "none",
            fontSize: "1.2rem",
            color: "red",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Back
        </Link>
      </div>
      <p
        style={{
          textTransform: "capitalize",
          fontSize: "1.3rem",
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "var(--fw5)",
        }}
      >
        Welcome To EXPRESSCSSSHOP Payment platform
      </p>

      <div
        className="card-ds-payment"
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "3rem",
        }}
      >
        <span style={{ display: "flex", background: "red", width: "250px" }}>
          <img
            srcSet={`${images.Card} 1x, ${images.Card}@2x 2x, ${images.Card}@3x 3x`}
            src={
              images.Card
            } /* Fallback source for browsers that don't support srcSet */
            alt="credit card"
            style={{ width: "inherit" }}
          />
        </span>
        <span
          style={{
            background: "rgba(239, 239, 239, 0.33)",
            color: "rgba(32, 28, 57, 0.99)",
            padding: ".8rem",
            fontSize: ".88rem",
            fontWeight: "500",
            opacity: ".7",
            borderRadius: "6px",
          }}
        >
          Legible card Information will be given to you by the dealer.
        </span>
      </div>

      <div className="dealer-infoPay">
        <div className="d-left">
          <h3 style={{ marginBottom: "1rem" }}>MOMO pay</h3>
          <div>
            <p>
              <span style={{ fontSize: ".9rem", fontWeight: "500" }}>
                Contact:
              </span>{" "}
              <span style={{ fontSize: "1.1 rem", fontWeight: "500" }}>
                0500933711
              </span>
            </p>
            <p>
              <span style={{ fontSize: ".9rem", fontWeight: "500" }}>
                Name:
              </span>{" "}
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                FRANCIS AMOATENG
              </span>
            </p>
            <p>
              <span style={{ fontSize: ".9rem", fontWeight: "500" }}>
                Network:
              </span>{" "}
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                VODAFONE
              </span>
            </p>
          </div>
          <h3 style={{ marginBlock: "1rem" }}>BANK TRANSFER</h3>
          <div>
            <p>
              <span style={{ fontSize: ".9rem", fontWeight: "500" }}>
                BANK NAME:
              </span>{" "}
              <span
                style={{
                  fontSize: "1.1 rem",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                FIDELITY BANK
              </span>
            </p>
            <p>
              <span style={{ fontSize: ".9rem", fontWeight: "500" }}>
                ACCOUNT NUMBER:
              </span>{" "}
              <span
                style={{ fontSize: "1.1rem", color: "red", fontWeight: "bold" }}
              >
                2100492542713
              </span>
            </p>
          </div>
        </div>
        <div
          className="d-right"
          style={{ flexDirection: "column", display: "flex", gap: "1.4rem" }}
        >
          <div className="f-right-d">
            <h3 style={{ marginBottom: "1rem" }}>BTC PAY ADDRESS</h3>
            <p
              style={{ color: "red", fontWeight: "500", letterSpacing: "1px" }}
            >
              bc1qkmgrcz26atkljsye0pscch2v67m8r8tfasqm2m
            </p>
          </div>
          <div className="s-right-d">
            <h3 style={{ marginBottom: "1rem" }}>USDT PAY ADDRESS</h3>
            <p
              style={{ color: "red", fontWeight: "500", letterSpacing: "1px" }}
            >
              TEtBLku1BZ7yidBHYJ6gCCwLrwrUnEM2Sn
            </p>
          </div>
        </div>
      </div>

      <div className="customer-info">
        {/*   <p
          className="ti-form-pay"
          style={{ marginTop: "1.2rem", fontWeight: "500", fontSize: "1.2rem" }}
        >
          Payment Information
        </p> */}
        <p
          className="warn-form-pay"
          style={{
            padding: ".5rem",
            fontSize: ".9rem",
            fontWeight: "500",
            borderRadius: "6px",
            background: "rgba(254, 214, 214, 0.86)",
            color: "rgba(255, 31, 0, 1)",
            width: "fit-content",
            marginBlock: "2rem 1.3rem",
            marginInline: "auto",
          }}
        >
          Please Fill thoroughly in the forms below to receive your credit card
        </p>

        <form className="form-pay" onSubmit={handleSubmit}>
          {/* NAME AND EMAIL */}
          <div className="flex-input-field">
            {/* full name */}
            <div className="input-field">
              <label htmlFor="fullName-pay">Full Name</label>
              <input
                type="text"
                id="fullName-pay"
                placeholder="eg. Philip Doe"
                required
                autoCapitalize="on"
                autoComplete="on"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* email address */}
            <div className="input-field">
              <label htmlFor="emailAddress-pay">Email Address</label>
              <input
                type="email"
                id="emailAddress-pay"
                placeholder="eg. philipdoe@gmail.com"
                required
                autoComplete="on"
                autoCorrect="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* NAME AND EMAIL */}

          {/* TRANSACTION ID AND CONTACT */}
          <div className="flex-input-field">
            {/* transaction id */}
            <div className="input-field">
              <label htmlFor="transactionId">Transaction ID</label>
              <input
                type="text"
                id="transactionId"
                placeholder="eg. 23asdAx532342"
                required
                autoComplete="off"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
            {/* transaction id */}

            {/* contact */}
            <div className="input-field">
              <label htmlFor="contact-pay">Contact</label>
              <input
                type="tel"
                name="telphone"
                id="contact-pay"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* contact */}
          </div>
          {/* TRANSACTION ID AND CONTACT */}

          {/* Image Upload */}
          <div className="input-field">
            <input
              type="file"
              ref={imageRef}
              onChange={handleSetImage}
              accept="image/*"
              name="fileImage"
              hidden
            />
            {/* if there's an upload image displays else an error is thrown */}
            <div className="upload-btn">
              {/* button disables when the image is valid else  it enables:: when uploaded, the content of the button switches to change*/}
              {!imageUpload ? (
                <button
                  className="uploadBtn"
                  onClick={() => imageRef.current.click()}
                >
                  Upload Payment Screenshot
                </button>
              ) : (
                <div>
                  <span
                    style={{
                      display: "flex",
                      marginBlock: "1rem",
                      height: "220px",
                    }}
                  >
                    <img
                      src={imageUpload}
                      alt="transaction receipt"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <button
                    onClick={() => imageRef.current.click()}
                    className="changeImageBtn"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="sbm-btn">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

function getFileSizeInMb(file) {
  const fileSizeInByte = file.size;
  const fileSizeInMb = fileSizeInByte / 1024 / 1024;
  return Math.round(fileSizeInMb * 100) / 100;
}

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export default PaymentPage;
