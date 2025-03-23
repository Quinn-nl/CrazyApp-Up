import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, FileText, Search, Plus } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Document creation schema
const documentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  type: z.string(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.string(),
  pageCount: z.number().int().min(1).default(1),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export default function DocumentManagement() {
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch documents
  const { data: documents, isLoading } = useQuery({
    queryKey: ["/api/documents"],
  });

  // Handle document creation
  const createDocumentMutation = useMutation({
    mutationFn: async (data: DocumentFormValues) => {
      const res = await apiRequest("POST", "/api/documents", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Document Created",
        description: "Your document has been created successfully.",
      });
      setIsNewDocumentOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create document. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize form
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "policy",
      content: "",
      status: "draft",
      pageCount: 1,
    },
  });

  // Handle form submission
  const onSubmit = (data: DocumentFormValues) => {
    createDocumentMutation.mutate(data);
  };

  // Filter documents based on search
  const filteredDocuments = searchQuery && documents 
    ? documents.filter((doc: any) => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : documents;

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-slate-50">
          {/* Page Header */}
          <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Document Management</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your compliance documents</p>
              </div>
              <div>
                <Button 
                  onClick={() => setIsNewDocumentOpen(true)}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Document
                </Button>
              </div>
            </div>
            
            {/* Search Box */}
            <div className="mt-4">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading documents...</span>
              </div>
            ) : filteredDocuments && filteredDocuments.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredDocuments.map((document: any) => (
                  <Card key={document.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <FileText className="h-6 w-6 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {document.description || "No description"}
                            </p>
                            <div className="mt-2 flex items-center">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                document.status === 'published' ? 'bg-green-100 text-green-800' : 
                                document.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                {document.pageCount} page{document.pageCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Updated {formatDate(document.updatedAt)}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? "No documents match your search criteria." : "Get started by creating a new document."}
                </p>
                <div className="mt-6">
                  <Button onClick={() => setIsNewDocumentOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* New Document Dialog */}
      <Dialog open={isNewDocumentOpen} onOpenChange={setIsNewDocumentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
            <DialogDescription>
              Add a new compliance document to your library.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Document title" {...field} />
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
                      <Textarea placeholder="Brief description of the document" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="policy">Policy</SelectItem>
                          <SelectItem value="report">Report</SelectItem>
                          <SelectItem value="assessment">Assessment</SelectItem>
                          <SelectItem value="procedure">Procedure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="pageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Count</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Document content" 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewDocumentOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createDocumentMutation.isPending}
                >
                  {createDocumentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Document"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
