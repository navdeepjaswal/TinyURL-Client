import React from "react";
import Form from "@/components/ui/form";
import Header from "@/components/ui/header";

function landing() {
  return (
    <div className="min-h-screen bg-[url('./assets/hero.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4">
        <Header />
        <Form />
      </div>
    </div>
  );
}

export default landing;
