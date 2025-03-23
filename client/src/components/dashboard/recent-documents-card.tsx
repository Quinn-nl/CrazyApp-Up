import { FileText, Edit, Eye, Download, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: number;
  title: string;
  status: 'approved' | 'in-review' | 'draft';
  updated: string;
  regulation: string;
}

const documents: Document[] = [
  {
    id: 1,
    title: 'Privacy Policy v2.1',
    status: 'approved',
    updated: 'Updated 2 days ago',
    regulation: 'GDPR'
  },
  {
    id: 2,
    title: 'Data Processing Agreement',
    status: 'in-review',
    updated: 'Updated 5 days ago',
    regulation: 'GDPR'
  },
  {
    id: 3,
    title: 'CCPA Compliance Report',
    status: 'approved',
    updated: 'Updated 1 week ago',
    regulation: 'CCPA'
  }
];

export function RecentDocumentsCard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'in-review':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Review</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      default:
        return null;
    }
  };

  const handleAddDocument = () => {
    // In a real implementation, this would open a modal to add a new document
    alert("Add document functionality would be implemented here");
  };

  return (
    <Card className="bg-white px-5 py-6 sm:px-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Documents</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={handleAddDocument}
            >
              <Plus className="mr-1 h-4 w-4" />
              New Document
            </Button>
            <Button variant="link" className="text-sm text-primary-600 hover:text-primary-700 p-0">
              View All
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {documents.map((document) => (
            <div key={document.id} className="group relative p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary-100 text-primary-600 rounded">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{document.title}</p>
                    {getStatusBadge(document.status)}
                  </div>
                  <div className="mt-1 flex items-center">
                    <p className="text-xs text-gray-500">{document.updated}</p>
                    <span className="mx-2 text-gray-300">•</span>
                    <p className="text-xs text-gray-500">{document.regulation}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
