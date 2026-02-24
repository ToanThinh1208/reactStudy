import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

type SchemaType = z.infer<typeof schema>;

const TestComponent = () => {
  const { handleSubmit } = useForm<SchemaType>();

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data.name);
  };

  return <form onSubmit={handleSubmit(onSubmit)} />;
};
