"use client";
import * as React from "react";

export default function LoadingScreen() {
  const styles = {
    loadingContainer: {
      backgroundColor: "#2e2f2e",
      width: "100%",
      maxWidth: 480,
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
    },
    loadingContent: {
      aspectRatio: "43/93",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "stretch",
      width: "100%",
      minHeight: 930,
      padding: "403px 34px",
      position: "relative" as const,
      overflow: "hidden",
    },
    backgroundImage: {
      objectFit: "cover" as const,
      objectPosition: "center",
      width: "100%",
      height: "100%",
      position: "absolute" as const,
      inset: 0,
    },
    logoImage: {
      aspectRatio: "2.92",
      objectFit: "contain" as const,
      objectPosition: "center",
      width: "100%",
      marginBottom: -81,
      boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    },
  };

  return (
    <section style={styles.loadingContainer}>
      <article style={styles.loadingContent}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b15aa408f8b63d42d94a16d5c3980cd73a7f8ed?placeholderIfAbsent=true&apiKey=587c8a67141647dabbd8d336618815b9"
          alt="Background"
          style={styles.backgroundImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8326b04752d85570558bab91224f81d94666119f?placeholderIfAbsent=true&apiKey=587c8a67141647dabbd8d336618815b9"
          alt="Logo"
          style={styles.logoImage}
        />
      </article>
    </section>
  );
}


