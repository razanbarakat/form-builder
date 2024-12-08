"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/ui/dialog";
import { BsFileEarmark } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { formSchema, formSchemaType } from "@/schemas/form";
import { AwardIcon } from "lucide-react";
import { CreateForm } from "@/actions/form";

export default function CreateFormBtn() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: formSchemaType) {
    try {
      await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
    } catch (error) {
      toast({
        title: "error",
        description: "Somthing went wrong ,Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Creat new Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creat Form</DialogTitle>
          <DialogDescription>
            Creat a new form to start collecting resposes
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {!form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
