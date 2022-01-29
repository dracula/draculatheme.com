import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./404.module.css";

class CustomError extends React.Component {
  render() {
    const title = `Error 404`;
    const description = "Page Not Found";

    return (
      <div
        style={{
          background: "#282a36",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta
            content="https://draculatheme.com/static/img/facebook.png"
            property="og:image"
          />
        </Head>

        <div>
          <h1
            style={{
              fontFamily: "Abril Text",
              fontSize: 135,
              fontWeight: "700",
              marginBottom: 10,
              marginTop: -70,
              textAlign: "center",
            }}
          >
            404
          </h1>
          <Link href="/">
            <a
              style={{
                color: "rgba(189, 147, 249, 1)",
                borderBottom: "2px solid rgba(189, 147, 249, 1)",
                fontSize: 42,
              }}
            >
              Back to Home
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default CustomError;
