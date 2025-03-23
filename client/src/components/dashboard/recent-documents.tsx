import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface Document {
  id: number;
  title: string;
  pageCount: number;
  updatedAt: string;
}

interface RecentDocumentsProps {
  documents: Document[];
}

export default function RecentDocuments({ documents = [] }: RecentDocumentsProps) {
  return (
    <Card>
      <CardHeader className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <CardTitle className="text-lg leading-6 font-medium text-gray-900">
          Recent Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white px-4 py-5 sm:p-6">
        {documents.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No documents yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {documents.map((document) => (
              <li key={document.id} className="py-4 flex">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {document.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Updated {new Date(document.updatedAt).toLocaleDateString()} • {document.pageCount} page{document.pageCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-4">
        <div className="text-sm">
          <a href="/documents" className="font-medium text-blue-600 hover:text-blue-500">
            View all documents <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
