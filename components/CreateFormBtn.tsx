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
import { BsFileEarmarkPlus } from "react-icons/bs";
// import { ImSpinner2 } from "react-icons/im";
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
import { CreateForm } from "@/actions/form";
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from "next/navigation";

export default function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      console.log(error);
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
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 "
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-blod text-xl text-muted-foreground group-hover:text-primary">
            {" "}
            Creat new Form
          </p>
        </Button>
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
            {/* {!form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
