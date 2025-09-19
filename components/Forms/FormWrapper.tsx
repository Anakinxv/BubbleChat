"use client";
import React, { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as UIForm } from "../ui/form";
interface FormWrapperProps<T extends ZodSchema<any, any, any>> {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  children: ReactNode;
}

export function FormWrapper<T extends ZodSchema<any, any, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormWrapperProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  console.log(defaultValues);

  return (
    <FormProvider {...methods}>
      <UIForm {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {children}
        </form>
      </UIForm>
    </FormProvider>
  );
}
