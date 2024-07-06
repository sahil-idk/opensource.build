"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <Button className="mt-5" disabled>
        Adding post...
      </Button>
    );
  }
  return <Button className="mt-5">Add post</Button>;
};

export default FormSubmit;
