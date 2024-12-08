"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../lib/prisma";
import { redirect } from "next/navigation"; // دالة التوجيه
import { formSchema, formSchemaType } from "@/schemas/form";

class UserNotFoundErr extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundErr";
  }
}
export async function GetFormStats() {
  const user = await currentUser();
  console.log("User:", user);
  if (!user) {
    console.error("User not found in GetFormStats");

    redirect("/sign-in");
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return {
    visits,
    submissionRate,
    submissions,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });
  if (!form) {
    throw new Error("somthing went wrong");
  }
  return form.id;
}
