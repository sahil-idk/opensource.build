"use client";

import React from "react";
import { z } from "zod";
import { addOrg } from "@/actions/addOrg";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GITHUB_API_BASE_URL } from "@/lib/env";

interface OrganizationDetails {
  name: string;
  description: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

const CreateOrgForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OrganizationDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sanitizedQuery = query.replace(/\s+/g, "");
      if (sanitizedQuery.length < 3) {
        setResults(null);
        setError("");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${GITHUB_API_BASE_URL}orgs/${sanitizedQuery}`,
          {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          console.log(response);
          throw new Error("Organization not found");
        }

        const data = await response.json();
        setResults(data);
        setError("");
      } catch (error) {
        setResults(null);
        setError("Organization not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    link: z.string().min(2).max(50),
    content: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      content: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await addOrg(values);
    setLoading(false);
    setIsOpen(false);
    form.reset();
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Add Organization</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new organisation</DialogTitle>
            <DialogDescription>
              Add organization details to get started
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className=" h-80 w-full  p-2 rounded-md border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Org title</FormLabel>
                      <FormControl>
                        <Input id="title" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Github Org Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="shadcn"
                          id="link"
                          type="search"
                          onChange={(e) => {
                            field.onChange(e);
                            setQuery(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant={"ghost"}>
                  {!results ? "Invalid" : "Valid Organisation"}
                </Button>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input id="content" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!loading ? (
                  <Button disabled={!results} type="submit">
                    Add Organisation
                  </Button>
                ) : (
                  <Button disabled type="submit">
                    Creating organisation
                  </Button>
                )}
              </form>
            </Form>

            <div className="mt-4 w-full">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {results && (
                <div>
                  <h3 className="text-lg font-bold">Organization Details</h3>
                  <p>
                    <strong>Name:</strong> {results.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {results.description}
                  </p>
                  <p>
                    <strong>Public Repos:</strong> {results.public_repos}
                  </p>
                  <p>
                    <strong>Followers:</strong> {results.followers}
                  </p>
                  <a
                    href={results.html_url}
                    target="_blank"
                    className="text-blue-500"
                  >
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateOrgForm;
