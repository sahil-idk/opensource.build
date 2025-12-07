"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { addOrg } from "@/actions/addOrg";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Search, Check, Building2, Users, GitFork, ExternalLink, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GitHubOrgSearchResult {
  id: number;
  login: string;
  description: string | null;
  avatar_url: string;
  html_url: string;
}

interface GitHubOrgDetails {
  login: string;
  name: string | null;
  description: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  blog: string | null;
}

const CreateOrgForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GitHubOrgSearchResult[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<GitHubOrgDetails | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100),
    link: z.string().min(2, "Organization name is required").max(100),
    content: z.string().min(2, "Description must be at least 2 characters").max(500),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      content: "",
    },
  });

  // Debounced search
  const searchOrganizations = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setSearching(true);
    setError("");

    try {
      const response = await fetch(
        `/api/github/search-orgs?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Failed to search organizations');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search organizations');
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Fetch detailed org info
  const fetchOrgDetails = async (orgName: string) => {
    setLoadingDetails(true);
    setError("");

    try {
      const response = await fetch('/api/github/search-orgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgName }),
      });

      if (!response.ok) {
        throw new Error('Organization not found');
      }

      const data: GitHubOrgDetails = await response.json();
      setSelectedOrg(data);

      // Auto-fill form
      form.setValue('title', data.name || data.login);
      form.setValue('link', data.login);
      form.setValue('content', data.description || `${data.login} organization`);

      setError("");
    } catch (err) {
      console.error('Fetch org details error:', err);
      setError('Failed to fetch organization details');
      setSelectedOrg(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Handle search input change with debounce
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    form.setValue('link', value);
    setSelectedOrg(null);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      searchOrganizations(value);
    }, 300); // 300ms debounce
  };

  // Handle org selection from dropdown
  const handleSelectOrg = async (org: GitHubOrgSearchResult) => {
    setSearchQuery(org.login);
    setShowDropdown(false);
    await fetchOrgDetails(org.login);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedOrg) {
      setError("Please select a valid GitHub organization");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await addOrg(values);
      setIsOpen(false);
      form.reset();
      setSelectedOrg(null);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to add organization');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Building2 className="w-4 h-4" />
          Add Organization
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add GitHub Organization</DialogTitle>
          <DialogDescription>
            Search for and add a GitHub organization to track
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Organization Search Field */}
              <div className="relative" ref={dropdownRef}>
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Search GitHub Organization
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Search organizations... (e.g., vercel, facebook, google)"
                            className="pl-10 pr-10 h-12 text-base"
                            value={searchQuery}
                            onChange={(e) => {
                              field.onChange(e);
                              handleSearchChange(e.target.value);
                            }}
                            onFocus={() => {
                              if (searchResults.length > 0) {
                                setShowDropdown(true);
                              }
                            }}
                            autoComplete="off"
                          />
                          {searching && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Type to search for GitHub organizations globally
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Autocomplete Dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
                    {searchResults.map((org) => (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => handleSelectOrg(org)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent transition-colors text-left border-b last:border-b-0"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={org.avatar_url} alt={org.login} />
                          <AvatarFallback>
                            <Building2 className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{org.login}</div>
                          {org.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {org.description}
                            </div>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Organization Preview */}
              {loadingDetails && (
                <div className="flex items-center justify-center py-8 border rounded-lg bg-muted/20">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Loading organization details...
                  </span>
                </div>
              )}

              {selectedOrg && !loadingDetails && (
                <div className="border rounded-lg p-4 bg-muted/20 space-y-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedOrg.avatar_url} alt={selectedOrg.login} />
                      <AvatarFallback>
                        <Building2 className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          {selectedOrg.name || selectedOrg.login}
                        </h3>
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">@{selectedOrg.login}</p>
                      {selectedOrg.description && (
                        <p className="text-sm mt-2">{selectedOrg.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{selectedOrg.public_repos} repos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedOrg.followers} followers</span>
                    </div>
                  </div>

                  <a
                    href={selectedOrg.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Display Name Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Display Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Organization display name"
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      The name that will be displayed in your dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Brief description of this organization"
                        className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </FormControl>
                    <FormDescription>
                      A short description to help you remember this organization
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md p-3">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                    setSelectedOrg(null);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedOrg || submitting}
                  className="flex-1 gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Add Organization
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrgForm;
