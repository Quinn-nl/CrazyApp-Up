import { useState } from "react";
import { Layout } from "@/components/layouts/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { FilePlus, Search, FileText, FilePen, FileX } from "lucide-react";

type DocumentStatus = "draft" | "published" | "archived";
type DocumentType = "policy" | "procedure" | "checklist" | "form";

interface DocumentFormData {
  title: string;
  type: DocumentType;
  content: string;
  status: DocumentStatus;
}

export default function DocumentManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<DocumentFormData>({
    title: "",
    type: "policy",
    content: "",
    status: "draft"
  });

  // Fetch documents
  const { data: documents, isLoading } = useQuery({
    queryKey: ['/api/documents'],
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: async (documentData: DocumentFormData) => {
      const res = await apiRequest("POST", "/api/documents", documentData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      setIsCreateDialogOpen(false);
      setNewDocument({
        title: "",
        type: "policy",
        content: "",
        status: "draft"
      });
      toast({
        title: "Document created",
        description: "Your document has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating document",
        description: error.message || "There was an error creating your document. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/documents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Document deleted",
        description: "Your document has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting document",
        description: error.message || "There was an error deleting your document. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    createDocumentMutation.mutate(newDocument);
  };

  const handleDeleteDocument = (id: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteDocumentMutation.mutate(id);
    }
  };

  // Filter documents by search query
  const filteredDocuments = documents?.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDocumentTypeIcon = (type: DocumentType) => {
    switch(type) {
      case 'policy': return <FileText className="h-5 w-5 text-primary" />;
      case 'procedure': return <FilePen className="h-5 w-5 text-[#26a69a]" />;
      case 'checklist': return <FileText className="h-5 w-5 text-[#ff9800]" />;
      case 'form': return <FileText className="h-5 w-5 text-[#f44336]" />;
      default: return <FileText className="h-5 w-5 text-neutral-500" />;
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch(status) {
      case 'draft': return <Badge variant="warning">Draft</Badge>;
      case 'published': return <Badge variant="compliant">Published</Badge>;
      case 'archived': return <Badge>Archived</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Document Management</h1>
              <p className="mt-1 text-sm text-neutral-500">Upload and manage your compliance documentation</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="inline-flex items-center">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Document</DialogTitle>
                    <DialogDescription>
                      Create a new compliance document. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateDocument}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right text-sm font-medium">
                          Title
                        </label>
                        <Input
                          id="title"
                          className="col-span-3"
                          value={newDocument.title}
                          onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="type" className="text-right text-sm font-medium">
                          Type
                        </label>
                        <Select 
                          value={newDocument.type} 
                          onValueChange={(value) => setNewDocument({...newDocument, type: value as DocumentType})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="policy">Policy</SelectItem>
                            <SelectItem value="procedure">Procedure</SelectItem>
                            <SelectItem value="checklist">Checklist</SelectItem>
                            <SelectItem value="form">Form</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="status" className="text-right text-sm font-medium">
                          Status
                        </label>
                        <Select 
                          value={newDocument.status} 
                          onValueChange={(value) => setNewDocument({...newDocument, status: value as DocumentStatus})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label htmlFor="content" className="text-right text-sm font-medium pt-2">
                          Content
                        </label>
                        <Textarea
                          id="content"
                          className="col-span-3"
                          rows={10}
                          value={newDocument.content}
                          onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
                          placeholder="Document content supports Markdown formatting"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={createDocumentMutation.isPending}>
                        {createDocumentMutation.isPending ? "Creating..." : "Create Document"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-10 w-full md:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Document Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredDocuments?.length === 0 ? (
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden p-6 text-center">
              <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-700">No documents found</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {searchQuery ? "No documents match your search criteria." : "Start by creating your first document."}
              </p>
              <Button 
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Create Document
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments?.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getDocumentTypeIcon(document.type as DocumentType)}
                        <CardTitle className="ml-2 text-lg">{document.title}</CardTitle>
                      </div>
                      {getStatusBadge(document.status as DocumentStatus)}
                    </div>
                    <CardDescription>
                      Type: {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-xs text-neutral-500">
                      Last updated: {formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600 truncate">
                      {document.content.substring(0, 100)}
                      {document.content.length > 100 ? '...' : ''}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FilePen className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#f44336] hover:text-[#f44336] hover:bg-[#f44336]/10"
                      onClick={() => handleDeleteDocument(document.id)}
                      disabled={deleteDocumentMutation.isPending}
                    >
                      <FileX className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
